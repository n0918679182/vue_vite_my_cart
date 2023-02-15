import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(VueAxios, axios)

app.mount('#app')
