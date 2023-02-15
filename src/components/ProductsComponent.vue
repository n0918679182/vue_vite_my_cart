<template>
    <div>
        <div class="modal fade" id="cartModal" tabindex="-1" aria-labelledby="cartModal" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-body">
                        <div class="bg-light my-4 p-4">
                            <div v-if="!cartList.carts.length">購物車沒有任何品項</div>
                            <table class="table align-middle">
                                <tbody>
                                    <tr v-for="item in cartList.carts" :key="item.id">
                                        <td width="100">
                                            <a href="#" class="text-dark" @click.prevent="removeCartItem(item.id)">x</a>
                                        </td>
                                        <td width="100">
                                            <img :src="item.product.imageUrl" class="table-image" alt="">
                                        </td>
                                        <td>
                                            {{ item.product.title }}
                                        </td>
                                        <td>
                                            <select name="" class="form-select" id="" :value="item.qty"
                                                @change="(evt) => setCartQty(item.id, evt)">
                                                <option :value="i" v-for="i in 20" :key="i">{{ i }}</option>
                                            </select>
                                        </td>
                                        <td class="text-end">
                                            $ {{ item.subtotal }}
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="5" class="text-end">總金額 NT$ {{ cartList.total }}</td>
                                    </tr>
                                    <tr v-if="cartList.carts.length">
                                        <td colspan="5" class="text-center"><button type="button"
                                                class="btn btn-success" @click="addOrder(cartList);">送出訂單</button></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import cartStore from '../stores/cartStore.js';
import { mapState, mapActions } from "pinia";
export default {
    data() {
        return {
            name: ''
        }
    },
    computed: {
        ...mapState(cartStore, ['cartList', 'orders'])
    },
    methods: {
        ...mapActions(cartStore, ['removeCartItem', 'setCartQty', 'getOrders', 'addOrder'])
    },
    mounted() {
        this.getOrders();
    },
}
</script>