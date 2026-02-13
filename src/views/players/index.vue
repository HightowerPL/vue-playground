<template>
    <div class="grid gap-6 p-6 xl:p-8">
        <div class="flex max-md:flex-col md:items-center md:justify-between gap-6">
            <h2 class="text-xl">Players</h2>
            <FilledButton @click="addPlayer">Add Player</FilledButton>
        </div>

        <DataTable 
            :columns="[
                { name: 'Player Name', field: 'name' },
                { name: 'Team', field: 'team' },
                { name: 'Actions', field: 'actions' }
            ]"
            :data="players" 
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '../../components/tables/DataTable.vue';
import FilledButton from '../../components/buttons/FilledButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const players = ref<Array<{ name: string; team: string; id: number }>>([
    { name: 'Alice', team: 'Team A', id: 1 },
    { name: 'Bob', team: 'Team A', id: 2 },
    { name: 'Charlie', team: 'Team B', id: 3 },
    { name: 'David', team: 'Team B', id: 4 }
]);

const addPlayer = () => {
    router.push({ name: 'PlayerEdit' });
    console.log('Add Player clicked');

};
</script>