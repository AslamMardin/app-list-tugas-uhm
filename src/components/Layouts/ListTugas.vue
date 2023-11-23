<template>
    <div class="card shadow">
        <div class="d-flex justify-content-center opacity-50 align-items-center my-5" v-if="props.isLoadingContent">
            <SyncLoader color="gray" />
        </div>
        <div class="card-body w-100" v-else>
            <div class="alert alert-warning">
                <marquee behavior="">
                    <i class=" bi bi-exclamation-triangle-fill"></i> <b>Ada {{ totalTugas }} Tugasta</b>, Semangat
                    Teman-teman demi tercapai Sarjana Magisternya. Semoga Segala Urusan Lancar Terus. Aamiin...!
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
                <li v-if="hideHangus" class="list-group-item d-flex justify-content-between align-items-start"
                    v-for="(item, i) in     props.listTugas.filter(tgs => tgs.mk_id == data.id)    " :key="i">
                    <div class="ms-2 me-auto" v-if="getDeadline(Date.now(), item.deadline) >= 0">
                        <div class="d-flex justify-content-between">

                            <div class="fw-bold" style="font-size: 12px;">
                                <i class="bi bi-calendar3"></i> <span class="text-primary">{{ item.created_at
                                }}</span> <i class="bi bi-calendar2-event"></i> <span class="text-danger">{{
    item.deadline }} </span>
                                |
                                <i class="bi bi-clock-fill"></i> 22:00 Malam
                                <br>
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
                        <div :class="cekStatus(item.id) ? 'selesai' : 'belum_selesai'">
                            <i style="font-size: 14px;">{{ item.keterangan }}
                            </i>
                        </div>
                        <div class="form-check form-switch mt-2 d-flex justify-content-between" style="font-size: 12px;">
                            <input @change="changeStatus($event, item.id)" class="form-check-input"
                                style="visibility: hidden;" type="checkbox" :checked="cekStatus(item.id)" role="switch"
                                :id="'flexSwitchCheckDefault' + item.id">
                            <label v-if="cekStatus(item.id)" class="form-check-label text-success"
                                :for="'flexSwitchCheckDefault' + item.id"><i class="bi bi-check2-circle "></i>
                                Selesai</label>
                            <label v-else class="form-check-label text-danger" :for="'flexSwitchCheckDefault' + item.id"><i
                                    class="bi bi-x-lg"></i>
                                Belum Selesai</label>

                        </div>
                    </div>

                </li>
                <li v-else class="list-group-item d-flex justify-content-between align-items-start"
                    v-for="(item, i) in     props.listTugas.filter(tgs => tgs.mk_id == data.id)">
                    sd
                    <div class="ms-2 me-auto">
                        <div class="d-flex justify-content-between">

                            <div class="fw-bold" style="font-size: 12px;">
                                <i class="bi bi-calendar3"></i> <span class="text-primary">{{ item.created_at
                                }}</span> <i class="bi bi-calendar2-event"></i> <span class="text-danger">{{
    item.deadline }} </span>
                                |
                                <i class="bi bi-clock-fill"></i> 22:00 Malam
                                <br>
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
                        <div :class="cekStatus(item.id) ? 'selesai' : 'belum_selesai'">
                            <i style="font-size: 14px;">{{ item.keterangan }}
                            </i>
                        </div>
                        <div class="form-check form-switch mt-2 d-flex justify-content-between" style="font-size: 12px;">
                            <input @change="changeStatus($event, item.id)" class="form-check-input"
                                style="visibility: hidden;" type="checkbox" :checked="cekStatus(item.id)" role="switch"
                                :id="'flexSwitchCheckDefault' + item.id">
                            <label v-if="cekStatus(item.id)" class="form-check-label text-success"
                                :for="'flexSwitchCheckDefault' + item.id"><i class="bi bi-check2-circle "></i>
                                Selesai</label>
                            <label v-else class="form-check-label text-danger" :for="'flexSwitchCheckDefault' + item.id"><i
                                    class="bi bi-x-lg"></i>
                                Belum Selesai</label>

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
import SyncLoader from 'vue-spinner/src/SyncLoader.vue';
import { reactive, ref, onMounted, computed, defineEmits, defineProps, pushScopeId } from 'vue';

const props = defineProps(["listTugas", "matakuliahs", "isAdmin", "totalTugas", "isLoadingContent", "hideHangus"])
const emit = defineEmits(["hapusTugas"])
const selesais = ref([])
const changeStatus = (e, id) => {
    if (selesais.value.length == 0) {
        selesais.value.push({
            id: id,
            status: e.target.checked
        })
    } else {
        let cek = selesais.value.find(item => item.id == id)
        if (typeof cek != "undefined") {
            cek.status = e.target.checked
        } else {
            selesais.value.push({
                id: id,
                status: e.target.checked
            })
        }
    }

    localStorage.setItem('statues', JSON.stringify(selesais.value))
}



const cekStatus = (id) => {

    if (selesais.value.length > 0) {
        let cek = selesais.value.find(item => item.id == id)
        if (typeof cek != 'undefined') {
            return cek.status
        }
    }
    return false
    // let statues = JSON.parse(localStorage.getItem('statues'))
    // if (statues != null) {
    //     let cek = statues.find(item => item.id == id)
    //     if (typeof cek != 'undefined') {
    //         return cek.status
    //     }
    // } else {
    //     let cek = statues.find(item => item.id == id)
    //     if (typeof cek != 'undefined') {
    //         return cek.status
    //     }
    // }
    // return false
}
onMounted(() => {
    selesais.value = JSON.parse(localStorage.getItem('statues')) != null ? JSON.parse(localStorage.getItem('statues')) : []
})

const getFormatDate = (tgl) => {
    let d = new Date(tgl);
    return `${d.getDay()}-${d.getMonth()}-${d.getFullYear()}`
}
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
    if (getDeadline(Date.now(), item.deadline) == 0) {
        return 'Sisa Malam ini'
    } else if (getDeadline(Date.now(), item.deadline) <= -1) {
        return 'Hangus'
    } else {
        return 'Sisa ' + getDeadline(Date.now(), item.deadline) + ' Hari'
    }
}

const warnaDeadline = (item) => {


    if (getDeadline(Date.now(), item.deadline) >= 6) {
        return 'bg-success'
    } else if (getDeadline(Date.now(), item.deadline) <= 5 && getDeadline(Date.now(), item.deadline) >= 3) {
        return 'bg-warning'
    } else if (getDeadline(Date.now(), item.deadline) < 3 || getDeadline(Date.now(), item.deadline) == 0) {
        return 'bg-danger'
    } else if (getDeadline(Date.now(), item.deadline) < 0) {
        return 'bg-secondary'
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
.selesai {
    background-color: #efe;
    padding: .3rem 1rem;
    border-radius: 0 .5rem .5rem 0;
    margin-top: .5rem;
    border-left: 5px solid green;
    font-weight: 400;
    min-width: 100% !important;
    transition: color 1s;
}

.belum_selesai {
    background-color: #eee;
    padding: .3rem 1rem;
    border-radius: 0 .5rem .5rem 0;
    margin-top: .5rem;
    border-left: 5px solid red;
    font-weight: 400;
    min-width: 100% !important;
    transition: color 1s;
}

.badge-l {
    border-radius: 10px 0 0 10px !important;
}

.badge-r {
    border-radius: 0px 10px 10px 0px !important;
}
</style>