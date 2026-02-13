<template>
    <CardTemplate class="grid grid-cols-1 gap-4 items-start">
        <div class="flex justify-between items-center ">
            <h2 class="text-lg">
                <input type="text" v-model="team.name" />
            </h2>

            
        </div>

        <template v-if="team.players.length > 0">
            <table class="roster-table text-white" cellspacing="4" >
                <thead class="roster-table__head">
                    <tr>
                        <th class="roster-table__head-cell number">NR</th>
                        <th class="roster-table__head-cell name">NAME</th>
                        <th class="roster-table__head-cell pos">POS</th>
                        <th class="roster-table__head-cell points">PTS</th>
                        <th class="roster-table__head-cell assists">AST</th>
                        <th class="roster-table__head-cell rebounds">REB</th>
                        <!-- <th class="roster-table__head-cell on-court">On</th> -->
                    </tr>
                </thead>
                <tbody class="roster-table__body">
                    <tr v-for="(player, index) in team.players" :key="index">
                        <td class="roster-table__body-cell number">
                            <input name="player_number" type="text" v-model="player.number">
                        </td>
                        <td class="roster-table__body-cell name">
                            <input name="player_name" type="text" v-model="player.name">
                        </td>
                        <td class="roster-table__body-cell pos">
                            <input name="player_position" type="text" v-model="player.position">
                        </td>
                        <td class="roster-table__body-cell points">
                            {{ player.points }}
                        </td>
                        <td class="roster-table__body-cell assists">
                            {{ player.assists }}
                        </td>
                        <td class="roster-table__body-cell rebounds">
                            {{ player.rebounds }}
                        </td>
                        <!-- <td class="roster-table__body-cell on-court">
                            <Checkbox v-model="player.on_court" class="checkbox--green" name="on_court" :value="false" />
                        </td> -->
                    </tr>
                </tbody>
            </table>
            <OutlinedButton
                    small
                    :url="`/roster/${title}`"
                    @click="$emit('add')"
                >Add Player
            </OutlinedButton>
        </template>

        <div class="p-4" v-else>
            <p class="mb-4">This card displays the roster for the {{ title }}.</p>
        </div>
    </CardTemplate>
</template>

<script setup lang="ts">
import { defineProps,ref } from 'vue';
import OutlinedButton from '../buttons/OutlinedButton.vue';
import CardTemplate from './CardTemplate.vue';

interface Team {
    name: string;
    players: Array<{
        name: string;
        position: string;
        number: number;
    }>
}

const props = defineProps<{
    team: Team
}>();

</script>

<style scoped lang="scss">
input {
    border-radius: 4px;
    transition: background-color .4s;
    
    &:hover {
        color: var(--color-green)
    }

    &:focus {
        color: var(--color-black);
        background-color: var(--color-white);
    }
}
</style>