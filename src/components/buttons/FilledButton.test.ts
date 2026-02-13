/**
 * FilledButton Component Tests
 *
 * Tests for the primary filled button component including:
 * - Default rendering
 * - Color variants
 * - Loading states
 * - Size variants
 * - Slot content
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FilledButton from './FilledButton.vue'

describe('FilledButton', () => {
  describe('Rendering', () => {
    it('renders button with default props', () => {
      const wrapper = mount(FilledButton)

      expect(wrapper.find('button').exists()).toBe(true)
      expect(wrapper.find('button').attributes('type')).toBe('button')
      expect(wrapper.classes()).toContain('btn')
      expect(wrapper.classes()).toContain('btn--filled')
    })

    it('renders slot content correctly', () => {
      const wrapper = mount(FilledButton, {
        slots: {
          default: 'Click Me',
        },
      })

      expect(wrapper.text()).toContain('Click Me')
    })

    it('renders with custom slot content including HTML', () => {
      const wrapper = mount(FilledButton, {
        slots: {
          default: '<span class="icon">🚀</span> Launch',
        },
      })

      expect(wrapper.html()).toContain('<span class="icon">🚀</span>')
      expect(wrapper.text()).toContain('Launch')
    })
  })

  describe('Color Variants', () => {
    it('applies green color by default', () => {
      const wrapper = mount(FilledButton)

      expect(wrapper.classes()).toContain('btn-green')
    })

    it('applies custom color when provided', () => {
      const wrapper = mount(FilledButton, {
        props: {
          color: 'rose',
        },
      })

      expect(wrapper.classes()).toContain('btn-rose')
    })

    it('applies blue color variant', () => {
      const wrapper = mount(FilledButton, {
        props: {
          color: 'blue',
        },
      })

      expect(wrapper.classes()).toContain('btn-blue')
    })
  })

  describe('Loading State', () => {
    it('does not show loader by default', () => {
      const wrapper = mount(FilledButton)

      const loader = wrapper.findComponent({ name: 'Loader' })
      expect(loader.exists()).toBe(false)
    })

    it('shows loader when isLoading is true', () => {
      const wrapper = mount(FilledButton, {
        props: {
          isLoading: true,
        },
      })

      const loader = wrapper.find('.btn__loader')
      expect(loader.exists()).toBe(true)
      expect(loader.isVisible()).toBe(true)
    })

    it('hides button text when loading', () => {
      const wrapper = mount(FilledButton, {
        props: {
          isLoading: true,
        },
        slots: {
          default: 'Submit',
        },
      })

      const inner = wrapper.find('.btn__inner')
      expect(inner.classes()).toContain('invisible')
    })

    it('disables button when loading', () => {
      const wrapper = mount(FilledButton, {
        props: {
          isLoading: true,
        },
      })

      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it('passes color prop to loader', () => {
      const wrapper = mount(FilledButton, {
        props: {
          isLoading: true,
          color: 'rose',
        },
      })

      const loader = wrapper.find('.btn__loader')
      expect(loader.exists()).toBe(true)
    })
  })

  describe('Size Variants', () => {
    it('renders normal size by default', () => {
      const wrapper = mount(FilledButton)

      expect(wrapper.classes()).not.toContain('btn--small')
    })

    it('applies small size class when small prop is true', () => {
      const wrapper = mount(FilledButton, {
        props: {
          small: true,
        },
      })

      expect(wrapper.classes()).toContain('btn--small')
    })
  })

  describe('Width Variants', () => {
    it('does not apply full width by default', () => {
      const wrapper = mount(FilledButton)

      expect(wrapper.classes()).not.toContain('w-full')
    })

    it('applies full width class when full prop is true', () => {
      const wrapper = mount(FilledButton, {
        props: {
          full: true,
        },
      })

      expect(wrapper.classes()).toContain('w-full')
    })
  })

  describe('Combined Props', () => {
    it('handles multiple props simultaneously', () => {
      const wrapper = mount(FilledButton, {
        props: {
          color: 'blue',
          isLoading: true,
          small: true,
          full: true,
        },
        slots: {
          default: 'Save',
        },
      })

      expect(wrapper.classes()).toContain('btn-blue')
      expect(wrapper.classes()).toContain('btn--small')
      expect(wrapper.classes()).toContain('w-full')
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
      expect(wrapper.find('.btn__loader').exists()).toBe(true)
    })
  })

  describe('Accessibility', () => {
    it('has correct button type attribute', () => {
      const wrapper = mount(FilledButton)

      expect(wrapper.find('button').attributes('type')).toBe('button')
    })

    it('is not disabled by default', () => {
      const wrapper = mount(FilledButton)

      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })

    it('can be interacted with when not loading', async () => {
      const wrapper = mount(FilledButton)

      await wrapper.find('button').trigger('click')

      // Button should be clickable
      expect(wrapper.find('button').element.disabled).toBe(false)
    })
  })

  describe('Snapshot Tests', () => {
    it('matches snapshot for default state', () => {
      const wrapper = mount(FilledButton, {
        slots: { default: 'Button' },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot for loading state', () => {
      const wrapper = mount(FilledButton, {
        props: { isLoading: true },
        slots: { default: 'Loading...' },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot for small full-width variant', () => {
      const wrapper = mount(FilledButton, {
        props: { small: true, full: true, color: 'rose' },
        slots: { default: 'Submit' },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
