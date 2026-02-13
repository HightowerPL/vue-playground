<script setup lang="ts">
import useModalStore from '@/composables/useModalStore'
import BaseModal from '@/components/modals/BaseModal.vue'
import { computed } from 'vue'

const { modals, closeTopModal } = useModalStore()

const topModal = computed(() =>
  modals.value.length > 0
    ? modals.value[modals.value.length - 1]
    : null,
)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <BaseModal
        v-if="topModal"
        :key="topModal.id"
        @close="closeTopModal"
      >
        <component
          :is="topModal.component"
          v-bind="topModal.props"
        />
      </BaseModal>
    </Transition>
  </Teleport>
</template>