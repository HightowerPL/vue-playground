<template>
    <component :is="url ? 'router-link' : 'div'" 
        :to="url"
        class="card"
    >
        <slot />


    </component>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    url?: string;
}>(), {
    url: ''
});

</script>