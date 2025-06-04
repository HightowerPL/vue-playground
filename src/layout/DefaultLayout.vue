<template>
    <div class="flex flex-row h-screen w-screen bg-black overflow-y-hidden">
        <Sidebar />
        <div class="flex flex-col flex-1 h-screen overflow-hidden overflow-y-auto"  >
            <Header/>
            <main class="h-full w-full">
                <div class="">
                    <slot />
                </div>
            </main>
            <SnackBar/>
        </div>
    </div>

</template>

<script setup lang="ts">
import Header from '../components/layout/Header.vue'
import SnackBar from '../components/snackbar/SnackBar.vue'
import Sidebar from '../components/layout/Sidebar.vue'
import { useGlobalStore } from '../store/global.ts'
import { router } from '../router'

const globalStore = useGlobalStore()
router.beforeEach((to, from, next) => {
    // You can add any global navigation guards here if needed
    console.log('sidebar hide')
    globalStore.hideSidebar()
    next()
});
</script>

<style scoped lang="scss">
</style>