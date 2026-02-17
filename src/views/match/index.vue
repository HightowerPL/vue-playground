<template>
     <div class="grid items-start xl:grid-cols-12 max-h-screen">

            <div class="xl:col-span-8 grid xl:grid-cols-2 gap-6 p-10 items-start">

                <div class="xl:col-span-2">
                    <h1>TIMER</h1>
                </div>

                <div class="xl:col-span-2 grid gap-4 ">
                    <CourtView 
                        :points="plays" 
                        :highlightId="highlightedPointId"
                        @new-point="addNewPoint" 
                        @point-update="updatePoint" 
                    />
                </div>

                <template v-if="Object.keys(teams).length > 0">
                    <RosterCard :team="teams.home" @add="addPlayer('home')" />
                    <RosterCard :team="teams.away" @add="addPlayer('away')" />
                </template>

                <div v-else class="col-span-2">
                    No teams available
                </div>

            </div>

            <div class="grid gap-6 xl:col-span-4 h-screen">
                <CardTemplate class="flex flex-col">
                    <h1 class="text-2xl font-bold mb-2">Play by Play</h1>

                    <div v-if="plays.length > 0" class="grow-1 overflow-y-auto h-full">
                        <ul class="flex flex-col-reverse">
                            <li 
                                v-for="(play, index) in plays" 
                                :key="index"
                                @mouseenter="highlightPoint(play.id)"
                                @mouseleave="unhighlightPoint(play.id)"
                                class="p-6 bg-white text-black mt-1 flex items-center justify-between"
                            >
                                <p v-if="!play.text">New play</p>
                                <p v-else>{{ play.text }}</p>

                                <div class="flex gap-2">
                                    <button 
                                        type="button" 
                                        class=" hover:underline"
                                        @click="openPlay(play.id)"
                                    >Edit</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <p v-else class="mb-6">This is the play by play view where you can see every play of the match.</p>
                </CardTemplate>
            </div>

            <MatchSidebar 
                :play="activePlay"
                :is-open="isSidebarOpen" 
                :teams="teams"
                @save-play="saveAction"
                @close="closeSidebar" 
            />

        </div>
</template>

<script setup lang="ts">
import CardTemplate from '../../components/cards/CardTemplate.vue';
import RosterCard from '../../components/cards/RosterCard.vue';
import CourtView from '../../components/cards/CourtView.vue';
import { onMounted, ref, computed } from 'vue';
import { Play } from '@/types/match.ts';
import { Point } from '@/types/points.ts';

import teamsJSON from '../../api/mock-data/teams.json';
import MatchSidebar from './components/MatchSidebar.vue';

interface TeamsMap {
    [key: string]: {
        name: string;
        players: Array<{
            name: string;
            position: string;
            number: number;
            points?: string | number;
            assists?: string | number;
            rebounds?: string | number;
        }>;
    };
}

const plays = ref<Array<Play>>([]);
const teams = ref<TeamsMap>({});
const activePlay = ref<Partial<Play>>({});
const isSidebarOpen = ref(false);
const highlightedPointId = ref<string | null>(null);

// Memoized play lookup map for O(1) access instead of O(n) with find()
const playsMap = computed(() => {
    const map = new Map<string, Play>();
    plays.value.forEach((play: Play) => {
        if (play.id) {
            map.set(play.id, play);
        }
    });
    return map;
});

onMounted(() => {
    getTeams();
});

const getTeams = () => {
    setTimeout(() => {
        teams.value = teamsJSON as TeamsMap;
    }, 1000);
};

const closeSidebar = () => {
    isSidebarOpen.value = false;
};

const addPlayer = (team: string) => {
    const newPlayer = {
        id: Date.now(),
        number: 99,
        name: 'John Doe',
        position: 'XX',
        points: '0',
        assists: '0',
        rebounds: '0',
        on_court: false
    }
    teams.value[team].players.push(newPlayer);
};

const addNewPoint = (point: Point) => {
    const play: Play = {
        id: point.id,
        position: point.position,
    };
    plays.value.push(play);
    activePlay.value = play;
    isSidebarOpen.value = true;
};

// Optimized with Map lookup - O(1) instead of O(n)
const openPlay = (id: string) => {
    const play = playsMap.value.get(id);
    if (play) {
        activePlay.value = play;
        isSidebarOpen.value = true;
    }
};

const updatePoint = (point: Point) => {
    console.log('updatePoint')
    const play: Play = {
        id: point.id,
        position: point.position,
    };
    const index = plays.value.findIndex((p: Play) => p.id === play.id);

    if (index !== -1) {
        plays.value[index] = { ...plays.value[index], position: play.position };
    }
};

const highlightPoint = (id: string) => {
    highlightedPointId.value = id;
};

const unhighlightPoint = (id: string) => {
    if (highlightedPointId.value === id) {
        highlightedPointId.value = null;
    }
};

const saveAction = (play: Play) => {
    const index = plays.value.findIndex((p: Play) => p.id === play.id);
    if (index !== -1) {
        plays.value[index] = play;
    }
    closeSidebar();
};
</script>