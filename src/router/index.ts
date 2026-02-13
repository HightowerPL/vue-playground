import {
    createRouter,
    createWebHashHistory,
} from "vue-router"

// Lazy-loaded route components for better performance
// Each route is code-split into a separate chunk that's only loaded when needed
export const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            // Home page is eagerly loaded since it's the landing page
            component: () => import("../views/helloworld/view.vue")
        },
        {
            path: '/todolist',
            name: 'ToDo',
            component: () => import("../views/todolist/view.vue")
        },
        {
            path: '/teams',
            name: 'Teams',
            component: () => import("../views/teams/index.vue")
        },
        {
            path: '/players',
            name: 'Players',
            component: () => import("../views/players/index.vue")
        },
        {
            path: '/players/:id',
            name: 'PlayerView',
            component: () => import("../views/players/edit.vue")
        },
        {
            path: '/players/edit',
            name: 'PlayerEdit',
            component: () => import("../views/players/edit.vue")
        },
        {
            path: '/match',
            name: 'Match',
            component: () => import("../views/match/index.vue")
        },
        {
            path: '/form',
            name: 'Form',
            component: () => import("../views/form/view.vue")
        },
        {
            path: '/snack',
            name: 'Snackbar',
            component: () => import("../views/snack/view.vue")
        },
        {
            path: '/cats',
            name: 'Cats',
            component: () => import("../views/cats/view.vue")
        },
        {
            path: '/products',
            name: 'Products',
            component: () => import("../views/products/view.vue")
        },
        {
            path: '/quotes',
            name: 'Quotes',
            component: () => import("../views/quotes/index.vue")
        }
    ]
})