import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoading: false,
    isDarkMode: true,
    isMobile: false,
    isSidebarOpen: false,
    isThemeEditorOpen: false,
  }),
  getters: {
    getIsLoading: (state) => state.isLoading,
    getIsDarkMode: (state) => state.isDarkMode,
    getIsMobile: (state) => state.isMobile,
    getIsSidebarOpen: (state) => state.isSidebarOpen,
    getIsThemeEditorOpen: (state) => state.isThemeEditorOpen,
  },
  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.isDarkMode ? document.body.classList.remove('light-theme') : document.body.classList.add('light-theme');
    },
    toggleThemeEditor(isOpen: boolean) {
      this.isThemeEditorOpen = isOpen;
    },
    setMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    hideSidebar() {
      this.isSidebarOpen = false;
    }
  },
});