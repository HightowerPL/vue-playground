<template>
    <div 
        class=" fixed top-0 right-0 h-full w-full flex justify-end items-center bg-gray-800/70 z-20 opacity-0 pointer-events-none transition-opacity duration-300"
        :class="[isOpen ? 'pointer-events-auto opacity-100' : '']"
    >
        <div class="absolute top-0 left-0 right-0 bottom-0 z-10" @click="closeActionPanel"></div>
        <div 
            class="w-1/2 grid items-start gap-6 h-full p-8 z-20 bg-gray-800/90 transform  transition-transform duration-300"
            :class="[isOpen ? 'translate-x-0' : 'translate-x-full']"
        >

            <div class="grid gap-8">
<!-- 
                <CheckboxButtonsList 
                    v-if="teams.home"
                    :team="teams.home"/>

                <CheckboxButtonsList 
                    v-if="teams.away"
                    :team="teams.away"/>   -->

                <h2 class="text-lg">Home</h2>

                <ul class="flex gap-4">
                    <li v-for="(player, index) in teams?.home?.players" :key="index" class="player-radio">
                        <label :for="`player-${player.id}`" class="player-radio__label"># {{  player.number }}</label>
                        <input type="radio" name="player" :value="player.id" :id='`player-${player.id}`' class="player-radio__input">
                    </li>
                </ul>

                <h2 class="text-lg">Away</h2>

                <ul class="flex gap-4">
                    <li v-for="(player, index) in teams?.away?.players" :key="index" class="player-radio">
                        <label :for="`player-${player.id}`" class="player-radio__label"># {{  player.number }}</label>
                        <input type="radio" name="player" :value="player.id" :id='`player-${player.id}`' class="player-radio__input">
                    </li>
                </ul>

            </div>

            <div class="grid grid-cols-3 items-start gap-2 p-4">
                <Checkbox
                    v-model="type"
                    value="shot"
                    name="type"
                    class="checkbox--green"
                    label="Shot"
                />

                <Checkbox
                    v-model="type"
                    value="rebound"
                    name="type"
                    class="checkbox--green"
                    label="Rebound"
                />

                <Checkbox
                    v-model="type"
                    value="assist"
                    name="type"
                    class="checkbox--green"
                    label="Assist"
                />
            </div>

            <div>
                <Textfield
                    v-model="desc"
                    label="Description"
                    name="description"
                    placeholder="Please enter a short description of the play"
                />
            </div>

            <FilledButton 
                class="mt-4 w-full" 
                @click="savePlay"
            >
                Save Play
            </FilledButton>

        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Checkbox from '../../../components/fields/Checkbox.vue';

defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    teams: {
        type: Object,
        required: false
    },
    play: {
        type: Object,
        required: true
    }
});


const desc = ref('');
const type = ref('');

const emit = defineEmits(['save-play', 'close']);

const closeActionPanel = () => {
    // Emit an event or use a state management solution to close the sidebar
    // For example, you might emit an event like this:
    emit('close');
};

const savePlay = () => {

};


</script>

<style lang="scss">

.player-radio {

    

    &:has(input:checked) .player-radio__label {
        background-color: var(--color-green);
    }

    &__label {
        display: block;
        padding: 8px;
        border: 1px solid white;
        border-radius: 8px;
        font-weight: 700;
        transition: background-color .3s;
        cursor: pointer;
        position: relative;
        cursor: pointer;

        &:hover  {
            background-color: var(--color-green-light)
        }
    }

    &__input {
        display: none;
    }
}
</style>