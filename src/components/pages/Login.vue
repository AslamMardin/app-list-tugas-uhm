<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card mt-5" id="login">
                    <span class="card-title">Login</span>
                    <div class="card-body">
                        <img src="gambar-login.png" alt="">

                        <div v-if="pesan.length > 0" class="alert alert-danger mt-2">
                            {{ pesan }}
                        </div>
                        <form @submit.prevent="_prosesLogin">
                            <div class="mb-3">
                                <label for="kata_sandi" class="form-label text-center d-block">Kata Sandi</label>
                                <div class="position-relative">
                                    <input v-model="pass" :type="typeInput" class="form-control" id="kata_sandi"
                                        placeholder="****">
                                    <span id="btn-show" @click="_showHidePassword">
                                        <i class="bi"
                                            :class="typeInput == 'password' ? 'bi-eye-fill' : 'bi-eye-slash-fill'"></i>
                                    </span>
                                </div>
                            </div>
                            <button type="submit" class="btn"><i class="bi bi-unlock-fill"></i> Login</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const typeInput = ref("password")
const pass = ref("")
const pesan = ref("")
const _showHidePassword = () => {
    if (typeInput.value == 'text') {
        typeInput.value = 'password'
    } else {
        typeInput.value = 'text'
    }
}

const _prosesLogin = () => {
    if (pass.value != '995899556060') {
        pesan.value = "Kata Sandi Salah, Coba Lagi!"
        return false
    }
    alert('berhasil')
}
</script>
<style scoped>
.card {
    animation: animTop .3s ease-in;
}

.card-title {
    position: absolute;
    top: -1rem;
    outline: none;
    left: 50%;
    transform: translateX(-50%);
    background-color: #072541;
    color: #fff;
    padding: .3rem 5rem;
    font-size: 1.3rem;
    border-radius: 10px
}

#login {
    margin-bottom: 8rem;
}

#login label {
    font-size: 2rem;
    font-weight: 700;
}

#login input[type="password"],
#login input[type="text"] {
    outline: none;
    border: 1px solid #FFC436;
    font-size: 2rem;
    text-align: center;
    height: 3rem !important;
}

#login #btn-show i {
    font-size: 1.5rem;
    color: #aaa;
    cursor: pointer;
}

#login #btn-show {
    position: absolute;
    right: 1rem;
    bottom: .4rem;
}

#login button {
    background-color: #FFC436;
    color: #000;
    height: 3rem;
    width: 100%;
    font-size: 1.5rem;
    display: block;
    font-weight: 500;
}

#login button:hover {
    background-color: #072541;
    color: #fff;
}

@keyframes animTop {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>