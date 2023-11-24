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
</style>
<template>
    <!-- Bottom Navbar -->
    <nav class="navbar navbar-dark bg-info navbar-expand fixed-bottom d-md-none d-lg-none d-xl-none" id="menu-footer">
        <ul class="navbar-nav nav-justified w-100">
            <li class="nav-item" alt="Home">
                <a href="#" class="nav-link">
                    <i class="bi bi-person-vcard"></i>
                </a>
            </li>
            <li class="nav-item" alt="Indentitas">
                <a href="#" class="nav-link">
                    <i class="bi bi-search"></i>
                </a>
            </li>
            <li class="nav-item notMenu">
                <a href=" #" class="nav-link" @click.prevent="emit('hideForm')">
                    <i class="bi bi-plus-circle"></i>
                </a>
            </li>
            <li class="nav-item" alt="Pencipta">
                <a href="https://aslammardin.github.io" class="nav-link">
                    <i class="bi bi-github"></i>
                </a>
            </li>
            <li class="nav-item" alt="Informasi">
                <a href="#" class="nav-link">
                    <i class="bi bi-info-circle"></i>
                </a>
            </li>

        </ul>
    </nav>
</template>

<script setup>

const emit = defineEmits(['hideForm'])

</script>
