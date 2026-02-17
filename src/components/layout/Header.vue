<template>
    <header class="flex justify-between items-center px-4 py-6 lg:px-7 lg:py-7 bg-black">
        <!-- <Autocomplete
            id="header-search"
            class="flex-1 max-w-[600px]"
            :apiFn="searchItems"
            enableEnter
            >
            Search
        </Autocomplete> -->

        <!-- <RoundedButton 
            class=""
            @click="globalStore.toggleThemeEditor(true)"
        >
            <OhVueIcon class="w-5 h-5" name="io-pencil" fill="white" />
        </RoundedButton> -->

        <BurgerButton
            @click="globalStore.toggleSidebar"
            :class="[ globalStore.getIsSidebarOpen ? 'opened' : '']"
        />

    </header>
</template>

<script setup lang="ts">
import BurgerButton from '../../components/buttons/BurgerButton.vue';
import { useGlobalStore } from '../../store/global.ts';

const globalStore = useGlobalStore();
</script>