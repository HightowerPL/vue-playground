<template>
    <div class="p-6 xl:p-8">
        <div class="flex items-center justify-between mb-6">
            <h1 class="text-xl">Edit Player</h1>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
            <form action="" class="form card grid md:grid-cols-2 gap-6">

                <Textfield
                    v-model="fname"
                    name="fname"
                    label="First Name"
                    placeholder="Your first name"
                    required
                />

                <Textfield
                    v-model="lname"
                    name="lname"
                    label="Last Name"
                    placeholder="Your last name"
                    required
                />

                <Textfield
                    class="md:col-span-2"
                    v-model="email"
                    name="email"
                    label="Email"
                    placeholder="Your email"
                    required
                />

                <Textfield
                    v-model="birth"
                    name="birth"
                    type="date"
                    label="Birth Date"
                    placeholder="Player's birth date"
                    required
                />

                <Textfield
                    v-model="height"
                    name="height"
                    label="Height"
                    placeholder="Player's height"
                    required
                />

                <Multibox
                    v-model="positions"
                    name="positions"
                    label="Positions"
                    trackyBy="id"
                    :options="positionsData"
                    :searchable="false"
                    displayKey="name"
                    class="md:col-span-2"
                    required
                />

                <div class="md:col-span-2 mt-6">
                    <FilledButton
                        type="submit"
                        color="green"
                    >
                        Save Player
                    </FilledButton>
                    <OutlinedButton
                        type="button"
                        color="gray"
                        class="ml-4"
                        >
                        Cancel
                    </OutlinedButton>
                </div>

            </form>

            <div class="card">
                <h2 class="text-lg text-left">Gallery</h2>

                <div class="grid md:grid-2-cols">
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Textfield from '@/components/fields/Textfield.vue';
import FilledButton from '@/components/buttons/FilledButton.vue';
import OutlinedButton from '@/components/buttons/OutlinedButton.vue';
import Multibox from '@/components/fields/Multibox.vue';

const positions = ref<Array<String>>([]);
const fname = ref<string>('');
const lname = ref<string>('');
const email = ref<string>('');
const birth = ref<string>('');
const height = ref<string>('');

onMounted(() => {
    console.log('Player Edit View Mounted');
});

const positionsData = [ 
    { id: 1, name: 'Point Guard', short: 'PG'},
    { id: 2, name: 'Shooting Guard', short: 'SG'},
    { id: 3, name: 'Small Forward', short: 'SF'},
    { id: 4, name: 'Power Forward', short: 'PF'},
    { id: 5, name: 'Center', short: 'C'}
]

</script>