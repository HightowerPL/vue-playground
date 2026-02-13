<template>
    <div class="relative flex flex-col gap-8 items-center justify-center p-8 w-full h-full ">

        <div class="w-1/2 h-1/2 flex items-center justify-center">
            <Transition name="fade-up" mode="out-in">
                <div v-if="!isDrawing">
                    <p class="text-2xl italic relative" >
                        <OhVueIcon
                            class="fill-green w-8 h-8 absolute bottom-3/4 right-[100%] mr-2"
                            name="ri-double-quotes-l"
                        />
                        {{  selectedQuote.quote }}
                        <OhVueIcon
                            class="fill-green w-8 h-8 absolute top-3/4 left-[100%]  rotate-180 ml-2"
                            name="ri-double-quotes-l"
                        />
                    </p>
                    <p class="text-xs mt-8">--  {{ selectedQuote.author }}  --</p>
                </div>
                <div v-else-if="!isFirstLoaded" class="dots-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </Transition>
        </div>
        <div class="h-10 flex items-center gap-4">
            <Transition name="fade-in">
                <button
                    v-if="isFirstLoaded"
                    type="button"
                    class="w-10 h-10 p-0 hover-scale transition-opacity"
                    :class="[isDrawing ? 'opacity-50 pointer-events-none' : '']"
                    @click="togglePause()"
                >
                    <OhVueIcon
                        class="fill-green w-full h-full"
                        :name="isPaused ? 'bi-play-fill' : 'bi-pause-fill'"
                    />
                </button>
            </Transition>

            <Transition name="fade-in">
                <button
                    v-if="isFirstLoaded"
                    type="button"
                    class="w-10 h-10 p-0 hover-scale"
                    :class="[
                        isDrawing ? 'opacity-50 pointer-events-none': ''
                    ]"
                    @click="drawQuote()"
                >
                    <OhVueIcon
                        class="fill-green w-full h-full"
                        name="md-skipnext-round"
                    />
                </button>
            </Transition>
        </div>

        <div class="progress-bar-track">
            <div 
                class="progress-bar-fill" 
                :style="`transform: scaleX(${progress/100})`"
            >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import quotesJSON from '../../api/mock-data/quotes.json';
import { OhVueIcon } from 'oh-vue-icons';

interface Quote {
    quote: string,
    author: string
}

const INTERVAL_MS = 12000;
const TICK_MS = 25;

const selectedQuote = ref<Quote>({quote: '', author: ''});
const quotes = ref<string[]>([]);
const isDrawing = ref<boolean>(true);
const isFirstLoaded = ref<boolean>(false);
const progress = ref<number>(0);
const isPaused = ref<boolean>(false);

let autoTimer: ReturnType<typeof setTimeout> | null = null;
let progressTimer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
    getQuotes();
})

onUnmounted(() => {
    clearTimers();
})

const clearTimers = () => {
    if (autoTimer) clearTimeout(autoTimer);
    if (progressTimer) clearInterval(progressTimer);
}

const startAutoAdvance = (resume = false) => {
    clearTimers();
    if (!resume) progress.value = 0;

    const increment = 100 / (INTERVAL_MS / TICK_MS);
    const remaining = INTERVAL_MS * (1 - progress.value / 100);

    progressTimer = setInterval(() => {
        progress.value = Math.min(progress.value + increment, 100);
    }, TICK_MS);

    autoTimer = setTimeout(() => {
        drawQuote();
    }, remaining);
}

const getQuotes = () => {
    setTimeout(() => {
        quotes.value = quotesJSON.quotes;
        drawQuote();
    }, 2000)
}

const togglePause = () => {
    isPaused.value = !isPaused.value;
    if (isPaused.value) {
        clearTimers();
    } else {
        startAutoAdvance(true);
    }
}

const drawQuote = () => {
    isDrawing.value = true;
    isPaused.value = false;
    clearTimers();
    progress.value = 0;
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random()*quotes.value.length);
        selectedQuote.value = quotes.value[randomIndex];
        isDrawing.value = false;
        isFirstLoaded.value = true;
        startAutoAdvance();
    }, 400)
}
</script>

<style lang="scss">
.hover-scale {
    transition: transform .6s cubic-bezier(0.68,-0.55,0.27,1.55);
    &:hover { transform: scale(1.3)}
}

.dots-loader {
    display: flex;
    gap: 8px;

    span {
        display: inline-block;
        width: 4px;
        height: 4px;
        border-radius: 100%;
        background-color: white;
        animation-name: lifitng;
        animation-duration: 2s;
        animation-iteration-count: infinite;
        animation-timing-function: cubic-bezier(0.455, 0.03, 0.515, 0.955);

        &:nth-child(2) { animation-delay: .2s }
        &:nth-child(3) { animation-delay: .4s }
    }
}

@keyframes lifitng {
    0% { transform: translateY(0%) }
    25% { transform: translateY(200%) }
    50% { transform: translateY(0%) }
    25% { transform: translateY(-200%) }
    100% { transform: translateY(0%) }
}

.progress-bar-track {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: transparent;

    .progress-bar-fill {
        height: 100%;
        background-color: var(--color-green);
        transition: transform 0.3s linear;
        transform-origin: center left;
    }
}
</style>
