<template>
    <button 
        :type="type"
        class="rounded-full  font-light w-9 h-9 p-1  hover:mix-blend-plus-lighter transition-colors duration-300"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    type?: 'button' | 'submit' | 'reset';
}>(), {
    type: 'button'
});
</script>