<template>
    <div>
        <div class="row row-cols-4 my-5 g-4">
            <div class="col" v-for="p in products" :key="p.id">
                <div class="card">
                    <img :src="p.imageUrl" class="card-img-top" style="height: 250px;" alt="">
                    <div class="card-body">
                        <h5 class="card-title h6 py-2">
                            {{ p.title }}
                            <span class="float-end h6">${{ p.price }}</span>
                        </h5> <!-- 呼叫pinia管理的方法(記得帶入參數 否則會回傳滑鼠點擊事件) -->
                        <a href="#" class="btn btn-outline-success w-100 btn-sm" @click.prevent="addToCart(p.id)">加入購物車</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import productStore from '../stores/productStore.js';
import cartStore from '../stores/cartStore.js';
import {mapState, mapActions} from "pinia";
export default {
    computed: {
        ...mapState(productStore, ['products'])
    },
    methods: {
        ...mapActions(cartStore, ['addToCart']),
        ...mapActions(productStore, ['allProducts'])
    },
    mounted() {
        this.allProducts();
    },
}
</script>