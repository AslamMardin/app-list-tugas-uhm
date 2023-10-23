<template>
    <div class="card shadow">
        <div class="card-body">
            <b>Selamat Datang</b>
            <hr>
            <p><i class="bi bi-person-circle"></i> {{ data.name }} <b>({{ data.npm }})</b>.
            </p>

        </div>
    </div>
</template>

<script setup>
const props = defineProps(['data'])
</script>

<style scoped>
p {
    margin: 0;
    padding: 0;
}
</style>