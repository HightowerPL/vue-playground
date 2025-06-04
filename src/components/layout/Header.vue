<template>
    <header class="flex justify-between items-center px-4 py-6 lg:px-7 lg:py-7 bg-lightBlack">
        <Autocomplete
            id="header-search"
            class="flex-1 max-w-[600px]"
            :apiFn="searchItems"
            enableEnter
            >
            Search
        </Autocomplete>

        <BurgerButton
            @click="globalStore.toggleSidebar"
            :class="[ globalStore.getIsSidebarOpen ? 'opened' : '']"
        />


    </header>
</template>

<script setup lang="ts">
import Autocomplete from '../../components/fields/Autocomplete.vue';
import BurgerButton from '../../components/buttons/BurgerButton.vue';
import { useGlobalStore } from '../../store/global.ts';


const globalStore = useGlobalStore();

const searchItems = () => {
    const prom = new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data: [
                    { id: 1, name: 'Some item name',image: 'https://picsum.photos/400/400', stock_code: 'AJ56433' },
                    { id: 2, name: 'Heavy Bags',image: 'https://picsum.photos/400/400', stock_code: 'A888433' },
                    { id: 3, name: 'heavy',image: 'https://picsum.photos/400/400', stock_code: 'ER56433' },
                    { id: 4, name: 'ASD',image: 'https://picsum.photos/400/400', stock_code: 'AB56433' },
                    { id: 5, name: 'Item name ASD',image: 'https://picsum.photos/400/400', stock_code: 'AN332233' },
                    { id: 6, name: 'Item 6',image: 'https://picsum.photos/400/400', stock_code: '45WER33' },
                    { id: 7, name: 'NEW fantastic screwdriver',image: 'https://picsum.photos/400/400', stock_code: 'AB56433' },
                    { id: 8, name: 'Product #44532',image: 'https://picsum.photos/400/400', stock_code: 'AB56433' },
                    { id: 9, name: 'Product #223111',image: 'https://picsum.photos/400/400', stock_code: 'ABAS33' },
                    { id: 10, name: 'Product #334422',image: 'https://picsum.photos/400/400', stock_code: 'CB533' },
                ],
                meta: {
                    total: 10,
                },
        });
        }, 1000);
    });
    return prom;
}
</script>