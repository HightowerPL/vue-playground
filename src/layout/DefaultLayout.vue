<template>
    <div class="h-screen w-screen relative">
        <div class="bg-pattern"></div>

        <div class="flex flex-row h-screen w-screen overflow-y-hidden relative z-20">
            <Sidebar />
            <div class="flex flex-col flex-1 h-screen overflow-hidden overflow-y-auto"  >
                
                <main class="h-full w-full">
                    <slot />
                </main>

                <ModalController/>

                <SnackBar/>
            </div>
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
.bg-pattern {
    --bg-pattern-main-color: var(--color-black); 
    --bg-pattern-second-color: var(--color-green);

    .light-theme & {
        --bg-pattern-main-color: var(--color-light-grey); 
    --bg-pattern-second-color: var(--color-green);
    }

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;

    &:before {
        content: '';
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: var(--bg-pattern-main-color);
        opacity: .4;
        background-size: 10px 10px;
        background-image: repeating-linear-gradient(45deg, 
            var(--bg-pattern-second-color) 0, 
            var(--bg-pattern-second-color) 0.5px, 
            var(--bg-pattern-main-color) 0, 
            var(--bg-pattern-main-color) 50%)
        ;
    }

    &:after {
        content: '';
        position: absolute; 
        z-index: 20;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: .8;
        background-image: linear-gradient(130deg, var(--bg-pattern-main-color) 85%, transparent 100% )
    }
}
</style>