<script setup>
import Tugas from './components/Tugas.vue';
import './app.css'
import MenuFooter from './components/Layouts/MenuFooter.vue';
import { provide } from 'vue';

</script>

<template>
  <RouterView></RouterView>

  <MenuFooter></MenuFooter>
</template>