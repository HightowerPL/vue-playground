<template>
    <div class="">
        <h2>Edit Team</h2>
        <form @submit.prevent="submit">
            <div>
                <label for="name">Team Name</label>
                <input type="text" id="name" v-model="team.name" />
            </div>
            <div>
                <p>Players</p>
                <!-- <textarea id="players" v-model="team.players" /> -->

                <table class="roster-table" cellspacing="4" v-if="team.players.length > 0">
                    <thead class="roster-table__head">
                        <tr>
                            <th class="roster-table__head-cell">Nr</th>
                            <th class="roster-table__head-cell">Name</th>
                            <th class="roster-table__head-cell">Position</th>
                            <th class="roster-table__head-cell">Points</th>
                            <th class="roster-table__head-cell">Assists</th>
                            <th class="roster-table__head-cell">Rebounds</th>
                        </tr>
                    </thead>
                    <tbody class="roster-table__body">
                        <tr v-for="(player, index) in team.players" :key="index">
                            <td class="roster-table__body-cell">{{ player.number }}</td>
                            <td class="roster-table__body-cell">{{ player.name }}</td>
                            <td class="roster-table__body-cell">{{ player.position }}</td>
                            <td class="roster-table__body-cell">{{ player.points }}</td>
                            <td class="roster-table__body-cell">{{ player.assists }}</td>
                            <td class="roster-table__body-cell">{{ player.rebounds }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button type="submit">Save</button>
        </form>
    </div>
</template>

<script setup lang="ts">

const props = defineProps<{
    team: {
        name: string;
        players: string[];
    };
}>();

</script>