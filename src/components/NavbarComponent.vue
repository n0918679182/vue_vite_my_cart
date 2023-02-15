<template>
    <div class="container fixed-top">
        <nav class="navbar navbar-light bg-white">
            <div class="container-fluid">
                <span class="navbar-brand mb-0 h1">甜點小舖</span>
                <div class=d-flex>
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#cartModal">
                        購物車
                        <span class="badge rounded-pill bg-danger text-white">{{ cart.length }}</span>
                    </button>
                    <button v-if="userId == 0" type="button" class="btn" data-bs-toggle="modal"
                        data-bs-target="#loginModal">
                        登入
                    </button>
                    <div v-else>
                        <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#orderModal">
                            訂單
                        </button>
                        <button type="button" class="btn" @click="logout">
                            登出
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
    <order-modal></order-modal>
    <login-modal></login-modal>
</template>

<script>
import { mapState, mapActions } from "pinia";
import cartStore from '../stores/cartStore.js';
import orderModal from './modal/orderModal.vue';
import loginModal from './modal/loginModal.vue';
import userStore from '../stores/userStore.js';

export default {
    data() {
        return {
            modal: {},
        }
    },
    computed: {
        ...mapState(cartStore, ['cart']),
        ...mapState(userStore, ['userId'])
    },
    methods: {
        ...mapActions(userStore, ['logout'])
    },
    components: {
        orderModal,
        loginModal,
    }
}
</script>