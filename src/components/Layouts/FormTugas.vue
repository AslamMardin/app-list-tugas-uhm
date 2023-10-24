<template>
    <div class="card shadow">
        <div class="card-body">
            <p>Masukan Tugas Baru</p>
            <form @submit.prevent="tambahTugas">
                <div class="mb-3">
                    <label for="matakuliah" class="form-label">Matakuliah</label>
                    <select class="form-control" id="matakuliah" v-model="forms.mk">
                        <option value="0">Pilih Matakuliah</option>
                        <option v-for="(item, i) in props.matakuliahs" :key="i" :value="item.id">{{
                            item.mk }}</option>
                    </select>
                    <div class="text-danger" v-show="errors.mk.length != 0">{{ errors.mk }}</div>
                </div>
                <div class="mb-3">
                    <label for="deadline" class="form-label">Deadline</label>
                    <input v-model="forms.deadline" type="date" class="form-control" id="deadline"
                        aria-describedby="emailHelp">
                    <div class="text-danger" v-show="errors.deadline.length != 0">{{ errors.deadline }}</div>
                </div>
                <div class="mb-3">
                    <label for="tugas" class="form-label">Keterangan Tugas</label>
                    <textarea v-model="forms.keterangan" id="tugas" class="form-control" rows="5"></textarea>
                    <div class="text-danger" v-show="errors.keterangan.length != 0">{{ errors.keterangan }}</div>
                </div>
                <button type="submit" :disabled="isLoading" class="btn btn-primary">{{ isLoading ? 'Harap Tunggu ya..' :
                    'Tambah' }}</button>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, watch, computed, defineEmits, defineProps } from 'vue';
import Api from '../../api';
import Swal from 'sweetalert2';
const props = defineProps(['matakuliahs'])
const emit = defineEmits(["getTugas"])
const isLoading = ref(false)
const forms = reactive({
    mk: 0,
    deadline: '',
    keterangan: ''
})

const errors = reactive({
    mk: '',
    deadline: '',
    keterangan: ''
})

const tanggalSekarang = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return mm + '-' + dd + '-' + yyyy;
}


const tambahTugas = () => {
    if (forms.mk == 0) {
        errors.mk = "Harus milih matakuliah yang ada"
    } else {
        errors.mk = ""
    }

    if (forms.deadline.length == '') {
        errors.deadline = "tolong deadlinenya diperhatikan"
    } else if ((new Date(forms.deadline) < new Date(tanggalSekarang()))) {
        errors.deadline = "deadlinenya besok ato lusa, pilih tanggal dengan benar"
    } else {
        errors.deadline = ""
    }

    if (forms.keterangan.length == '') {
        errors.keterangan = "tambahkan keterangan tugas ta"
    } else {
        errors.keterangan = ""
    }

    if (errors.mk.length == 0 && errors.deadline.length == 0 && errors.keterangan.length == 0) {
        const dataLengkap = {
            created_at: tanggalSekarang(),
            deadline: forms.deadline,
            keterangan: forms.keterangan,
            mk_id: forms.mk
        }
        isLoading.value = true
        setTimeout(() => {
            Api.post("tugas.json", dataLengkap)
                .then(res => {
                    emit("getTugas", res.data)
                    forms.mk = 0
                    forms.deadline = ""
                    forms.keterangan = ""

                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil',
                        text: 'berhasil menambah tugas!',
                    })
                }).catch(e => {
                    console.log(e)
                }).finally(() => {
                    isLoading.value = false
                })
        }, 3000)
    }

}

</script>