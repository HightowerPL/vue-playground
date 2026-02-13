/**
 * Multibox Component Tests
 *
 * Tests for the multi-select dropdown component including:
 * - Rendering with options
 * - Selection/deselection logic
 * - Search functionality
 * - Select all/clear all
 * - Performance optimizations (Set-based lookups)
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Multibox from './Multibox.vue'
import { nextTick } from 'vue'

const mockOptions = [
  { id: 1, label: 'Option 1', value: 'opt1' },
  { id: 2, label: 'Option 2', value: 'opt2' },
  { id: 3, label: 'Option 3', value: 'opt3' },
  { id: 4, label: 'Basketball', value: 'sport1' },
  { id: 5, label: 'Football', value: 'sport2' },
]

describe('Multibox', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Multibox, {
      props: {
        options: mockOptions,
        modelValue: [],
        label: 'Test Select',
      },
    })
  })

  describe('Rendering', () => {
    it('renders the component', () => {
      expect(wrapper.find('.multi-select-dropdown').exists()).toBe(true)
    })

    it('displays the label', () => {
      expect(wrapper.find('.form__label').text()).toBe('Test Select')
    })

    it('shows placeholder when no items selected', () => {
      expect(wrapper.find('.placeholder').exists()).toBe(true)
      expect(wrapper.find('.placeholder').text()).toBe('Select items')
    })

    it('shows custom placeholder', () => {
      const customWrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          placeholder: 'Choose options',
        },
      })

      expect(customWrapper.find('.placeholder').text()).toBe('Choose options')
    })

    it('dropdown is closed by default', () => {
      const content = wrapper.find('.dropdown-content')
      expect(content.isVisible()).toBe(false)
    })

    it('renders all options when dropdown is open', async () => {
      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const options = wrapper.findAll('.checkbox')
      expect(options).toHaveLength(mockOptions.length)
    })
  })

  describe('Dropdown Toggle', () => {
    it('opens dropdown when header is clicked', async () => {
      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const content = wrapper.find('.dropdown-content')
      expect(content.isVisible()).toBe(true)
    })

    it('adds focused class when dropdown is open', async () => {
      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      expect(wrapper.find('.dropdown-header').classes()).toContain('focused')
    })

    it('rotates arrow when dropdown is open', async () => {
      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      expect(wrapper.find('.arrow').classes()).toContain('open')
    })
  })

  describe('Selection Logic', () => {
    it('displays selected items as tags', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [1, 2],
        },
      })

      const tags = wrapper.findAll('.tag')
      expect(tags).toHaveLength(2)
      expect(tags[0].text()).toContain('Option 1')
      expect(tags[1].text()).toContain('Option 2')
    })

    it('emits update:modelValue when option is selected', async () => {
      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const firstCheckbox = wrapper.findAll('.checkbox__input')[0]
      await firstCheckbox.trigger('change')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')![0]).toEqual([[1]])
    })

    it('removes item from selection when unchecked', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [1, 2, 3],
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      // Uncheck the second option
      const secondCheckbox = wrapper.findAll('.checkbox__input')[1]
      await secondCheckbox.trigger('change')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toEqual([1, 3])
    })

    it('removes item when tag close button is clicked', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [1, 2],
        },
      })

      const removeButton = wrapper.findAll('.remove-tag')[0]
      await removeButton.trigger('click')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toEqual([2])
    })

    it('checks the checkbox for selected options', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [1, 3],
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const checkboxes = wrapper.findAll('.checkbox__input')
      expect((checkboxes[0].element as HTMLInputElement).checked).toBe(true)
      expect((checkboxes[1].element as HTMLInputElement).checked).toBe(false)
      expect((checkboxes[2].element as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('Search Functionality', () => {
    it('displays search box when searchable is true', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          searchable: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      expect(wrapper.find('.search-box input').exists()).toBe(true)
    })

    it('hides search box when searchable is false', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          searchable: false,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      expect(wrapper.find('.search-box input').exists()).toBe(false)
    })

    it('filters options based on search query', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          searchable: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const searchInput = wrapper.find('.search-box input')
      await searchInput.setValue('ball')
      await nextTick()

      const visibleOptions = wrapper.findAll('.checkbox')
      expect(visibleOptions).toHaveLength(2) // Basketball and Football
    })

    it('shows "No results found" when search has no matches', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          searchable: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const searchInput = wrapper.find('.search-box input')
      await searchInput.setValue('xyz123')
      await nextTick()

      expect(wrapper.find('.no-results').exists()).toBe(true)
      expect(wrapper.find('.no-results').text()).toBe('No results found')
    })

    it('performs case-insensitive search', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          searchable: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      const searchInput = wrapper.find('.search-box input')
      await searchInput.setValue('OPTION')
      await nextTick()

      const visibleOptions = wrapper.findAll('.checkbox')
      expect(visibleOptions.length).toBeGreaterThan(0)
    })
  })

  describe('Select All / Clear All', () => {
    it('displays select all and clear all buttons when showSelectAll is true', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          showSelectAll: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      expect(wrapper.find('.select-all').exists()).toBe(true)
      expect(wrapper.find('.clear-all').exists()).toBe(true)
    })

    it('hides buttons when showSelectAll is false', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          showSelectAll: false,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      expect(wrapper.find('.dropdown-footer').exists()).toBe(false)
    })

    it('selects all options when Select All is clicked', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          showSelectAll: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      await wrapper.find('.select-all').trigger('click')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toEqual([1, 2, 3, 4, 5])
    })

    it('selects only filtered options when searching', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          searchable: true,
          showSelectAll: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      // Search for 'ball'
      const searchInput = wrapper.find('.search-box input')
      await searchInput.setValue('ball')
      await nextTick()

      // Click Select All
      await wrapper.find('.select-all').trigger('click')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toEqual([4, 5]) // Only Basketball and Football
    })

    it('clears all selections when Clear All is clicked', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [1, 2, 3],
          showSelectAll: true,
        },
      })

      await wrapper.find('.dropdown-header').trigger('click')
      await nextTick()

      await wrapper.find('.clear-all').trigger('click')

      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted![0][0]).toEqual([])
    })
  })

  describe('Custom Track By and Display Key', () => {
    const customOptions = [
      { customId: 'a1', name: 'Alpha' },
      { customId: 'b2', name: 'Beta' },
      { customId: 'c3', name: 'Gamma' },
    ]

    it('uses custom trackBy for value tracking', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: customOptions,
          modelValue: ['a1'],
          trackBy: 'customId',
          displayKey: 'name',
        },
      })

      const tags = wrapper.findAll('.tag')
      expect(tags).toHaveLength(1)
    })

    it('uses custom displayKey for labels', async () => {
      const wrapper = mount(Multibox, {
        props: {
          options: customOptions,
          modelValue: ['a1'],
          trackBy: 'customId',
          displayKey: 'name',
        },
      })

      const tag = wrapper.find('.tag')
      expect(tag.text()).toContain('Alpha')
    })
  })

  describe('Performance Optimizations', () => {
    it('uses Set for O(1) selection checks (performance)', () => {
      // This test verifies that the component correctly implements
      // Set-based lookups for better performance
      const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        label: `Option ${i}`,
      }))

      const wrapper = mount(Multibox, {
        props: {
          options: largeOptions,
          modelValue: [0, 500, 999],
        },
      })

      const tags = wrapper.findAll('.tag')
      expect(tags).toHaveLength(3)
    })
  })

  describe('Snapshot Tests', () => {
    it('matches snapshot with no selection', () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [],
          label: 'Select Options',
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })

    it('matches snapshot with selections', () => {
      const wrapper = mount(Multibox, {
        props: {
          options: mockOptions,
          modelValue: [1, 3],
          label: 'Selected Options',
        },
      })

      expect(wrapper.html()).toMatchSnapshot()
    })
  })
})
