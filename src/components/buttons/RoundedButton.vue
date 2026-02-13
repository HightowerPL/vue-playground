<template>
    <button 
        :type="type"
        class="rounded-full  font-light w-9 h-9 p-1  hover:mix-blend-plus-lighter transition-colors duration-300"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">

const props = defineProps<{
    type: {
        type: String,
        required: false,
        default: 'button'
    };
}>();
</script>