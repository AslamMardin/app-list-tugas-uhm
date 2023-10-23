<script setup>
import Navbar from './Layouts/Navbar.vue';
import NamePlace from './Layouts/NamePlace.vue';
import Footer from './Layouts/Footer.vue'
import ListTugas from './Layouts/ListTugas.vue'
import FormTugas from './Layouts/FormTugas.vue';
import { reactive, onMounted, onBeforeMount } from 'vue';
const namaMhs = reactive({})


const mk = reactive([
    {
        id: 1,
        nama: "Analisis dan Pemograman Berbasis Object"
    },
    {
        id: 2,
        nama: "Probalitas dan Proses Stokastik"
    },
    {
        id: 3,
        nama: "Filsafat Ilmu Komputer"
    },
    {
        id: 4,
        nama: "Teknologi Jaringan Komputer"
    },
    {
        id: 5,
        nama: "Arsitektur Jaringan"
    },
    {
        id: 6,
        nama: "Rekayasa Web"
    },
])

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

onBeforeMount(() => {
    const getAuth = JSON.parse(localStorage.getItem('myAuth'))
    if (getAuth == null) {
        tanyaNama()
    }
})

onMounted(() => {
    const getAuth = JSON.parse(localStorage.getItem('myAuth'))
    namaMhs.name = getAuth.name
    namaMhs.npm = getAuth.npm
})

</script>

<template>
    <Navbar>Daftar Tugas</Navbar>

    <div class="row mt-5 mb-2">
        <div class="col-12">
            <img src="public/img/logo-uhm.png" alt="Logo UHM" class="img-fluid">
        </div>
    </div>

    <div class="container px-4 mb-2">
        <div class="row">
            <NamePlace :data="namaMhs"></NamePlace>
        </div>
    </div>

    <section class="container mb-3">
        <ListTugas />
    </section>

    <div class="container mb-4">
        <FormTugas :matakuliahs="mk" />
    </div>

    <Footer></Footer>
</template>
