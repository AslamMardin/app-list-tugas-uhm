<template>
    <div class="card shadow">
        <div class="card-body">
            <p>Masukan Tugas Baru</p>
            <form>
                <div class="mb-3">
                    <label for="matakuliah" class="form-label">Matakuliah</label>
                    <select class="form-control" id="matakuliah">
                        <option value="">Pilih Matakuliah</option>
                        <option v-for="(mk, i) in props.matakuliahs" key="i" :value="mk.id">{{ mk.nama }}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label for="deadline" class="form-label">Deadline</label>
                    <input type="date" class="form-control" id="deadline" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="tugas" class="form-label">Keterangan Tugas</label>
                    <textarea id="tugas" class="form-control" rows="5"></textarea>
                    <div id="emailHelp" class="form-text">Masukan Tugas Dengan teliti.</div>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['matakuliahs'])
</script>