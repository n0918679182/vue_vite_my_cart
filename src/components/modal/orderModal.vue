<template>
    <div>
        <div class="modal fade" id="orderModal" aria-hidden="true" aria-labelledby="orderModalLabel" ref="orderModal" tabindex="-1">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="orderModalLabel">我的訂單明細</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="m-3 p-2 border rounded-2" v-for="(o, i) in ordersByName" :key="i">
                            <div class="d-flex justify-content-between pe-3">
                                <p class="ms-1">訂單編號: {{ o.serial }}</p>
                                <a href="#" class="text-danger text-decoration-none"
                                    @click.prevent="deleteOrder(o)">取消訂單</a>
                            </div>
                            <div v-for="p in o.products" :key="p.oid"
                                class="d-flex justify-content-between px-3 py-1 mb-3">
                                <div class="d-flex justify-content-between w-75">
                                    <p class="mb-0">{{ p.detail.title }}</p>
                                    <p class="mb-0">$ {{ p.detail.price }}</p>
                                </div>
                                <p class="mb-0">{{ p.amount }} 個</p>
                            </div>
                            <p class="text-end me-3">$ {{ o.total}} 元</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import productStore from '../../stores/productStore.js';
import userStore from '../../stores/userStore';
import { mapState } from 'pinia';
import axios from "axios";

export default {
    data() {
        return {
            ordersByName: [],
            orderModal: {}
        }
    },
    computed: {
        ...mapState(productStore, ['products']),
        ...mapState(userStore, ['userId'])
    },
    methods: {
        // 取得該用戶的訂單並做重組
        async getOrderByUser() {
            this.ordersByName = []
            await axios.get('http://localhost:3000/orders?userId='+this.userId).then(resp => {
                let serials = [];
                const newOrders = [];
                // 取出所有序號
                resp.data.forEach(o => {
                    serials.push(o.serial)
                });
                // 去除掉重複的序號
                serials = serials.reduce((a, b) => {
                    a[b] = 1
                    return a
                }, {});
                serials = Object.keys(serials);
                // 將相同訂單序號的訂單結合再一起
                serials.forEach(s => {
                    const order = {
                        serial: s,
                        products: []
                    };
                    resp.data.forEach(o => {
                        if (o.serial == s) {
                            order.products.push(o)
                        }
                    });
                    newOrders.push(order);
                })
                this.ordersByName = newOrders;
                this.combinePidAndDetail(this.ordersByName);
                this.countTotal(this.ordersByName);
                // console.log('ordersByName', this.ordersByName);
            })
        },
        // 將訂單內的產品編號 與 所有產品列表做組合
        combinePidAndDetail(orders) {
            orders.forEach(o => {
                o.products.forEach(p => {
                    this.products.forEach(pDetail => {
                        if (p.id === pDetail.id) {
                            p.detail = pDetail;
                        }
                    })
                })
            })
        },
        // 計算單筆訂單的總金額
        countTotal(orders) {
            orders.forEach(o => {
                let total = 0;
                o.products.forEach(p => {
                    total += p.detail.price * p.amount;
                })
                o.total = total;
            })
        },
        deleteOrder(order) {
            order.products.forEach(o => {
                axios.delete('http://localhost:3000/orders/'+o.id).catch(err=>console.log('err',err.response.data.message))
                
            })
            this.getOrderByUser();
        }
    },
    mounted() {
        this.$refs.orderModal.addEventListener('shown.bs.modal', () => {
            this.getOrderByUser();
        })
    },
}




</script>