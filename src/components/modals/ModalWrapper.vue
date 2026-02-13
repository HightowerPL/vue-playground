<template>
  <Transition name="modal">
    <div class="modal" v-show="modal.isOpen">
      <div class="modal__card" id="modal-content"  ref="modalRef" :class="modal.getClasses">
        <slot/>
        <button
          v-if="!modal.hideCloseIcon"
          type="button"
          class="modal__close-button"
          @click="modal.close"
        >
            <OhVueIcon
                class="w-7 h-7 inline-block fill-black"
                name="io-close-outline"
            />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useModal } from '@/store/modal';
import { OhVueIcon } from 'oh-vue-icons';

const modalRef = ref(null)
const modal = useModal()

</script>