<template>
    <div class="bg-white shadow-sm shadow-grey rounded-xl px-7 py-6 transition-opacity duration-300
            max-lg:grid md:max-lg:grid-cols-3"
        :class="[isFiltering ? 'opacity-50 pointer-events-none' : '']">

        <div class="flex justify-between items-center mb-6">
            <h3 class="text-lightBlack font-bold text-lg  max-lg:col-span-2 md:max-lg:col-span-3">Refine</h3>

            <button type="button" @click="clearFilters">
                <span class="hidden md:inline-block text-sm text-lightBlack opacity-50 font-bold hover:opacity-100">Clear all</span>
            </button>
        </div>

        <template v-for="(filter, index) in filters">
            <div v-if="filter.type === 'list'" :key="'if-' + index">
                <hr>
                <button
                    class="flex justify-between items-center w-full font-bold py-4 hover:text-lightBlue duration-300"
                    type="button"
                    @click="filter.is_open = !filter.is_open"
                >
                    {{ filter.name }}
                    <chevronIcon
                        class="w-4 h-2 ml-3 max-lg:mr-2 stroke-2 stroke-lightBlue origin-center transition-transform duration-300"
                        :class="filter.is_open ? 'rotate-180' : ''"
                    />
                </button>
                <SlideUpDown :active="filter.is_open">
                    <ul class="pb-4">
                        <li
                            v-for="(item, itemIndex) in filter.values"
                            :key="filter.name + '-val-' + itemIndex"
                            class="text-sm transition duration-300 pl-3"
                        >
                            <FiltersCategoryDropdown
                                v-if="item.subitems"
                                :item="item"
                                :parent="filter"
                                @change="checkItem"
                            />

                            <template v-else>
                                <input
                                    type="radio"
                                    :name="filter.query_key"
                                    :value="item.id"
                                    :id="`${filter.query_key} - ${item.id}`"
                                    class="hidden"
                                    :checked="item.is_checked"
                                />
                                <label
                                    :for="`${filter.query_key} - ${item.id}`"
                                    class="cursor-pointer hover:text-lightBlue duration-300 py-1"
                                    :class="[item.is_checked ? 'font-bold' : '']"
                                    @click="() => checkItem(item, filter)"
                                >
                                    {{ item.name }}
                                </label>
                            </template>

                        </li>
                    </ul>
                </SlideUpDown>
            </div>

            <div v-else-if="filter.type === 'multiple-select'" :key="'else-if-' + index">
                <hr class="mb-4">
                <button
                    class="flex justify-between w-full items-center font-bold mb-4 stroke-lightBlue hover:text-lightBlue duration-300 "
                    type="button"
                    @click="filter.is_open = !filter.is_open"
                >
                    {{ filter.name }}
                    <OhVueIcon
                        name="fa-chevron-down"
                        class="w-4 h-2 ml-3 max-lg:mr-2 stroke-2 origin-center transition-transform duration-300"
                        :class="filter.is_open ? 'rotate-180' : ''"
                    />
                </button>
                <SlideUpDown :active="filter.is_open">
                    <ul class="pb-4">
                        <li
                            v-for="(item, itemIndex) in filter.values"
                            :key="filter.name + '-val-' + itemIndex"
                            class="text-sm transition duration-300 hover:text-lightBlue duration-300  py-1 pl-3 flex"
                        >
                            <Checkbox
                                :name="filter.query_key"
                                :value="item.id"
                                :id="`${filter.query_key} - ${item.id}`"
                                :checked="item.is_checked"
                                small
                                :item="item"
                                :filter="filter"
                                @change="checkItem(item)"
                            >
                                {{ item.name }}
                            </Checkbox>
                        </li>
                    </ul>
                </SlideUpDown>
            </div>

            <div
                v-else-if="filter.type === 'switch'"
                class="hover:text-lightBlue duration-300 cursor-pointer"
                @click="checkItem(filter)"
                :key="'else-' + index"
            >
                <p class="inline-flex items-center font-bold mb-4 mr-2">
                    {{ filter.name }}
                </p>
                <Toggle
                    v-model="filter.is_checked"
                    :name="filter.query_key"
                    class="toggle-green hover-outline-none text-black pointer-events-none"
                    :trueValue="true"
                    :falseValue="false"
                >
                </Toggle>
            </div>

        </template>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Toggle from '@vueform/toggle';
import { OhVueIcon } from 'oh-vue-icons';
import Checkbox from '@/src/components/fields/Checkbox.vue';
import FiltersCategoryDropdown from '@/src/components/cards/FiltersCategoryDropdown.vue';

const props = defineProps({
    data: {
        type: Array,
        required: true,
    },
});

const isFiltering = ref(false);
const filters = ref([]);

onMounted(() => { filters.value = setFilters(); });
watch(() => props.data, () => { filters.value = setFilters(); });

const emit = defineEmits<{(e: 'update', filters: object): void;}>()

const setSubitems = (item: object) => {
    item.subitems = item.subitems.map((subitem: object) => {
        subitem.is_open = subitem.is_checked;
        if (subitem.subitems) {
            setSubitems(subitem);
        }
        return subitem;
    });
};

const setFilters = () => {
    let newFilters = props.data.map((filter, index) => {
        if (filters.value.find(item => item.query_key === filter.query_key)) {
            filter.is_open = filters.value.find(item => item.query_key === filter.query_key)?.is_open;
        } else if (index == 0) {
            filter.is_open = true;
        } else {
            filter.is_open = false;
        }
        

        if (filter.query_key.includes('category_')) {
            filter.values = filter.values.map(item => {
                item.is_open = item.is_checked;

                if (item.subitems) {
                    setSubitems(item)
                }

                return item;
            });
        }
        return filter;
    });
    return newFilters;
};

const checkItem = (item: object, filter: object) => {
    item.is_checked = !item.is_checked;
    filter ? uncheckSiblings(item, filter) : void 0;
    (item.hasOwnProperty('subitems') && !item.is_checked) ? uncheckSubitems(item) : void 0;
    emit('update', collectCheckedFilters());
};

const uncheckSiblings = (item: object, filter: object) => {
    const subName = filter.hasOwnProperty('values') ? 'values' : 'subitems';

    if (filter[subName].length > 1) {
        filter[subName].forEach(subitem => {
            if (subitem.id !== item.id) {
                subitem.is_checked = false;
                subitem.hasOwnProperty('subitems') ? uncheckSubitems(subitem) : void 0;
            }
        });
    }
}

const uncheckSubitems = (item: object) => {
    item.subitems.forEach(subitem => {
        subitem.is_checked = false;

        if (subitem.hasOwnProperty('subitems')) {
            uncheckSubitems(subitem);
        }
    });
};

const collectCheckedFilters = () => {
    let data = {};

    filters.value.forEach(filter => {
        filter.values.forEach(item => {

            if (filter.type === 'multiple-select') {

                if (item.is_checked) {
                    if (data[filter.query_key]) {
                        data[filter.query_key] += ',' + item.id;
                    } else {
                        data[filter.query_key] = item.id;
                    }
                }

            } else {
                if (item.is_checked) {
                    data[filter.query_key] = item.id;
                }

                if (item.subitems) {
                    data = gatherSubitems(item, data);
                }
            }
        });
    })
    return data
}

const gatherSubitems = (item: object, data: object) => {
    item.subitems.forEach(subitem => {
        if (subitem.is_checked) {
            data[subitem.query_key] = subitem.id;
        }

        if (subitem.subitems) {
            data = gatherSubitems(subitem, data);
        }
    });
    return data;
}

const clearFilters = () => {
    emit('update', {});
}
</script>