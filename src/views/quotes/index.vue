<template>
    <div class="flex flex-col gap-8 items-center justify-center p-8 w-full h-full ">

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
                <div v-else class="dots-loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </Transition>
        </div>

        <div class="h-10">
            <Transition name="fade-in">
                <button 
                    type="button" 
                    class="w-10 h-10 p-0 hover-spin"
                    :class="[
                        isDrawing ? 'opacity-50 pointer-events-none': ''
                    ]"
                    @click="drawQuote()" 
                >
                    <OhVueIcon
                        class="fill-green w-full h-full"
                        name="bi-arrow-repeat"
                    />
                </button>
            </Transition>

        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import quotesJSON from '../../api/mock-data/quotes.json';
import { OhVueIcon } from 'oh-vue-icons';

interface Quote {
    quote: string,
    author: string
}

const selectedQuote = ref<Quote>({quote: '', author: ''});
const quotes = ref<string[]>([]);
const isDrawing = ref<boolean>(true);
const isFirstLoaded = ref<boolean>(false)

onMounted(() => {
    getQuotes();
})

const getQuotes = () => {
    setTimeout(() => {
        quotes.value = quotesJSON.quotes;
        drawQuote();
    }, 2000)
}

const drawQuote = () => {
    isDrawing.value = true
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random()*quotes.value.length);
        selectedQuote.value = quotes.value[randomIndex];
        isDrawing.value = false;
        isFirstLoaded.value = true;
    }, 400)
}
</script>

<style lang="scss">
.hover-spin {
    transition: transform .6s cubic-bezier(0.68,-0.55,0.27,1.55), opacity .3s;

    &:hover {
        transform: scale(1.3) rotate(360deg);
    }
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
</style>