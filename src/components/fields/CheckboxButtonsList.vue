<template>
    <div class="grid gap-4">
        <p v-if="team.name" class="text-left text-lg font-bold font-primary">
            {{ team.name }}</p>

        <ul class="flex gap-4">
            <li v-for="player in team.players" :key="player.id">
                <input type="radio" :id="`player-${player.id}`" :name="team.name" class="radio-btn hidden peer" v-model="player.on_court" />
                <label :for="`player-${player.id}`" class="">
                    #{{ player.number }}
                </label>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
defineProps({
    team: {
        type: Object,
        required: true
    }
});
</script>

<style lang="scss">
    .radio-btn + label {
        @apply border border-gray-300 rounded-md px-4 py-2 cursor-pointer inline-block;
    }

    .radio-btn:checked + label {
        @apply bg-green text-white;
    }
</style>
