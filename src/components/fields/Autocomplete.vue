<template>
    <div class="inline-block relative z-20">
        <span class="absolute inset-y-0 flex items-center" :class="[ iconOnRight ? 'right-0' : 'left-0' ]">
            <searchIcon class="w-6 h-6 fill-white" />
        </span>

        <label for="search" class="sr-only">
            <slot />
        </label>

        <input
            v-model="searchAutocompleteKeyword"
            type="text"
            :id="id"
            autocomplete="off"
            :placeholder="placeholder"
            @focus="inputFocused = true"
            @blur="clearSearch"
            @keyup="handleEnter"
            class=" focus:outline-none order-first bg-transparent w-full py-0"
            :class="[ iconOnRight ? 'pr-10' : 'pl-8', ]"
        />

        <Loader small v-if="isLoading" class="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center" />

        <Transition name="fade-up">
            <ul v-show="(searchResult.length || emptyResult) && inputFocused" class="max-lg:w-[94vw] max-lg:-left-9 w-full max-w-[600px] bg-green text-lightBlack shadow-md mt-3 absolute z-100 text-left ">
                <li v-if="!emptyResult" class=" text-xs p-2 border-b border-lightBlack/40  grid grid-cols-3 items-center text-left">
                    <span class="col-span-2 font-bold">Showing {{ showedCount }} of {{ resultCount }} results</span>
                    <span v-if="enableEnter" class="opacity-50 ml-auto max-xl:hidden">Press "Enter" for full results</span>
                </li>
                <li v-if="emptyResult" class="p-2">
                    No results for phrase:
                    <span class="text-white">{{ searchAutocompleteKeyword }}</span>
                </li>
                <li v-for="item in searchResult"
                    :key="item.id"
                    @click="handleSelect(item)"
                    class="flex items-center cursor-pointer hover:bg-lightGrey transtition-background rounded-sm duration-300 p-2 hover:bg-black/10"

                >
                    <picture v-if="item.image"  class="inline-block bg-white min-w-9 max-w-9 h-9 rounded overflow-hidden mr-2">
                        <img :src="item.image" :alt="item.name" class="w-full h-full object-cover">
                    </picture>
                    <span>
                        <span class="font-bold text-sm" v-html="item.name">
                        </span><span v-if="item.stock_code" class="block text-xs">(<span v-html="item.stock_code_label"></span>)</span>
                    </span>
                </li>
            </ul>
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Loader from '../../components/loader/Loader.vue';
import useDebouncedRef from '../../hooks/useDebouncedRef';
import searchIcon from '../../assets/icons/search-icon.svg';

const isLoading = ref(false);
const searchAutocompleteKeyword = useDebouncedRef('', 1000);
const searchResult = ref([]);
const resultCount = ref(0);
const showedCount = ref(0);
const wasWatchUsed = ref(false);
const emptyResult = ref(false);
const inputFocused = ref(false);

const props = defineProps({
    id: {
        type: [String, Number],
        required: true,
    },
    apiFn: {
        type: Function,
        required: true,
    },
    enableEnter: {
        type: Boolean,
        default: false,
    },
    placeholder: {
        type: String,
        default: 'Search for product',
    },
    itemsCount: {
        type: Number,
        default: 10,
    },
    iconOnRight: {
        type: Boolean,
        default: false,
    },
})

const emits = defineEmits<{
    (e: 'selectItem', item: Object): void
    (e: 'enterPressed', value: String): void
}>()

async function getData(searchValue: string) {
    isLoading.value = true;

    return props.apiFn(`?search=${searchValue}`)
        .then((response: any) => response)
        .finally(() => {
            isLoading.value = false;
        });
}

const handleSelect = (item: Object) => {
    emits('selectItem', item)
    searchResult.value = [];
}

const handleEnter = (event: Object) => {
    if (event.key === "Enter" && resultCount.value > 0 && props.enableEnter) {
        emits('enterPressed', searchAutocompleteKeyword.value)
    }
}

async function assignResult() {
    const response = await getData(searchAutocompleteKeyword.value);
    const resultData = response.data;
    resultCount.value = response.meta.total;
    showedCount.value = 0;

    const resultFiltered = resultData.filter((item: any) => {
        if (showedCount.value < props.itemsCount) {
            showedCount.value += 1;
            const regularExprForSearchString = new RegExp(
                searchAutocompleteKeyword.value,
                "gi"
            );

            if (item.name) {
                item.name = item.name.replace(regularExprForSearchString, '<strong class="text-rose underline">$&</strong>' );
            }

            if (item.stock_code) {
                item.stock_code_label = item.stock_code.replace(regularExprForSearchString, '<strong class="text-rose underline">$&</strong>');
            }

            return item;
        }
    });

    searchResult.value = resultFiltered;

    if (wasWatchUsed.value && !resultCount.value) {
        emptyResult.value = true;
    }
}

watch(searchAutocompleteKeyword, (newSearchAutocompleteKeyword) => {
    emptyResult.value = false;

    if (newSearchAutocompleteKeyword) {
        wasWatchUsed.value = true;
        assignResult();
    } else {
        searchResult.value = [];
    }
});

const clearSearch = () => {
    setTimeout(() => {
        searchAutocompleteKeyword.value = "";
        searchResult.value = [];
        inputFocused.value = false;
        resultCount.value = 0;
    }, 200);

};
</script>
