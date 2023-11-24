<template>
    <div class="d-flex justify-content-center opacity-45 align-items-center my-5" v-if="props.isLoadingContent">
        <SyncLoader color="gray" />
    </div>
    <div class="w-100" v-else>

        <div class="d-flex justify-content-between flex-wrap gap-1 align-items-center my-3" id="dhs-counter">
            <div class="card" style="width:49%; height: 10rem; border-radius: 1rem;"
                v-for="(data, j) in  props.matakuliahs    " :key="j">
                <div class="card-body">
                    <div class="card-content">
                        <div class="counter">
                            <i class="bi bi-journal-bookmark-fill"></i>
                            <span class="span-counter">{{ hitungTugasForMK(data.id) }}</span>
                        </div>
                        <div class="content mt-1">
                            <b>
                                <a :href="'#' + data.mk">{{ data.mk }}</a>
                            </b>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <!-- list baru -->
        <div v-if="props.listTugas.length > 0" class="card listTugas" v-for="(data, j) in     props.matakuliahs" :key="j">
            <div class="card-body" :id="data.mk">
                <div class="profile-dosen d-flex justify-content-between align-items-center">
                    <i class="bi bi-person-workspace"></i>
                    <div class="content-dosen">
                        <h5>{{ data.dosen }}</h5>
                        <h6>{{ data.mk }}</h6>
                    </div>
                </div>
                <div v-if="hideHangus" class="card card-list"
                    v-for="(item, i) in  props.listTugas.filter(tgs => tgs.mk_id == data.id)    " :key="i">
                    <div v-if="getDeadline(Date.now(), item.deadline) >= 0" class="card-body list-message">
                        <div class="title-message">
                            <div class="tgl-left">
                                <i class="bi bi-calendar-plus-fill"></i>
                                {{ item.created_at }}
                                <i class="bi bi-calendar-check-fill"></i>
                                {{ item.deadline }}
                            </div>
                            <div class="deadline" :class="warnaDeadline(item)">
                                {{ prosesDeadline(item) }}
                            </div>
                        </div>
                        <div class="body-message" :class="cekStatus(item.id) ? 'selesai' : ''">
                            {{ item.keterangan }}
                            <span class="badge-status" v-show="cekStatus(item.id)"><i class="bi bi-check2-all"></i></span>
                        </div>
                        <div class="footer-message d-flex justify-content-between align-items-center">
                            <div class="footer-message-info">
                                <span class="badge bg-dark" style="border-radius: .5rem 0 0 .5rem;">{{ item.status
                                }}</span>

                                <!-- opsi ubah status -->
                                <input @change="changeStatus($event, item.id)" class="form-check-input"
                                    style="visibility: hidden;" type="checkbox" :checked="cekStatus(item.id)" role="switch"
                                    :id="'flexSwitchCheckDefault' + item.id">

                                <label v-if="cekStatus(item.id)" style="margin-left: -1rem; border-radius: 0 .5rem .5rem 0;"
                                    class="badge bg-success" :for="'flexSwitchCheckDefault' + item.id">
                                    Selesai</label>
                                <label v-else style="margin-left: -1rem; border-radius: 0 .5rem .5rem 0;"
                                    class="badge bg-danger" :for="'flexSwitchCheckDefault' + item.id">
                                    Belum Selesai</label>
                                <!-- end opsi ubah status -->
                            </div>

                            <div class="footer-message-aksi">
                                <a v-if="isAdmin == 'admin'" style="cursor: pointer;font-size: 18px;"
                                    class="text-danger mr-1" @click.prevent="hapusData(item.id, item.keterangan)"><i
                                        class="bi bi-trash3-fill"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div v-else class="card card-list"
                    v-for="(item, i) in  props.listTugas.filter(tgs => tgs.mk_id == data.id)">
                    <div class="card-body list-message">
                        <div class="title-message">
                            <div class="tgl-left">
                                <i class="bi bi-calendar-plus-fill"></i>
                                {{ item.created_at }}
                                <i class="bi bi-calendar-check-fill"></i>
                                {{ item.deadline }}
                            </div>
                            <div class="deadline" :class="warnaDeadline(item)">
                                {{ prosesDeadline(item) }}
                            </div>
                        </div>
                        <div class="body-message" :class="cekStatus(item.id) ? 'selesai' : ''">
                            {{ item.keterangan }}
                            <span class="badge-status" v-show="cekStatus(item.id)"><i class="bi bi-check2-all"></i></span>
                        </div>
                        <div class="footer-message d-flex justify-content-between align-items-center">
                            <div class="footer-message-info">
                                <span class="badge bg-dark" style="border-radius: .5rem 0 0 .5rem;">{{ item.status
                                }}</span>

                                <!-- opsi ubah status -->
                                <input @change="changeStatus($event, item.id)" class="form-check-input"
                                    style="visibility: hidden;" type="checkbox" :checked="cekStatus(item.id)" role="switch"
                                    :id="'flexSwitchCheckDefault' + item.id">

                                <label v-if="cekStatus(item.id)" style="margin-left: -1rem; border-radius: 0 .5rem .5rem 0;"
                                    class="badge bg-success" :for="'flexSwitchCheckDefault' + item.id">
                                    Selesai</label>
                                <label v-else style="margin-left: -1rem; border-radius: 0 .5rem .5rem 0;"
                                    class="badge bg-danger" :for="'flexSwitchCheckDefault' + item.id">
                                    Belum Selesai</label>
                                <!-- end opsi ubah status -->
                            </div>

                            <div class="footer-message-aksi">
                                <a v-if="isAdmin == 'admin'" style="cursor: pointer;font-size: 18px;"
                                    class="text-danger mr-1" @click.prevent="hapusData(item.id, item.keterangan)"><i
                                        class="bi bi-trash3-fill"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div v-else class="notFound">
            <span>Data Tidak Ada</span>
        </div>

        <!-- ./ list baru -->
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
    background-color: #C7DCA7 !important;
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