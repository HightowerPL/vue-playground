<template>
    <div>
        <h2>Timer</h2>
        <p>Time: {{ formattedTime }}</p>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
    time: Number,
})

</script>