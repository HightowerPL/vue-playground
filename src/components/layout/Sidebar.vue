<template>
    <nav class="sidebar"
        :class="[ isSidebarOpen ? 'opened' : '' ]"
    >
        <div class="sidebar__header">
            <h1 class="text-xxl font-bold">PORTAL</h1>
        </div>
        <div class="sidebar__body">

            <div v-for="item in items" :key="item.id" class="mt-6">

                <p class="uppercase font-bold  text-green px-4 mb-4">{{ item.name }}</p>

                <ul class="sidebar__nav mb-6" v-if="item.subitems && item.subitems.length > 0">
                    <li v-for="subitem in item.subitems" :key="subitem.id" class="sidebar__nav-item">
                        <router-link
                            data-n="PRODUCTS"
                            class="sidebar__nav-link"
                            :to="subitem.path"
                        >
                            <OhVueIcon
                                class="sidebar__icon"
                                :name="subitem.icon"
                            />
                            {{ subitem.name }}
                        </router-link>
                    </li>
                </ul>
            </div>

        </div>


        <div class="sidebar__footer">
            <Toggle
                :label="sidebarIsDarkMode ? 'Dark Mode' : 'Light Mode'"
                name="dark_mode"
                v-model="sidebarIsDarkMode"
            />
        </div> 
    </nav>
</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { ref, watch } from 'vue';
import { useGlobalStore } from '../../store/global.ts';
import { storeToRefs } from 'pinia';
import Toggle from '../../components/fields/Toggle.vue';

const { isSidebarOpen, isDarkMode } = storeToRefs(useGlobalStore());

const sidebarIsDarkMode = ref(isDarkMode.value);

const items = ref([
    { 
        id: 1, 
        name: 'General',
        path: '',
        subitems: [
            { id: 11, name: 'Home', path: '/', icon: 'ri-home-5-fill' },
            { id: 12, name: 'Products', path: '/products', icon: 'io-cart-sharp' },
            { id: 13, name: 'Quotes', path: '/quotes', icon: 'bi-chat-left-quote-fill' },
            { id: 14, name: 'Match', path: '/match', icon: 'io-basketball-sharp' },
            { id: 15, name: 'Teams', path: '/teams', icon: 'fa-people-arrows' },
            { id: 16, name: 'Players', path: '/players', icon: 'bi-people-fill' },
        ]
    },
    {
        id: 2,
        name: 'Theme',
        path: '',
        subitems: [
            { id: 21, name: 'To do', path: '/todolist', icon: 'co-todoist' },
            { id: 22, name: 'Snackbar', path: '/snack', icon: 'fa-flag' },
            { id: 23, name: 'Cats', path: '/cats', icon: 'fa-cat' },
            { id: 24, name: 'Form', path: '/form', icon: 'si-formstack' },
        ]
    }
]);

watch(sidebarIsDarkMode, () => {
    useGlobalStore().toggleDarkMode()
})

</script>

<style scoped lang="scss">


</style>