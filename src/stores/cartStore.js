import { defineStore } from "pinia";
import axios from "axios";
import productStore from './productStore.js';
import userStore from "./userStore.js";

export default defineStore('cartStore', {
    state: () => ({
        cart: [],
        orders: [],
    }),
    actions: {
        addToCart(productId, qty = 1) {
            const currentCart = this.cart.find(item=>item.productId === productId);
            if(currentCart) {
                currentCart.qty += qty;
            } else {
                this.cart.push({
                    id: new Date().getTime(),
                    productId,
                    qty
                })
            }
        },
        setCartQty(id, event) {
            const currentCart = this.cart.find((item)=>item.id === id);
            currentCart.qty = event.target.value * 1;
        },
        removeCartItem(id) {
            const index = this.cart.findIndex((item) => item.id === id);
            this.cart.splice(index, 1);
        },
        getOrders() {
            axios.get('http://localhost:3000/orders').then(resp=>{
                this.orders = resp.data
            })
        },
        async addOrder(cart) {
            const { userId } = userStore();
            if( userId != 0) {
                const serial = new Date().getTime();
                cart.carts.forEach(c=>{
                    const order = {
                        productId: c.productId,
                        amount: c.qty,
                        serial,
                        userId
                    }
                    axios.post("http://localhost:3000/orders",order).then(resp=>{
                        this.getOrders();
                        this.cart = [];
                    })
                })
            } else {
                alert('請先登入!')
            }
        }
    },
    getters: {
        cartList: ({ cart })=>{
            const { products } = productStore();
            const carts = cart.map(item=>{
                const product = products.find((p)=> p.id === item.productId);
                return {
                    ...item,
                    product,
                    subtotal: product.price * item.qty
                }
            });
            const total = carts.reduce((a,b)=> a + b.subtotal ,0);
            return {
                carts, // 列表
                total, // 總金額
            }
        }
    }
})