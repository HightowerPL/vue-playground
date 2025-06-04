import {
    createRouter,
    createWebHashHistory,
} from "vue-router"

import ToDoListVue from "../views/todolist/view.vue"
import FormVue from "../views/form/view.vue"
import Snack from "../views/snack/view.vue"
import HelloWorldVue from "../views/helloworld/view.vue"
import Cats from "../views/cats/view.vue"
import Products from "../views/products/view.vue"

export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HelloWorldVue
        },
        {
            path: '/todolist',
            name: 'ToDo',
            component: ToDoListVue
        },
        {
            path: '/form',
            name: 'Form',
            component: FormVue
        },
        {
            path: '/snack',
            name: 'Snackbar',
            component: Snack
        },
        {
            path: '/cats',
            name: 'Cats',
            component: Cats
        },
        {
            path: '/products',
            name: 'Products',
            component: Products
        }
    ]
})