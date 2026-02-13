<template>
    <div class="select-box">
        <div class="select-box__overlay"
            :class="[showOptions ? 'show' : '']"
            @click="showOptions = !showOptions">
        </div>
        <div class="select-box__inner-wrapper">
            <label class="form__label mb-1">{{ label }} <span v-if="required" class="text-rose">*</span> </label>
            <button type="button" class="select-box__select" @click="showOptions = !showOptions" :class="[showOptions ? 'open' : '']">
                <span :class="[model ? '' : 'opacity-50']">
                    {{ model ? options.find(item => item.value == model).text : 'Please select an option' }}
                </span>
                <dropdownIcon class="select-box__dropdown"/>
            </button>
            <Transition name="fade-up">
                <div v-if="showOptions" class="select-box__options">
                    <label v-for="option in options" :key="option.value" class="select-box__option" :for="name + '-' + option.value" @click="showOptions = false">
                        <input v-model="model" type="radio" :name="name" :id="name + '-' + option.value" class="hidden" :value="option.value"  />
                        <span>{{ option.text }}</span>
                        <checkIcon v-if="option.value === model" class="w-4 h-4" />
                    </label>
                </div>
            </Transition>
            <Transition name="fade-up">
                <span v-if="errorMessage" class="absolute top-full left-0 text-xs text-rose" >{{ errorMessage }}</span>
            </Transition>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import dropdownIcon from '@/assets/icons/dropdown-icon.svg';
import checkIcon from '@/assets/icons/check-icon.svg';

const model = defineModel()
const showOptions = ref(false);
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array as () => Array<{ value: string; text: string }>,
        required: true
    },
    errorMessage: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    }
});

</script>

<style scoped lang="scss">
.select-box {
    width: 100%;
    font-size: var(--fields-font-size, 1rem);
    text-align: left;

    &__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        pointer-events: none;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s ease-in-out;
        opacity: 0;

        &.show {
            opacity: 1;
            pointer-events: all;
        }
    }

    &__dropdown {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%) rotate(0deg);
        fill: var(--select-box-dropdown-color, #000);
        transition: transform 0.3s ease-in-out;

        .open & {
            transform: translateY(-50%) rotate(180deg);
        }
    }

    &__inner-wrapper {
        position: relative;
        z-index: 20;
    }

    &__select {
        width: 100%;
        font-weight: 300;
        padding: 8px 12px;
        background-color: var(--select-box-select-bg, #fff);
        color: var(--select-box-select-color, #000);
        border: var(--select-box-select-border, 1px solid #ccc);
        cursor: pointer;
        text-align: left;
        position: relative;
    }

    &__options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background-color: white;
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
        z-index: 30;
        display: grid;
    }

    &__option {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        cursor: pointer;
        background-color: var(--select-box-option-bg, #fff);
        color: var(--select-box-option-font-color, #000);
        text-align: left;

        span {
            text-transform: none;
            font-weight: 300;
            font-family:"Open Sans", serif;
        }
        

        &:hover {
            background-color: #f5f5f5;
        }
    }
}
</style>