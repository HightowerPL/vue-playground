<script setup lang="ts">
const emit = defineEmits(['close'])
</script>

<template>
  <div class="modal">
    <div class="modal__close" @click="emit('close')" />
    <div class="modal__card">
      <slot />
    </div>
  </div>
</template>