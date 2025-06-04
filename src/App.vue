<template>
  <component :is="layout">
    <RouterView #default="{ Component }" v-slot="{ Component }">
      <transition name="fade-up" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </component>
</template>


<script setup lang="ts">
import "./styles/main.scss";
import { useRouter } from 'vue-router';
import { computed } from 'vue';

const defaultLayout = 'default';
const { currentRoute } = useRouter();

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`
);
</script>

<style lang="scss">
@use "@/styles/transitions";

</style>