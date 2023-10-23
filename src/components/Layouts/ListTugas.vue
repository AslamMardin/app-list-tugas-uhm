<template>
    <div class="card shadow">

        <div class="card-body">
            <div class="alert alert-warning">
                <i class="bi bi-exclamation-triangle-fill"></i> Kerja Tugasta, Jangan Malas-Malasan!
            </div>
            <ol class="list-group ">
                <li class="list-group-item-primary list-group-item">
                    <i class="bi bi-pin-fill"></i> Analsisis dan Pemograman Object
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-start" v-for="(item, i) in listTugas"
                    :key="i">
                    <div class="ms-2 me-auto" v-if="item != null">
                        <div class="fw-bold">{{ item.created_at }}</div>
                        <i>"{{ item.keterangan }}"</i>
                    </div>
                    <span class="badge rounded-pill" :class="getDeadline(item.created_at,
                        item.deadline) > 6 ? 'bg-success' : (getDeadline(item.created_at,
                            item.deadline) <= 2 ? 'bg-danger' : 'bg-warning')" v-if="item != null">{{
            getDeadline(item.created_at,
                item.deadline) }}</span>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup>
import api from '../../api';
import { reactive, ref, onMounted, computed } from 'vue';

const listTugas = ref([])

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
const getApiTugas = async () => {
    await api.get("tugas.json")
        .then(res => {
            listTugas.value = res.data
            console.log(listTugas.value)
        })
}
onMounted(() => {
    getApiTugas()
})

</script>