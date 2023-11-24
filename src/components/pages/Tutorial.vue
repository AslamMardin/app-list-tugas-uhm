<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="card mt-5">
                    <span class="card-title">Tutorial</span>
                    <div class="card-body">
                        <h6><b>1. cara melihat tugas lama ?</b></h6>
                        <p style="text-align: justify;">Caranya dengan mengklik ini menjadi disable (non aktif) maka akan
                            memunculkan tugas yang lama,
                            untuk lebih lengkapnya lihat gambar berikut ini</p>
                        <img src="gambar-search.PNG" alt="">

                        <h6><b>2. cara menandai tugas yang sudah kita selesaikan ?</b></h6>
                        <p style="text-align: justify;">Caranya dengan mengklik tombol ini yang sudah saya tandai secara
                            berulang ulang, hal ini akan
                            mengubah menjadi
                            <b>selesai</b> atau <b>belum selesai</b>. untuk lebih lengkapnya lihat gambar
                            dibawah ini
                        </p>
                        <img src="gambar-status-sebelum.PNG" alt="">
                        <img src="gambar-status-setelah.PNG" alt="">

                        <p>Semoga Berhasil!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

</script>
<style scoped>
.card {
    padding-top: 3rem;
    animation: animTop .3s ease-in;
    box-sizing: border-box;
    margin-bottom: 8rem;
}

img {
    width: 100%;
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


@keyframes animTop {
    0% {
        transform: scale(0);
    }

    100% {
        transform: scale(1);
    }
}
</style>