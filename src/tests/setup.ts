/**
 * Vitest Global Setup
 *
 * This file runs before all tests and sets up the testing environment.
 * It configures global test utilities, mocks, and any necessary polyfills.
 */

import { config } from '@vue/test-utils'
import { vi } from 'vitest'

// Configure Vue Test Utils globally
config.global.mocks = {
  // Mock $route and $router for components that use vue-router
  $route: {
    params: {},
    query: {},
    path: '/',
  },
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
  },
}

// Global stubs for commonly used components
config.global.stubs = {
  // Stub transition components to simplify testing
  Transition: false,
  TransitionGroup: false,
  // Stub Loader component
  Loader: true,
  LoaderVue: true,
  // Stub icon components
  OhVueIcon: true,
}

// Mock window.matchMedia (used by responsive components)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock SVG imports
vi.mock('*.svg', () => ({
  default: 'svg-component',
}))
