import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import DefaultLayout from './layout/DefaultLayout.vue'
import { router } from './router'
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { FaCat, FaFlag, RiZhihuFill, IoCartSharp, RiHome5Fill, CoTodoist, SiFormstack, FaWpforms, MdAddbox, FaTrash } from "oh-vue-icons/icons";

addIcons(FaCat, FaFlag, RiZhihuFill, IoCartSharp, RiHome5Fill, CoTodoist, SiFormstack, FaWpforms, MdAddbox, FaTrash);

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.component('default-layout', DefaultLayout);
app.component("v-icon", OhVueIcon);
app.use(router)
app.mount('#app')
