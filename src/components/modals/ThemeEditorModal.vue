<template>

    <div class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div class="grid gap-4 bg-white text-black rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <h2 class="text-xl font-bold mb-4">Theme Editor</h2>
            <p class="mb-4">Customize your theme settings here.</p>
            <RoundedButton
                class="w-9 h-9 absolute top-4 right-4 bg-white"
                @click="globalStore.toggleThemeEditor(false)"
            >
                <OhVueIcon
                    class="w-7 h-7 inline-block fill-black"
                    name="io-close-outline"
                />
            </RoundedButton>

            <div class="grid gap-4">
                <label for="sidebar-bg" class="text-left " >Sidebar BG</label>
                <input 
                    v-model="sidebarBgColor"
                    type="color" 
                    id="sidebar-bg" 
                    name="--sidebar--bg-color"
                    class="w-full p-2 border rounded bg-white h-10"
                >
            </div>

            <FilledButton class="" type="button" @click="setColors">Set color</FilledButton>
        </div>
    </div>

</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import { useGlobalStore } from '@/store/global.ts';
import { ref } from 'vue';
import FilledButton from '@/components/buttons/FilledButton.vue';
import RoundedButton from '@/components/buttons/RoundedButton.vue';

const globalStore = useGlobalStore()
const sidebarBgColor = ref('#1F2937');

const setColors = () => {
    document.documentElement.style.setProperty('--sidebar-bg-color', sidebarBgColor.value);
    globalStore.toggleThemeEditor(false);
}

</script>