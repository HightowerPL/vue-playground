<template>
    <div class="">
        <label 
            v-bind="$attrs"
            class="field-bg hover h-full flex justify-center items-center relative transition-all ease-in-out text-center border border-transparent text-white open-sans-vp font-light p-4 mb-0"
            :class="[
                filename ? 'border-lightBlack text-lightBlack fill-lightBlack' : ''
            ]"
            @drop.prevent="handleDrop"
            @dragenter="entering=true"
            @dragleave="entering=false"
            >
            <input
                :name="name"
                type="file"
                class="absolute top-0 left-0 w-full h-full opacity-0 text-center cursor-pointer"
                @input="handleInput"
                :accept="props.accept">

            <div class="w-full relative pointer-events-none mb-2">
                <UploadIcon class="w-10 fill-white font-normal mx-auto" alt="Upload image"></UploadIcon>
                <span class="block text-sm mb-1">
                    Drop your image here <br/>
                    or <span class="underline">Browse files</span>
                </span>
            </div>
            <Transition name="fade-up" >
                <div class="field__error w-full absolute left-1/2 -translate-x-1/2 bottom-1"  v-if="error">
                    <div aria-hidden="true" class=" text-xs" :style="{ opacity: 1, color: error ? 'rgb(181 30 30)' : undefined }">
                        {{ error ? error : '' }}
                    </div>
                </div>
            </Transition>
        </label>
    </div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import UploadIcon from '../../assets/icons/upload-icon.svg'

const props = defineProps({
        modelValue: [String, Number],
        name: {
            type: String,
            default: 'file'
        },
        label: String,
        helper: String,
        accept: String,
        filename: {
            type:String,
            default: ''
        },
    })

const events = ['dragenter', 'dragover', 'dragleave', 'drop']
const error = ref('')

const emit = defineEmits<{
    (e:"upload", files: File[]):void
}>()

const entering = ref(false)

function validateFile(file) {
    return file.type.includes('image') ? true : false
}

function handleDrop(e: Event) {
    handleUpload(e.dataTransfer.files[0])
}

function handleInput(e: Event) {
    handleUpload(e.target.files[0])
}

function handleUpload(file) {
    if (validateFile(file)) {
        error.value = ''
        emit('upload', file)
    } else {
        error.value = `Only the following formats are accepted: ${props.accept}`
    }
}

onMounted(()=>{
    events.forEach(event => document.body.addEventListener(event, (e)=>e.preventDefault()))
})

onUnmounted(() => {
    events.forEach(event => document.body.removeEventListener(event, (e)=>e.preventDefault()))
})

</script>