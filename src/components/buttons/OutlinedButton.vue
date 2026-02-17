<template>
    <button
        type="button"
        class="btn btn--outlined"
        :disabled="isLoading"
        :class="`border-${color} hover:bg-${color} ${small ? 'btn--small' : ''} ${full ? 'w-full' : ''}`"
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

    defineProps({
      color: {
        type: String,
        default: 'green'
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      small: {
        type: Boolean,
        default: false
      },
      full: {
        type: Boolean,
        default: false
      }
    })

</script>

<style scoped lang="scss">

</style>