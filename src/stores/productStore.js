import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('productStore', {
    state: () => ({
        products: []
    }),
    actions: {
        async allProducts() {
            await axios.get('http://localhost:3000/products').then(resp=>{
                this.products = resp.data.map(o=>{
                    return {
                        id: o.id,
                        title: o.name,
                        imageUrl: o.imgUrl,
                        price: o.price
                    }
                }).sort((a,b)=> a.price - b.price);
            });
        }
    }
})