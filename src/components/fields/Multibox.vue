<template>
    <div class="multi-select-dropdown" ref="dropdownRef">
        <label for="" class="text-left">{{  label }}</label>
      <div 
        class="dropdown-header" 
        @click="toggleDropdown"
        :class="{ 'focused': isOpen }"
      >
        <div class="selected-items">
          <span v-if="selectedItems.length === 0" class="placeholder">
            {{ placeholder }}
          </span>
          <div v-else class="selected-tags">
            <span 
              v-for="item in selectedItems" 
              :key="item[trackBy]" 
              class="tag"
            >
              {{ item[displayKey] }}
              <button 
                class="remove-tag" 
                @click.stop="removeItem(item)"
                type="button"
              >
                ×
              </button>
            </span>
          </div>
        </div>
        <dropdownIcon class="arrow" :class="{ 'open': isOpen }"/>
      </div>
      
      <div v-show="isOpen" class="dropdown-content">
        <div v-if="searchable" class="search-box">
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search..."
            ref="searchInputRef"
            @click.stop
          />
        </div>
        
        <div class="options-list">
          <label 
            v-for="option in filteredOptions" 
            :for="option[trackBy]"
            :key="option[trackBy]"
            class=" checkbox checkbox--white"
            :class="{ 'checked': isSelected(option) }"
          >
            <input 
              type="checkbox" 
              class="checkbox__input"
              :id="option[trackBy]"
              :checked="isSelected(option)"
              @click.stop
              @change="toggleOption(option)"
            />
            <span class="checkbox__label">{{ option[displayKey] }}</span>

          </label>
          
          <div v-if="filteredOptions.length === 0" class="no-results">
            No results found
          </div>
        </div>
        
        <div v-if="showSelectAll" class="dropdown-footer">
          <button class="select-all" @click.stop="selectAll">
            Select All
          </button>
          <button class="clear-all" @click.stop="clearAll">
            Clear All
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'
import dropdownIcon from '@/assets/icons/dropdown-icon.svg';
  
  const props = defineProps({
    options: {
      type: Array,
      required: true
    },
    modelValue: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: 'Select items'
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    displayKey: {
      type: String,
      default: 'label'
    },
    label: {
      type: String,
      default: 'Select'
    },
    searchable: {
      type: Boolean,
      default: true
    },
    showSelectAll: {
      type: Boolean,
      default: true
    }
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const dropdownRef = ref(null)
  const searchInputRef = ref(null)
  const isOpen = ref(false)
  const searchQuery = ref('')
  
  const selectedItems = computed(() => {
    return props.options.filter(option => 
      props.modelValue.includes(option[props.trackBy])
    )
  })
  
  const filteredOptions = computed(() => {
    if (!searchQuery.value) return props.options
    
    const query = searchQuery.value.toLowerCase()
    return props.options.filter(option => 
      option[props.displayKey].toLowerCase().includes(query)
    )
  })

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
    if (isOpen.value && props.searchable) {
      nextTick(() => {
        searchInputRef.value?.focus()
      })
    }
  }
  
  const toggleOption = (option) => {
    const newValue = [...props.modelValue]
    const index = newValue.indexOf(option[props.trackBy])
    
    if (index === -1) {
      newValue.push(option[props.trackBy])
    } else {
      newValue.splice(index, 1)
    }
    
    emit('update:modelValue', newValue)
  }
  
  const removeItem = (item) => {
    const newValue = props.modelValue.filter(id => id !== item[props.trackBy])
    emit('update:modelValue', newValue)
  }
  
  const isSelected = (option) => {
    return props.modelValue.includes(option[props.trackBy])
  }
  
  const selectAll = () => {
    const allIds = filteredOptions.value.map(option => option[props.trackBy])
    emit('update:modelValue', allIds)
  }
  
  const clearAll = () => {
    emit('update:modelValue', [])
  }
  
  const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
      isOpen.value = false
    }
  }

  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>

  <style scoped>
  .multi-select-dropdown {
    position: relative;
    width: 100%;
    font-size: var(--multibox-font-size, 1rem);
    text-align: left;
  }
  
  .dropdown-header {
    border: var(--multibox-border);
    padding: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--multibox-bg-color);
    min-height: 38px;
    text-align: left;
  }

  .selected-items {
    flex: 1;
    margin-right: 8px;
  }
  
  .placeholder {
    color: var(--multibox-placeholder-color);
  }
  
  .selected-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  
  .tag {
    background-color: var(--multibox-tile-bg-color);
    padding: 2px 6px;
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
    color: var(--multibox-tile-font-color);
    border-radius: 4px;
  }
  
  .remove-tag {
    border: none;
    background: none;
    color: var(--multibox-tile-font-color);
    margin-left: 4px;
    cursor: pointer;
    padding: 0 2px;
    font-size: 16px;
    line-height: 1;
  }
  
  .remove-tag:hover {
    color: var(--color-rose);
  }

  .arrow {
    width: 20px;
    height: 20px;
    fill: var(--color-green);
    transition: transform 0.3s;
  }

  .arrow.open {
    transform: rotate(180deg);
  }

  .dropdown-content {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--multibox-dropdown-bg-color);
    border: var(--multibox-dropdown-border);
    border-top: none;
    z-index: 1000;
  }
  
  .search-box {
    padding: 8px;
  }
  
  .search-box input {
    width: 100%;
    padding: 6px 8px;
    background: var(--multibox-search-bg-color);

    border-radius: 4px;
    outline: none;
  }
  
  .search-box input:focus {
    border-color: #409eff;
  }
  
  .options-list {
    max-height: 200px;
    padding: 0px 12px 12px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 4px;

  }
  
  .option-item {
    padding: 8px 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .option-item:hover {
    background-color: var(--multibox-dropdown-option-hover-bg-color);
  }
  
  .option-item input[type="checkbox"] {
    margin-right: 8px;
  }
  
  .no-results {
    padding: 12px;
    text-align: center;
    color: #999;
  }
  
  .dropdown-footer {
    padding: 8px;
    border-top: 1px solid var(--multibox-footer-border-top-color);
    display: flex;
    justify-content: space-between;
  }
  
  .select-all,
  .clear-all {
    padding: 4px 12px;
    background-color: var(--multibox-footer-btn-color);
    color: var(--multibox-footer-btn-font-color);
    cursor: pointer;
    font-size: 14px;
  }
  
  .select-all:hover,
  .clear-all:hover {
    background-color: var(--multibox-footer-btn-hover-color);
  }
  </style>