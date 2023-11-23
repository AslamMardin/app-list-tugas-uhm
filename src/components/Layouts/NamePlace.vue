<template>
    <div class="d-flex justify-content-center align-items-center gap-4 ">
        <i class="bi bi-person-circle icon-utama"></i>
        <p>
            {{ data.name }}
            <br>
            {{ data.npm }}
        </p>
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