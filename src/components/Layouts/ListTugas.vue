<template>
    <div class="card shadow">

        <div class="card-body">
            <div class="alert alert-warning">
                <marquee behavior="">
                    <i class=" bi bi-exclamation-triangle-fill"></i> Kerja Tugasta, Jangan Malas-Malasan!
                </marquee>
            </div>
            <h3 class="text-center" v-if="props.listTugas.length == 0">Tugas Tidak ada</h3>
            <ol v-else class="list-group mt-2" v-for="(data, j) in     props.matakuliahs    " :key="j">
                <li class="list-group-item-primary list-group-item d-flex justify-content-between align-items-start">
                    <div class="p-1">
                        <i class="bi bi-pin-fill"></i> {{ data.mk }}
                        <br>
                        <i class="bi bi-mortarboard-fill"></i> {{ data.dosen }}
                    </div>
                    <span class="badge rounded-pil " :class="hitungTugasForMK(data.id) > 0 ? 'bg-primary' : 'bg-secondary'">
                        {{ hitungTugasForMK(data.id) }}
                    </span>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start"
                    v-for="(item, i) in     props.listTugas.filter(tgs => tgs.mk_id == data.id)    " :key="i">
                    <div class="ms-2 me-auto">
                        <div class="d-flex justify-content-between">

                            <div class="fw-bold" style="font-size: 12px;">
                                <i class="bi bi-calendar3"></i> {{ item.created_at }}
                                <span class="badge rounded-pill mb-1 badge-l" :class="warnaDeadline(item)">
                                    <i class="bi bi-alarm"></i> {{ prosesDeadline(item) }}</span>
                                <span class="badge bg-dark badge-r "> <i :class="statusTugas(item)"></i> {{ item.status
                                }}</span>
                            </div>
                            <a v-if="isAdmin == 'admin'" style="cursor: pointer;font-size: 14px;"
                                class="d-block text-danger mr-1" @click.prevent="hapusData(item.id, item.keterangan)"><i
                                    class="bi bi-trash3-fill"></i>
                            </a>
                        </div>
                        <div id="keterangan">
                            <i style="font-size: 14px;">{{ item.keterangan }}</i>
                        </div>


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
const getDeadline = (sekarang, tglDeadline) => {
    // Program JavaScript untuk mengilustrasikan 
    // perhitungan jumlah hari antara dua tanggal 

    // mengatur dua tanggal menjadi dua variabel    
    var date2 = new Date(tglDeadline);
    // hitung perbedaan waktu dari dua tanggal
    var Difference_In_Time = date2.getTime() - sekarang;

    // hitung jml hari antara dua tanggal
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.ceil(Difference_In_Days)
}

const statusTugas = (item) => {
    if (item.status == "kelompok") {
        return "bi bi-people-fill"
    } else {
        return "bi bi-person-fill"
    }
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

const prosesDeadline = (item) => {
    if (getDeadline(Date.now(), item.deadline) == 1) {
        return 'Sisa Malam ini'
    } else if (getDeadline(Date.now(), item.deadline) <= 0) {
        return 'Hangus'
    } else {
        return 'Sisa ' + getDeadline(Date.now(), item.deadline) + ' Hari'
    }
}

const warnaDeadline = (item) => {
    if (getDeadline(Date.now(), item.deadline) <= 0) {
        return 'bg-secondary'
    } else if (getDeadline(Date.now(), item.deadline) >= 6) {
        return 'bg-success'
    } else if (getDeadline(Date.now(), item.deadline) <= 5 && getDeadline(Date.now(), item.deadline) >= 3) {
        return 'bg-warning'
    } else if (getDeadline(Date.now(), item.deadline) < 3) {
        return 'bg-danger'
    }
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

<style scoped>
#keterangan {
    background-color: #efe;
    padding: .3rem 1rem;
    border-radius: 0 .5rem .5rem 0;
    margin-top: .5rem;
    border-left: 5px solid green;
    font-weight: 400;
}

.badge-l {
    border-radius: 10px 0 0 10px !important;
}

.badge-r {
    border-radius: 0px 10px 10px 0px !important;
}
</style>