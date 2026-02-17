<template>
    <div class="max-w-[640px] w-11/12 mx-auto py-8 xl:pt-10">

        <form
            class="form card mb-10"
            ref="form"
            @submit.prevent="handleForm"
        >

        <h1 class="text-xl text-green font-bold mb-9">
            Form validation
        </h1>
            <div class="hidden">
                {{ errors }} <br>
                {{ errors['fname'] }} <br>
                {{ errors['lname'] }} <br>
                {{ errors['email'] }} <br>
                {{ errors['msg'] }} <br>
                {{ errors['terms'] }} <br>
                {{ errors['country'] }} <br>
            </div>
            <div class="max-md:flex max-md:flex-col md:grid md:grid-cols-2 gap-7">
                <Textfield
                    v-model="fname"
                    name="fname"
                    label="First Name"
                    placeholder="Your first name"
                    :errorMessage="errors['fname']"
                    required
                />

                <Textfield
                    v-model="lname"
                    name="lname"
                    label="Last Name"
                    placeholder="Your last name"
                    :errorMessage="errors['lname']"
                    required
                />

                <Textfield
                    v-model="email"
                    name="email"
                    label="Email"
                    placeholder="example@mail.com"
                    :errorMessage="errors['email']"
                    class="md:col-span-2"
                    required
                />

               <Selectbox
                    v-model="country"
                    name="country"
                    label="Country"
                    :options="countries"
                    :errorMessage="errors['country']"
                    class="md:col-span-2"
                    required
               />

               <Multibox
                    v-model="hobbies"
                    name="hobby"
                    label="Hobby"
                    trackyBy="id"
                    displayKey="name"
                    :options="hobbiesData"
                    :errorMessage="errors['hobby']"
                    class="md:col-span-2"
                    required
                />

                <div class="text-left md:col-span-2 relative">
                    <label for="msg" class="form__label block">Message <span class="text-rose">*</span></label>
                    <textarea type="msg" name="msg" class="form__textarea w-full text-sm" v-model="msg" rows="10" placeholder="Please enter your message"/>
                    <Transition name="fade-up">
                        <span v-if="errors['msg']" class="absolute top-full left-0 text-xs text-rose" >{{ errors['msg'] }}</span>
                    </Transition>
                </div>

                <div class="gap-6 flex max-sm:flex-col md:col-span-2 md:items-stretch">
                    <figure class="field-bg inline-block relative max-sm:min-h-[144px] bg-white/5 sm:min-w-[144px] sm:max-w-[144px] sm:grow text-center">
                        <picture
                            v-if="preview"
                            class="flex justify-center items-center h-full p-2"
                        >
                            <img
                                id="output"
                                class="inline-block max-w-full max-h-full mx-auto object-contain"
                                :src="preview"
                                alt="Profile Picture"
                            />
                        </picture>
                        <figcaption
                            v-else
                            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover text-sm">
                            Image Preview
                        </figcaption>
                    </figure>

                    <DropZone
                        @upload="handleUpload"
                        :filename="file?.name"
                        :error="fileError"
                        name="image"
                        accept="image/*"
                        class="sm:grow"
                    />
                </div>

                <div class="md:col-span-2">
                    <Checkbox
                        v-model="terms"
                        name="terms"
                        class="checkbox--green"
                        label='I agree to the terms and conditions&nbsp;<span class="text-rose"> *</span>'
                        :error="errors['terms']"
                    />
                </div>

                <div class="text-left col-span-2">
                    <FilledButton type="submit" :isLoading="isLoading" full>
                        Submit
                    </FilledButton>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import FilledButton from '@/components/buttons/FilledButton.vue';
import { useSnackbar } from '@/store/snackbar.ts'
import DropZone from '@/components/fields/DropZone.vue'
import Checkbox from '@/components/fields/Checkbox.vue';
import Textfield from '@/components/fields/Textfield.vue';
import Selectbox from '@/components/fields/Selectbox.vue';
import Multibox from '@/components/fields/Multibox.vue';

const isLoading = ref(false)
const snackbar = useSnackbar()
const form = ref<HTMLFormElement | null>(null)
const file = ref<File | null>(null);
const fileError = ref('');
const hobbies = ref([])
const preview = ref<string | null>(null);
const countries = [
    { value: 'uk', text: 'United Kingdom' },
    { value: 'pl', text: 'Poland' },
    { value: 'us', text: 'United States of America' },
]

const hobbiesData = [ 
    { id: 1, name: 'Basketball'},
    { id: 2, name: 'Hiking'},
    { id: 3, name: 'Music'},
    { id: 4, name: 'Reading'},
    { id: 5, name: 'Traveling'},
    { id: 6, name: 'Cooking'},
    { id: 7, name: 'Gaming'},
    { id: 8, name: 'Photography'},
    { id: 9, name: 'Gardening'},
    { id: 10, name: 'Fishing'},
    { id: 11, name: 'Cycling'},
    { id: 12, name: 'Running'},
    { id: 13, name: 'Swimming'},
    { id: 14, name: 'Yoga'},
    { id: 15, name: 'Dancing'},
    { id: 16, name: 'Writing'},
    { id: 17, name: 'Drawing'},
    { id: 18, name: 'Painting'},
    { id: 19, name: 'Knitting'},
    { id: 20, name: 'Sewing'}
]

const { handleSubmit, setFieldValue, errors } = useForm({
    validationSchema: yup.object({
        fname: yup.string().required('This field is required'),
        lname: yup.string().required('This field is required'),
        email: yup.string().email('E-mail is not valid').required('This field is required'),
        msg: yup.string().required('This field is required'),
        country: yup.string(),
        terms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions'),
    }),
});

const { value: fname } = useField<string>("fname");
const { value: lname } = useField<string>("lname");
const { value: email } = useField<string>("email");
const { value: msg } = useField<string>("msg");
const { value: country } = useField<string>("country");
const { value: terms } = useField<boolean>("terms");

setFieldValue('terms', false)

const handleForm = handleSubmit((_values)=>{
    isLoading.value = true

    setTimeout(()=>{
        isLoading.value = false
        snackbar.show({
            content: 'Form submitted successfully',
            type: 'success',
            operationType: 'form',
            timeout: 5000
        })
        if (form.value) form.value.reset();
    }, 2000)
})

const previewImage = (data: File) => {
    const reader = new FileReader()
    reader.onload = function() { preview.value = reader.result as string }
    reader.readAsDataURL(data);
}

const handleUpload = (data: File) => {
    previewImage(data)
    file.value = data;
}

</script>

<style scoped lang="scss">

</style>