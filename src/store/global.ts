import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoading: false,
    isDarkMode: false,
    isMobile: false,
    isSidebarOpen: false,
  }),
  getters: {
    getIsLoading: (state) => state.isLoading,
    getIsDarkMode: (state) => state.isDarkMode,
    getIsMobile: (state) => state.isMobile,
    getIsSidebarOpen: (state) => state.isSidebarOpen,
  },
  actions: {
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
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