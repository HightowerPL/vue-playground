import { defineStore } from 'pinia';

interface snackBarType {
  isSnackbarOpen?: boolean,
  content: string | object,
  type: 'success' | 'error',
  operationType: string,
  buttonUrl?: string,
  timeout?: number,
}

export const useSnackbar = defineStore('snackbar', {
  state: () => ({
    isSnackbarOpen: false,
    content: '',
    type: 'success',
    operationType: 'Submit',
    buttonUrl: '',
    timeout: 8000,
  }),
  getters: {
    isOpen: (state) => state.isSnackbarOpen,
    getContent: (state) => state.content,
    getType: (state) => state.type,
    getOperationType: (state) => state.operationType,
    getButtonUrl: (state) => state.buttonUrl,
    getTimeout: (state) => state.timeout,
  },
  actions: {
    show(data: snackBarType) {
      this.isSnackbarOpen = true
      this.content = typeof data.content === 'object' ? Object.values(data.content).join(' ') : data.content,
      this.type = data.type
      this.operationType = data.operationType
      this.buttonUrl = data.buttonUrl
      this.timeout = data.timeout ?? 8000

      setTimeout(() => this.hide(), this.timeout)
    },
    hide() {
      this.isSnackbarOpen = false
    },
  }
})
