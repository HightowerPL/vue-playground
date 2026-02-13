/**
 * Global Store Tests
 *
 * Tests for the Pinia global store including:
 * - Initial state
 * - Getters
 * - Actions (toggle, set operations)
 * - State persistence
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useGlobalStore } from './global'

describe('useGlobalStore', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance for each test
    setActivePinia(createPinia())
  })

  describe('Initial State', () => {
    it('has correct default values', () => {
      const store = useGlobalStore()

      expect(store.isLoading).toBe(false)
      expect(store.isDarkMode).toBe(true)
      expect(store.isMobile).toBe(false)
      expect(store.isSidebarOpen).toBe(true)
      expect(store.isThemeEditorOpen).toBe(false)
    })
  })

  describe('Getters', () => {
    it('getIsLoading returns loading state', () => {
      const store = useGlobalStore()

      expect(store.getIsLoading).toBe(false)

      store.isLoading = true
      expect(store.getIsLoading).toBe(true)
    })

    it('getIsDarkMode returns dark mode state', () => {
      const store = useGlobalStore()

      expect(store.getIsDarkMode).toBe(true)

      store.isDarkMode = false
      expect(store.getIsDarkMode).toBe(false)
    })

    it('getIsMobile returns mobile state', () => {
      const store = useGlobalStore()

      expect(store.getIsMobile).toBe(false)

      store.isMobile = true
      expect(store.getIsMobile).toBe(true)
    })

    it('getIsSidebarOpen returns sidebar state', () => {
      const store = useGlobalStore()

      expect(store.getIsSidebarOpen).toBe(true)

      store.isSidebarOpen = false
      expect(store.getIsSidebarOpen).toBe(false)
    })

    it('getIsThemeEditorOpen returns theme editor state', () => {
      const store = useGlobalStore()

      expect(store.getIsThemeEditorOpen).toBe(false)

      store.isThemeEditorOpen = true
      expect(store.getIsThemeEditorOpen).toBe(true)
    })
  })

  describe('Actions - Toggle Functions', () => {
    it('toggleLoading toggles loading state', () => {
      const store = useGlobalStore()

      expect(store.isLoading).toBe(false)

      store.toggleLoading()
      expect(store.isLoading).toBe(true)

      store.toggleLoading()
      expect(store.isLoading).toBe(false)
    })

    it('toggleDarkMode toggles dark mode state', () => {
      const store = useGlobalStore()

      expect(store.isDarkMode).toBe(true)

      store.toggleDarkMode()
      expect(store.isDarkMode).toBe(false)

      store.toggleDarkMode()
      expect(store.isDarkMode).toBe(true)
    })

    it('toggleMobile toggles mobile state', () => {
      const store = useGlobalStore()

      expect(store.isMobile).toBe(false)

      store.toggleMobile()
      expect(store.isMobile).toBe(true)

      store.toggleMobile()
      expect(store.isMobile).toBe(false)
    })

    it('toggleSidebar toggles sidebar state', () => {
      const store = useGlobalStore()

      expect(store.isSidebarOpen).toBe(true)

      store.toggleSidebar()
      expect(store.isSidebarOpen).toBe(false)

      store.toggleSidebar()
      expect(store.isSidebarOpen).toBe(true)
    })

    it('toggleThemeEditor toggles theme editor state', () => {
      const store = useGlobalStore()

      expect(store.isThemeEditorOpen).toBe(false)

      store.toggleThemeEditor()
      expect(store.isThemeEditorOpen).toBe(true)

      store.toggleThemeEditor()
      expect(store.isThemeEditorOpen).toBe(false)
    })
  })

  describe('Actions - Set Functions', () => {
    it('setLoading sets loading state to specific value', () => {
      const store = useGlobalStore()

      store.setLoading(true)
      expect(store.isLoading).toBe(true)

      store.setLoading(false)
      expect(store.isLoading).toBe(false)
    })

    it('setDarkMode sets dark mode to specific value', () => {
      const store = useGlobalStore()

      store.setDarkMode(false)
      expect(store.isDarkMode).toBe(false)

      store.setDarkMode(true)
      expect(store.isDarkMode).toBe(true)
    })

    it('setMobile sets mobile state to specific value', () => {
      const store = useGlobalStore()

      store.setMobile(true)
      expect(store.isMobile).toBe(true)

      store.setMobile(false)
      expect(store.isMobile).toBe(false)
    })

    it('setSidebar sets sidebar state to specific value', () => {
      const store = useGlobalStore()

      store.setSidebar(false)
      expect(store.isSidebarOpen).toBe(false)

      store.setSidebar(true)
      expect(store.isSidebarOpen).toBe(true)
    })

    it('setThemeEditor sets theme editor state to specific value', () => {
      const store = useGlobalStore()

      store.setThemeEditor(true)
      expect(store.isThemeEditorOpen).toBe(true)

      store.setThemeEditor(false)
      expect(store.isThemeEditorOpen).toBe(false)
    })
  })

  describe('State Reactivity', () => {
    it('getters are reactive to state changes', () => {
      const store = useGlobalStore()

      const initialDarkMode = store.getIsDarkMode
      expect(initialDarkMode).toBe(true)

      store.isDarkMode = false
      expect(store.getIsDarkMode).toBe(false)
      expect(store.getIsDarkMode).not.toBe(initialDarkMode)
    })

    it('multiple actions can be chained', () => {
      const store = useGlobalStore()

      store.setLoading(true)
      store.setDarkMode(false)
      store.setSidebar(false)

      expect(store.isLoading).toBe(true)
      expect(store.isDarkMode).toBe(false)
      expect(store.isSidebarOpen).toBe(false)
    })
  })

  describe('Multiple Store Instances', () => {
    it('each store instance is independent when using different Pinia instances', () => {
      const pinia1 = createPinia()
      const pinia2 = createPinia()

      setActivePinia(pinia1)
      const store1 = useGlobalStore()
      store1.setDarkMode(false)

      setActivePinia(pinia2)
      const store2 = useGlobalStore()

      expect(store1.isDarkMode).toBe(false)
      expect(store2.isDarkMode).toBe(true)
    })
  })

  describe('Common Usage Patterns', () => {
    it('supports typical loading workflow', async () => {
      const store = useGlobalStore()

      // Start loading
      store.setLoading(true)
      expect(store.isLoading).toBe(true)

      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 10))

      // Stop loading
      store.setLoading(false)
      expect(store.isLoading).toBe(false)
    })

    it('supports responsive layout workflow', () => {
      const store = useGlobalStore()

      // Desktop view
      store.setMobile(false)
      store.setSidebar(true)
      expect(store.isMobile).toBe(false)
      expect(store.isSidebarOpen).toBe(true)

      // Switch to mobile
      store.setMobile(true)
      store.setSidebar(false)
      expect(store.isMobile).toBe(true)
      expect(store.isSidebarOpen).toBe(false)
    })

    it('supports theme toggling workflow', () => {
      const store = useGlobalStore()

      // User toggles dark mode
      store.toggleDarkMode()
      expect(store.isDarkMode).toBe(false)

      // Open theme editor
      store.setThemeEditor(true)
      expect(store.isThemeEditorOpen).toBe(true)

      // Close theme editor
      store.setThemeEditor(false)
      expect(store.isThemeEditorOpen).toBe(false)
    })
  })
})
