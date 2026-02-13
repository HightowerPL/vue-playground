/**
 * Test Utilities
 *
 * Reusable helper functions and fixtures for testing Vue components
 */

import { mount, VueWrapper } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createRouter, createMemoryHistory, Router } from 'vue-router'
import type { Component } from 'vue'

/**
 * Creates a fresh Pinia instance for testing
 * Call this in beforeEach to ensure test isolation
 */
export function createTestPinia() {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}

/**
 * Creates a test router with memory history
 * Useful for testing components that depend on vue-router
 */
export function createTestRouter(routes: any[] = []): Router {
  return createRouter({
    history: createMemoryHistory(),
    routes: routes.length > 0 ? routes : [
      { path: '/', name: 'home', component: { template: '<div>Home</div>' } },
      { path: '/test', name: 'test', component: { template: '<div>Test</div>' } },
    ],
  })
}

/**
 * Mounts a component with common test setup (Pinia + Router)
 *
 * @param component - The Vue component to mount
 * @param options - Mount options (props, slots, etc.)
 * @returns VueWrapper instance
 */
export function mountWithPlugins(
  component: Component,
  options: any = {}
): VueWrapper {
  const pinia = createTestPinia()
  const router = createTestRouter()

  return mount(component, {
    global: {
      plugins: [pinia, router],
      ...options.global,
    },
    ...options,
  })
}

/**
 * Waits for all pending promises and Vue updates to complete
 * Useful for testing async behavior
 */
export async function flushPromises(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, 0)
  })
}

/**
 * Simulates user typing into an input field
 *
 * @param wrapper - The component wrapper
 * @param selector - CSS selector for the input
 * @param value - The value to type
 */
export async function typeIntoInput(
  wrapper: VueWrapper,
  selector: string,
  value: string
): Promise<void> {
  const input = wrapper.find(selector)
  await input.setValue(value)
  await input.trigger('input')
}

/**
 * Simulates a click event with proper Vue updates
 *
 * @param wrapper - The component wrapper
 * @param selector - CSS selector for the element to click
 */
export async function clickElement(
  wrapper: VueWrapper,
  selector: string
): Promise<void> {
  const element = wrapper.find(selector)
  await element.trigger('click')
  await wrapper.vm.$nextTick()
}

/**
 * Mock data generators for testing
 */
export const mockData = {
  /**
   * Generates a mock product object
   */
  createProduct: (overrides = {}) => ({
    id: 1,
    title: 'Test Product',
    price: 99.99,
    description: 'A test product description',
    category: 'electronics',
    image: 'https://via.placeholder.com/150',
    rating: { rate: 4.5, count: 120 },
    ...overrides,
  }),

  /**
   * Generates a mock player object
   */
  createPlayer: (overrides = {}) => ({
    id: 1,
    number: '23',
    name: 'John Doe',
    position: 'Forward',
    points: '15',
    assists: '5',
    rebounds: '7',
    on_court: false,
    ...overrides,
  }),

  /**
   * Generates a mock team object
   */
  createTeam: (overrides = {}) => ({
    id: 1,
    name: 'Test Team',
    logo: 'logo.png',
    players: [],
    ...overrides,
  }),

  /**
   * Generates mock options for select/multibox components
   */
  createOptions: (count = 5) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      label: `Option ${i + 1}`,
      value: `option-${i + 1}`,
    }))
  },
}

/**
 * Custom matchers and assertions
 */
export const assertions = {
  /**
   * Asserts that an element has a specific class
   */
  toHaveClass(element: Element, className: string): boolean {
    return element.classList.contains(className)
  },

  /**
   * Asserts that a component emitted an event with specific payload
   */
  toHaveEmitted(wrapper: VueWrapper, eventName: string, payload?: any): boolean {
    const emitted = wrapper.emitted(eventName)
    if (!emitted) return false
    if (payload === undefined) return true
    return emitted.some((event) => JSON.stringify(event[0]) === JSON.stringify(payload))
  },
}
