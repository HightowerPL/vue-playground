<template>
    <div>
        <h2>Timer</h2>
        <p>Time: {{ formattedTime }}</p>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
    time: Number,
})

const formattedTime = computed(() => {
    if (!props.time) return '00:00';
    const minutes = Math.floor(props.time / 60);
    const seconds = props.time % 60;
    return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
});

</script>
