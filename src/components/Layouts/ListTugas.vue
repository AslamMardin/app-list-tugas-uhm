<template>
    <div class="card shadow">

        <div class="card-body">
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle-fill"></i> Kerja Tugasta, Jangan Malas-Malasan!
            </div>
            <h3 class="text-center" v-if="props.listTugas.length == 0">Tugas Tidak ada</h3>
            <ol v-else class="list-group mt-2" v-for="(data, j) in     props.matakuliahs    " :key="j">
                <li class="list-group-item-primary list-group-item d-flex justify-content-between align-items-start">
                    <div class="p-1">
                        <i class="bi bi-pin-fill"></i> {{ data.mk }}
                        <br>
                        <i class="bi bi-mortarboard-fill"></i> {{ data.dosen }}
                    </div>
                    <span class="badge rounded-pil " :class="hitungTugasForMK(data.id) > 0 ? 'bg-success' : 'bg-secondary'">
                        {{ hitungTugasForMK(data.id) }}
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start"
                    v-for="(item, i) in     props.listTugas.filter(tgs => tgs.mk_id == data.id)    " :key="i">
                    <div class="ms-2 me-auto" v-if="new Date(item.created_at) <= Date.now()">
                        <div class="fw-bold">{{ item.created_at }}
                        </div>
                        <i>"{{ item.keterangan }}"</i>
                        <a v-if="isAdmin == 'admin'" style="cursor: pointer;" class="d-block text-danger mr-1"
                            @click.prevent="hapusData(item.id, item.keterangan)"><i class="bi bi-trash3-fill"></i>Hapus
                        </a>

                    </div>
                    <div class="action">
                        <span class="badge rounded-pill mb-1" :class="getDeadline(item.created_at,
                            item.deadline) > 6 ? 'bg-success' : (getDeadline(item.created_at,
                                item.deadline) <= 2 ? 'bg-danger' : 'bg-warning text-dark')">{{ `
                            ${getDeadline(item.created_at, item.deadline) <= 0 ? 'Malam Ini' : `Sisa ` +
                getDeadline(item.created_at, item.deadline) + ` Hari`} ` }}</span>
                    </div>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup>
import api from '../../api';
import Swal from 'sweetalert2';

import { reactive, ref, onMounted, computed, defineEmits, defineProps } from 'vue';

const props = defineProps(["listTugas", "matakuliahs", "isAdmin"])
const emit = defineEmits(["hapusTugas"])
const getDeadline = (tglDibuat, tglDeadline) => {
    // Program JavaScript untuk mengilustrasikan 
    // perhitungan jumlah hari antara dua tanggal 

    // mengatur dua tanggal menjadi dua variabel
    var date1 = new Date(tglDibuat);
    var date2 = new Date(tglDeadline);
    // hitung perbedaan waktu dari dua tanggal
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // hitung jml hari antara dua tanggal
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return parseInt(Difference_In_Days)
}

const hitungTugasForMK = (id) => {
    let angka = 0;
    props.listTugas.find(tgs => {
        if (tgs.mk_id == id) {
            angka++
        }
    })
    return angka;

}

const hapusData = (id, name = "") => {

    Swal.fire({
        title: `Anda Yakin ingin Menghapus ${name}?`,
        text: "kamu tidak akan bisa mengembalikan data ini!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus aja!'
    }).then((result) => {
        if (result.isConfirmed) {
            emit("hapusTugas", id)

        }
    })
}

</script>