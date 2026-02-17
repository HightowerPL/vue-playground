<template>
    <label class="toggle" :for="toggleId">
        <input 
            class="toggle__input"
            type="checkbox"
            :name="name"
            :id="toggleId"
            v-model="value"
        >
        
        <span class="toggle__text">{{ label }} </span>
        <div class="toggle__block"></div>
    </label>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    label: string,
    name: string, 
    modelValue: boolean
}

const props = defineProps<Props>()
const emits = defineEmits(['update:modelValue']);
const toggleId = `toggle-${props.name}-${parseInt((Math.random()*10000000000).toString()).toString()}`;

const value = computed({
    get() {
        return props.modelValue
    },
    set(newValue) {
        emits('update:modelValue', newValue);
    }
})
</script>

<style lang="scss">
:root {
    --toggle-bg-color: var(--color-grey);
    --toggle-active-bg-color: var(--color-green);
    --toggle-inner-color: var(--color-white);
    --toggle-inner-active-color: var(--color-white);
}

.toggle {
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 12px;
    cursor: pointer;

    &__input {
        display: none;
    }

    &__block {
        height: 24px;
        width: 42px;
        border-radius: 24px;
        background-color: var(--toggle-bg-color);
        position: relative;

        &:before {
            content: '';
            width: 50%;
            height: calc(100% - 4px);
            border-radius: 100%;
            background-color: var(--toggle-inner-color);
            position: absolute;
            top: 2px;
            left: 2px;
            transition: transform .3s cubic-bezier(0.68,-0.55,0.27,1.55), background-color .3s;
        }
    }

    &:has(input:checked) {
        .toggle__block {
            background-color: var(--toggle-active-bg-color);

            &:before {
                background-color: var(--toggle-inner-active-color);
                transform: translateX(calc(100% - 4px));
            }
        }
    }


}
</style>