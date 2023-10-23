<script setup>

import Navbar from './Layouts/Navbar.vue';
import NamePlace from './Layouts/NamePlace.vue';
import Footer from './Layouts/Footer.vue'
import ListTugas from './Layouts/ListTugas.vue'
import FormTugas from './Layouts/FormTugas.vue';

import api from '../api';
import { reactive, ref, onMounted, onBeforeMount } from 'vue';

const namaMhs = reactive({})
const isAdmin = ref("")

const mk = ref([])

const tanyaNama = () => {
    const name = prompt('Masukan Nama Mu ?', 'Pengunjung');
    const npm = prompt('Masukan NPM Mu ?', '2023130001');
    let admin = "";
    if (npm == "2023130018") {
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
const listTugas = ref([])
const getApiTugas = async () => {
    await api.get("tugas.json")
        .then(res => {
            listTugas.value = res.data
        })
}

const getTugas = () => {
    getApiTugas()
}

onBeforeMount(() => {
    const getAuth = JSON.parse(localStorage.getItem('myAuth'))
    if (getAuth == null) {
        tanyaNama()
    }
})

onMounted(() => {
    const getAuth = JSON.parse(localStorage.getItem('myAuth'))
    isAdmin.value = getAuth.admin
    namaMhs.name = getAuth.name
    namaMhs.npm = getAuth.npm

    getApiTugas()
    getMatakuliah()


})

</script>

<template>
    <Navbar>Daftar Tugas</Navbar>

    <div class="row mt-5 mb-2">
        <div class="col-12">
            <img src="logo-uhm.png" alt="Logo UHM" class="img-fluid">
        </div>
    </div>

    <div class="container px-4 mb-2">
        <div class="row">
            <NamePlace :data="namaMhs"></NamePlace>
        </div>
    </div>

    <section class="container mb-3">
        <ListTugas :listTugas="listTugas" />
    </section>

    <div class="container mb-4" v-show="isAdmin == 'admin'">
        <FormTugas :matakuliahs="mk" @getTugas="getTugas" />
    </div>

    <Footer></Footer>
</template>
