<template>
    <div class="flex flex-col justify-start w-custom max-w-[750px] mx-auto py-8 xl:pt-10">
        <h1 class="text-xl font-bold mb-9 text-green">Snackbar</h1>

        <div class="grid gap-4">

            <div class="text-left">
                <label for="msg" class="block mb-1 text-green font-bold">Message</label>
                <textarea
                    type="text"
                    name="msg"
                    class="border border-green bg-black text-white p-2 w-full"
                    v-model="msg"
                    rows="5"
                    placeholder="Please enter your example message"
                />
            </div>

            <div class="grid md:grid-cols-3 gap-4">

                <FilledButton color="green" @click="openSnack('success')">
                    Show 'Success' Snackbar
                </FilledButton>

                <FilledButton color="red" @click="openSnack('error')">
                    Show 'Error' Snackbar
                </FilledButton>

                <FilledButton color="blue" @click="openSnack('info')">
                    Show 'Info' Snackbar
                </FilledButton>

            </div>

        </div>

    </div>
</template>

<script setup lang="ts">
import FilledButton from '@/components/buttons/FilledButton.vue';
import { ref } from "vue";
import { useSnackbar } from '@/store/snackbar.ts'

const snackbar = useSnackbar()
const msg = ref('')

const openSnack = (type) => {
    const data = {
        content: msg.value,
        type: type,
        operationType: type,
        timeout: 8000,
    }
    snackbar.show(data)
}
</script>