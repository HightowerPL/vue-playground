import { defineStore } from 'pinia';

interface modalOpenOptions {
    id: string,
    hideClose?: boolean,
    classes?: string,
    msg?: string,
    clickedItem?: any
}

export const useModal = defineStore('modal', {
  state: () => ({
    isModalOpen: false,
    hideCloseIcon: false,
    classes: 'max-w-[640px]',
    contentId: '',
    msg: '',
    clickedItem: null,
  }),
  getters: {
    isOpen: (state) => state.isModalOpen,
    getContentId: (state) => state.contentId,
    getClasses: (state) => state.classes
  },
  actions: {
    open({ id, hideClose, classes, msg, clickedItem }: modalOpenOptions) {
      this.isModalOpen = true
      classes = classes ?? this.classes
      msg = msg ?? this.msg
      this.hideCloseIcon = hideClose ? hideClose : false
      this.contentId = id
      this.classes = classes
      this.msg = msg
      this.clickedItem = clickedItem
    },
    close() {
      this.isModalOpen = false
      setTimeout(()=>{
        this.clickedItem = null
        this.contentId = ''
        this.classes = 'max-w-[640px]'
        this.hideCloseIcon = false
      }, 400)
    },
    checkContent(id: string) {
        if (this.contentId === id) {
            return true;
        }
        return false;
    }
  }
})
