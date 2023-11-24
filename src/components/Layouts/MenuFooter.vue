<style scoped>
.nav-item {
    position: relative;
}

.nav-item:not(.notMenu):hover::before,
.nav-item:not(.notMenu):hover::after {
    opacity: 1;
}

.nav-item::before {
    position: absolute;
    content: attr(alt);
    background-color: #222831;
    height: 2rem;
    color: #fff;
    min-width: 4rem;
    max-width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    padding: .7rem;
    z-index: 5;
    opacity: 0;
}

.nav-item::after {
    content: "";
    position: absolute;
    background-color: #222831;
    width: 1rem;
    height: 1rem;
    top: -1.5rem;
    opacity: 0;
    left: 50%;
    transform: rotate(45deg) translateX(-50%);
}

.active {
    position: relative;
}

.active i {
    color: #222831;
}

.active::before {
    content: "";
    position: absolute;
    width: 3rem;
    height: 3rem;
    background-color: #FFF7D4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    border-radius: 50%;
}
</style>
<template>
    <!-- Bottom Navbar -->
    <nav class="navbar navbar-dark bg-info navbar-expand fixed-bottom d-md-none d-lg-none d-xl-none" id="menu-footer">
        <ul class="navbar-nav nav-justified w-100">
            <li class="nav-item" alt="Home">
                <router-link :to="{ name: 'home' }" @click="active = 'home'" class="nav-link"
                    :class="{ 'active': active == 'home' }">
                    <i class="bi bi-house-check"></i>
                </router-link>
            </li>
            <li class="nav-item" alt="Login">
                <router-link :to="{ name: 'login' }" @click="active = 'login'" class="nav-link"
                    :class="{ 'active': active == 'login' }">
                    <i class="bi bi-shield-lock"></i>
                </router-link>
            </li>
            <!-- <li class="nav-item notMenu">
                                                                                                                                                    <a href=" #" class="nav-link">
                                                                                                                                                        <i class=" bi bi-plus-circle"></i>
                                                                                                                                                    </a>
                                                                                                                                                </li> -->
            <li class="nav-item" alt="Pencipta">
                <a target="_blank" href="https://aslammardin.github.io/profile/" class="nav-link">
                    <i class="bi bi-github"></i>
                </a>
            </li>
            <li class="nav-item" alt="Tutorial">
                <router-link :to="{ name: 'tutorial' }" @click="active = 'tutorial'" class="nav-link"
                    :class="{ 'active': active == 'tutorial' }">
                    <i class="bi bi-info-circle"></i>
                </router-link>
            </li>

        </ul>
    </nav>
</template>

<script setup>
import { ref } from 'vue'
// const emit = defineEmits(['hideForm'])
const active = ref(null)

</script>
