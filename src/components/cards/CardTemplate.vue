<template>
    <component :is="url ? 'router-link' : 'div'" 
        :to="url"
        class="card"
    >
        <slot />


    </component>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    url: {
        type: String,
        required: false,
        default: ''
    }
}>();

</script>