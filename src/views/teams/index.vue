<template>

    <div class="grid gap-6 p-4 xl:p-8">
        <div class="">
            <h2 class="text-xl font-bold text-left">Teams</h2>
        </div>

        <DataTable 
            :columns="[
                { name: 'Team Name', field: 'name' },
                { name: 'Players', field: 'players' }
            ]"
            :data="teams.map(team => ({ 
                name: team.name, 
                players: team.players.join(', ') 
            }))"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DataTable from '@/components/tables/DataTable.vue';

const teams = ref<Array<{ name: string; players: string[] }>>([
    { name: 'Team A', players: ['Alice', 'Bob'] },
    { name: 'Team B', players: ['Charlie', 'David'] }
]);
</script>