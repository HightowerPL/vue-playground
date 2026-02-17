import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    isLoading: false,
    isDarkMode: true,
    isMobile: false,
    isSidebarOpen: true,
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
    toggleLoading() {
      this.isLoading = !this.isLoading;
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode;
      this.isDarkMode ? document.body.classList.remove('light-theme') : document.body.classList.add('light-theme');
    },
    setDarkMode(value: boolean) {
      this.isDarkMode = value;
    },
    setMobile(isMobile: boolean) {
      this.isMobile = isMobile;
    },
    toggleMobile() {
      this.isMobile = !this.isMobile;
    },
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    },
    setSidebar(value: boolean) {
      this.isSidebarOpen = value;
    },
    hideSidebar() {
      this.isSidebarOpen = false;
    },
    toggleThemeEditor(isOpen?: boolean) {
      this.isThemeEditorOpen = isOpen !== undefined ? isOpen : !this.isThemeEditorOpen;
    },
    setThemeEditor(value: boolean) {
      this.isThemeEditorOpen = value;
    },
  },
});
