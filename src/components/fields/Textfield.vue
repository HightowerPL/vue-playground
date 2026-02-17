<template>
    <div class="text-left relative w-full">
        <label for="fname" class="form__label">{{label}}<span v-if="required" class="text-rose">&nbsp;&nbsp;*</span></label>
        <input
            v-model="model"
            :type="type"
            :name="name"
            class="form__input w-full text-sm"
            :class="[
                model ? 'filled' : '',
                errorMessage ? 'border-rose' : '',
            ]"
            :rows="rows"
            :required
            :placeholder="placeholder"
        >
        <Transition name="fade-up">
            <span v-if="errorMessage" class="error m-show" >{{ errorMessage }}</span>
        </Transition>
    </div>

</template>

<script setup lang="ts">
const model = defineModel()

defineProps({
    name: {
        type: String,
        default: 'textfield'
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: 'Enter text here'
    },
    label: {
        type: String,
        default: 'Label'
    },
    errorMessage: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    rows: {
        type: String,
        default: '2'
    }
})
</script>