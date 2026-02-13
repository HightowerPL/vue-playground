import { reactive, toRefs, readonly } from 'vue'

export interface Modal {
  id: number
  component: any
  props?: Record<string, unknown>
}

const state = reactive({
  modals: [] as Modal[],
})

let id = 0

export default function useModalStore() {
  const { modals } = toRefs(state)

  function openModal(
    component: any,
    props: Modal['props'] = {},
  ) {
    state.modals.push({ id: ++id, component, props })
  }

  function closeTopModal() {
    if (state.modals.length > 0) {
      state.modals.pop()
    }
  }

  return {
    modals: readonly(modals),
    openModal,
    closeTopModal,
  }
}