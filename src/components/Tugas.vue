<script setup>


import Navbar from './Layouts/Navbar.vue';
import NamePlace from './Layouts/NamePlace.vue';
import Footer from './Layouts/Footer.vue'
import ListTugas from './Layouts/ListTugas.vue'
import FormTugas from './Layouts/FormTugas.vue';
import MenuFooter from './Layouts/MenuFooter.vue';

import api from '../api';
import { reactive, ref, onMounted, onBeforeMount } from 'vue';
import Swal from 'sweetalert2';

const namaMhs = reactive({})
const isAdmin = ref("")
const hideHangus = ref(true)
const mk = ref([])
const hideForm = ref(true)
const input = ref(null)
const play = () => {
    input.value.play()
}

const tanyaNama = () => {
    const name = prompt('Masukan Nama Mu ?', 'Pengunjung');
    const npm = prompt('Masukan NPM Mu ?', '2023130001');
    let admin = "";
    if (npm == "2023130018" && name == "Aslam Mardin99") {
        admin = "admin"
    } else {
        admin = "client"
    }


    localStorage.setItem('myAuth', JSON.stringify({
        name, npm, admin
    }))
}

const getMatakuliah = async () => {
    await api.get("matakuliah.json")
        .then(res => {
            mk.value = res.data.filter(item => item != null)

        })


}
const totalTugas = ref(0)
const listTugas = ref([])
const dataBaru = ref([])
const getApiTugas = async () => {
    await api.get("tugas.json")
        .then(res => {
            for (let key in res.data) {
                listTugas.value.push({
                    id: key,
                    created_at: res.data[key].created_at,
                    deadline: res.data[key].deadline,
                    keterangan: res.data[key].keterangan,
                    mk_id: res.data[key].mk_id,
                    status: res.data[key].status
                })
                totalTugas.value++
            }
        })
}

const getTugas = (data) => {
    listTugas.value = []
    getApiTugas()
}

const hapusTugas = async (id) => {
    await api.delete(`tugas/${id}.json`).then(res => {
        Swal.fire(
            'Terhapus!',
            'Tugas kamu sudah terhapus.',
            'success'
        )
        listTugas.value = []
        getApiTugas()
    }).catch(e => {
        Swal.fire(
            'Gagal!',
            'gagal terhapus.',
            'error'
        )
    })

}

onBeforeMount(() => {
    const getAuth = JSON.parse(localStorage.getItem('myAuth'))
    if (getAuth == null) {
        tanyaNama()
    } else {
        if (getAuth.npm == "2023130018" && getAuth.name == "Aslam Mardin99") {
            localStorage.setItem('myAuth', JSON.stringify({
                name: getAuth.name,
                npm: getAuth.npm,
                admin: "admin"
            }))
        } else {
            localStorage.setItem('myAuth', JSON.stringify({
                name: getAuth.name,
                npm: getAuth.npm,
                admin: "client"
            }))
        }

    }
})

const isLoadingContent = ref(true)

onMounted(() => {
    const getAuth = JSON.parse(localStorage.getItem('myAuth'))
    isAdmin.value = getAuth.admin
    namaMhs.name = getAuth.name
    namaMhs.npm = getAuth.npm

    setTimeout(() => {
        isLoadingContent.value = false
        getApiTugas()
        getMatakuliah()
        Swal.fire({
            title: 'TUGAS UHM 2024',
            text: "Yang penting Pasal 1!!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok, Liat Tugas!'
        }).then((result) => {
            if (result.isConfirmed) {
                play()
            }
        })
    }, 2000)


})

const _hideForm = () => {
    if (isAdmin.value != 'admin') {
        Swal.fire({
            title: 'TUGAS UHM 2024',
            text: "Maaf, Anda Bukan admin. silahkan hubungin pak aslam!",
            icon: 'warning',

        })
        return false
    }
    hideForm.value = false

}



</script>


<template>
    <audio ref="input" id="player">
        <source src="ucapan_indo.mp3" type="audio/mp3">
    </audio>
    <Navbar>Daftar Tugas S2</Navbar>

    <div class="container px-4 my-4" id="cardNama">
        <div class="row">
            <NamePlace :data="namaMhs"></NamePlace>
        </div>
    </div>

    <div class="container px-4 mb-2" id="filter">
        <div class="row">
            <div class="card" style="border-radius: 1.5rem;">
                <div class="card-body">
                    <div class="form-check form-switch">
                        <input @change="hideHangus = !hideHangus" class="form-check-input" type="checkbox" role="switch"
                            id="showHangus" :checked="hideHangus">
                        <label class="form-check-label" for="showHangus">Tugas yang belum Expired saja!</label>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <section class="container mb-3">

        <ListTugas :isLoadingContent="isLoadingContent" :listTugas="listTugas" :matakuliahs="mk"
            @hapusTugas="hapusTugas" :isAdmin="isAdmin" :hideHangus="hideHangus" />
    </section>

    <div class="container mb-2" v-if="isAdmin == 'admin'">
        <button class="btn btn-dark" @click="hideForm = !hideForm"><i
                :class="!hideForm == true ? 'bi bi-eye-slash-fill' : 'bi bi-eye-fill'"></i> {{ !hideForm == true ?
                'Sembunyakan Form' : 'Tampilkan Form' }}</button>
    </div>
    <div class="container mb-4" v-show="isAdmin == 'admin'" v-if="!hideForm">
        <FormTugas :matakuliahs="mk" @getTugas="getTugas" />
    </div>


    <Footer> </Footer>
</template>