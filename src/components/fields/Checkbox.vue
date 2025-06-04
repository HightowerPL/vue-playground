<template>
    <label class="checkbox"
        :class="[ computedValue ? 'checked' : '' ]"
    >
        <span class="checkbox__label" :for="`checkbox-${id}`" v-html="label" />
        
        <input
            :id="`checkbox-${id}`"
            class="checkbox__input"
            v-model="computedValue"
            type="checkbox"
            :disabled="disabled"
            :indeterminate="indeterminate"
            :true-value="trueValue"
            :false-value="falseValue"
            :value="value"
            :checked="checked"
        />

        <Transition name="fade-up-sm">
            <span class="checkbox__error" v-if="error">
                {{  error }}
            </span>
        </Transition>

    </label>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const id = ref(Math.floor(Math.random() * 10000000))
const props = defineProps({
    modelValue: [
      Boolean,
      String,
      Number,
      Array as () => Array<string | number>,
    ],
    value: [String, Number, Array as () => Array<string>],
    trueValue: {
      type: [Boolean, String, Number],
      default: true,
    },
    falseValue: {
      type: [Boolean, String, Number],
      default: false,
    },
    label: String,
    checked: Boolean,
    id: String,
    name: String,
    round: Boolean,
    disabled: Boolean,
    indeterminate: Boolean,
    error: String,
})

const emit = defineEmits(['update:modelValue'])

const computedValue = computed({
      get(): boolean | string | number | (string | number)[] | undefined {
        return props.modelValue;
      },
      set(value: boolean | string | number | (string | number)[] | undefined) {
        emit("update:modelValue", value);
      },
})
</script>

<style scoped lang="scss">
    
</style>