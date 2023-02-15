<template>
    <div>
        <div class="modal fade" ref="loginModal" id="loginModal" aria-hidden="true" aria-labelledby="loginModalLabel"
            tabindex="-1">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="loginModalLabel">登入</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="mail" placeholder="請輸入信箱" v-model="mail">
                            <label for="mail">請輸入信箱</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="pwd" placeholder="請輸入密碼" v-model="pwd">
                            <label for="pwd">請輸入密碼</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-success" @click="login(mail, pwd, loginModal)">登入</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import userStore from "../../stores/userStore";
import { mapState, mapActions } from 'pinia';
import { Modal } from 'bootstrap'
export default {
    data() {
        return {
            mail: '',
            pwd: '',
            loginModal: {}
        }
    },
    computed: {
        ...mapState(userStore, ['users'])
    },
    methods: {
        ...mapActions(userStore, ['getAllUsers', 'login'])
    },
    mounted() {
        this.getAllUsers();
        this.loginModal = new Modal('#loginModal');
        this.$refs.loginModal.addEventListener('hidden.bs.modal', () => {
            this.mail = '';
            this.pwd = '';
        })
    }
}
</script>