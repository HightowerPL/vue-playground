<template>
    <div class="loader-wrapper">
        <div class="loader"
            :class="[small ? 'small' : '', color]"
        >
        </div>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        color: {
            type: String,
            default: 'red'
        },
        small: {
            type: Boolean,
            default: false
        }

    })

</script>

<style scoped lang="scss">
</style>