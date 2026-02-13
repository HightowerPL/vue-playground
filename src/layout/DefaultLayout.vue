<template>
    <div class="flex flex-row h-screen w-screen overflow-y-hidden">
        <Sidebar />
        <div class="flex flex-col flex-1 h-screen overflow-hidden overflow-y-auto"  >
            
            <main class="h-full w-full">
                <slot />
            </main>

            <ModalController/>

            <SnackBar/>
        </div>
    </div>

</template>

<script setup lang="ts">

import SnackBar from '../components/snackbar/SnackBar.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import { useGlobalStore } from '../store/global.ts'
import { router } from '../router'
import ModalController from '../components/modals/ModalController.vue';

const globalStore = useGlobalStore();



router.beforeEach((to, from, next) => {
    globalStore.hideSidebar()
    next()
});
</script>

<style scoped lang="scss">
</style>