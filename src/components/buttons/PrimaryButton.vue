<template>
    <button
        type="button"
        class="btn "
        :disabled="isLoading"
        :class="`btn-${color} `"
        >
          <span 
            class="btn__inner"
            :class="[isLoading ? 'invisible' : '']"
          >
            <slot/>
          </span>
          <LoaderVue
            small
            v-show="isLoading"
            :color="color"
            class="btn__loader"
            />
    </button>

</template>

<script setup lang="ts">
    import LoaderVue from '../../components/loader/Loader.vue';

    const props = defineProps({
      color: {
        type: String,
        default: 'green'
      },
      isLoading: {
        type: Boolean,
        default: false
      },
    })

</script>

<style scoped lang="scss">

</style>