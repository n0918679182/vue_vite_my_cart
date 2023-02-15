import { defineStore } from "pinia";
import axios from "axios";

export default defineStore('userStore',{
    state: ()=> ({
        users: [],
        userId: 0
    }),
    actions: {
        getAllUsers() {
            // axios.post('http://localhost:8080/MyCartSSH/getAllUsers').then(resp=>{
            //     this.users = resp.data
            // })
            axios.get('http://localhost:3000/users').then(resp=>{
                this.users = resp.data
            })
        },
        login(mail, pwd, loginModal) {
            if(mail && pwd) {
                this.users.forEach(user=>{
                    if(user.mail === mail && user.pwd === pwd) {
                        this.userId = user.id;
                        loginModal.hide();
                    }
                })
            } else {
                alert('帳號密碼輸入不全')
            }
        },
        logout() {
            this.userId = 0;
        }
    }
})