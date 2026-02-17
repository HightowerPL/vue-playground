<template>
    <div
      class="snackbar rounded"
      :class="[
        snackbarBgClass,
        snackbar.isOpen ? 'snackbar--show' : '',
        ]"
    >
      <p
        v-if="snackbar.getOperationType"
        class="snackbar__info font-bold capitalize mb-1">
        {{ operationMsg }}
      </p>

      <div class="text-sm" v-html="snackbar.getContent">

      </div>
      <router-link
        v-if="snackbar.getButtonUrl"
        :to="snackbar.getButtonUrl"
        class="py-2 px-3 ml-2 text-sm text-mainBlue focus:outline-none bg-white rounded-sm border border-white focus:z-10 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
      >
        <span>View {{ snackbar.getOperationType }}</span>
      </router-link>
  
      <button
        @click="snackbar.hide()"
        type="button"
        class="snackbar__close ml-4 p-0 outline-none hover:border-transparent hover:outline-none hover:rotate-90 transition duration-300 transition-origin-center"
      >

        <closeIcon class="w-4 h-4" alt="close"/>
        <!-- <img :src="closeIcon" class="w-4 h-4" alt="close"> -->
      </button>
    </div>
  </template>

  <script setup lang="ts">
    import { computed } from 'vue'
    import { useSnackbar } from '@/store/snackbar'
    import closeIcon from '@/assets/icons/close-icon.svg'

    const snackbar = useSnackbar()

    defineProps({
      isAuthLayout: {
        type: Boolean,
        default: false,
      }
    })

    const snackbarBgClass = computed(() => {
      switch (snackbar.getType) {
        case 'success':
          return 'bg-green'
        case 'error':
          return 'bg-rose'
        default:
          return 'bg-blue'
      }
    });
    const operationMsg = computed(() => {
      switch (snackbar.getType) {
        case 'success':
          return 'successful'
        case 'error':
          return 'error'
        default:
          return 'information'
      }
    });
  </script>

  <style scoped lang="scss">
    .snackbar {
        position: fixed;
        top: 40px;
        left: 50%;
        z-index: 99;
        width: auto;
        max-width:720px;
        padding: 16px 48px 20px 24px;
        color: white;
        transform: translateX(-50%) translateY(-30px);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.2s, visibility 0.2s, transform 0.2s;
        text-align: left; 

        @media all and (max-width: 767px) {
            width: 70%;
            top: 50px;
        }

        &--show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
            visibility: visible;
        }

        &__close {
          position: absolute;
          top: 18px;
          right: 18px;
        }
    }
  </style>
  