<template>
    <div :style="{ zIndex }">
        <h2>Edit Team</h2>
        <form @submit.prevent="submitForm" class="grid gap-6">
            <div>
                <label for="name" class="font-bold block text-gray-300">Team Name</label>
                <input class=" text-xl text-black" type="text" id="name" v-model="editableData.name" />
            </div>
            <table class="roster-table" cellspacing="4" v-if="editableData.players.length > 0">
                <thead class="roster-table__head">
                    <tr>
                        <th class="roster-table__head-cell">Nr</th>
                        <th class="roster-table__head-cell">Name</th>
                        <th class="roster-table__head-cell">Position</th>
                    </tr>
                </thead>
                <tbody class="roster-table__body">
                    <tr v-for="(player, index) in editableData.players" :key="index">
                        <td class="roster-table__body-cell">
                            <input type="text" v-model="player.number" />
                        </td>
                        <td class="roster-table__body-cell">
                            <input type="text" v-model="player.name" />
                        </td>
                        <td class="roster-table__body-cell">
                            <input type="text" v-model="player.position" />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>
                <OutlinedButton 
                    small
                    color="grey-400"
                    @click="editableData.players.push({ number: '', name: '', position: '' })" 
                        class="mt-4"
                    >
                    Add Player
                </OutlinedButton>
            </div>
            <div class="text-center">
                <FilledButton @click="submitForm" class="min-w-[200px]">Save</FilledButton>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import OutlinedButton from '../buttons/OutlinedButton.vue';

const emit = defineEmits(['close', 'save'])

const props = defineProps<{
    zIndex: number,
    team: {
        name: string;
        players: { number: string; name: string; position: string }[];
    };
}>();

const editableData = computed({
    get: () => props.team,
    set: (value) => {
        editableData.value = { ...value }
    }
});

const submitForm = () => {
    emit('save', editableData.value);
};

</script>