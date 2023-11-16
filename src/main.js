import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from './router'

import VueSweetalert2 from 'vue-sweetalert2'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css';
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

app.use(VueSweetalert2)

window.Swal = app.config.globalProperties.$swal;
app.use(router)
app.component('EasyDataTable', Vue3EasyDataTable)
app.use(createPinia())
app.mount('#app')
