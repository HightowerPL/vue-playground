<template>
    <input type="radio" :name="item.query_key" :value="item.id" :id="`${item.query_key} - ${item.id}`" class="hidden" :checked="item.is_checked"/>
    <label :for="`${item.query_key} - ${item.id}`"
        class="flex justify-between items-center cursor-pointer hover:text-lightBlue duration-300 py-1"
        :class="[item.is_open ? 'font-bold' : '']"
        @click="inputClick(item, parent)"
    >
        {{ item.name }}
        <OhVueIcon
            name="fa-chevron-down"
            class="min-w-4 w-4 h-2 ml-auto max-lg:mr-2 stroke-2 stroke-lightBlue origin-center transition-transform scale-75 duration-300"
            :class="item.is_open ? 'rotate-180' : ''"
        />
    </label>
    <SlideUpDown :active="item.is_open">
        <ul class="pl-3 overflow-y-auto">
            <li v-for="subitem in item.subitems" class="grid">

                <FiltersCategoryDropdown
                    v-if="subitem.subitems"
                    :item="subitem"
                    :parent="item"
                    @change="inputClick"
                />

                <template v-else>
                    <input
                        type="radio"
                        :name="subitem.query_key"
                        :value="subitem.id"
                        :id="`${subitem.query_key} - ${subitem.id}`"
                        class="hidden"
                        :checked="subitem.is_checked"
                    />
                    <label
                        :for="`${subitem.query_key} - ${subitem.id}`"
                        class="cursor-pointer hover:text-lightBlue duration-300 py-1"
                        :class="[subitem.is_checked ? 'font-bold' : '']"
                        @click="emit('change', subitem, item)"
                    >
                        {{ subitem.name }}
                    </label>
                </template>
            </li>
        </ul>
    </SlideUpDown>
</template>

<script setup lang="ts">
import { OhVueIcon } from 'oh-vue-icons';
import FiltersCategoryDropdown from '@/src/components/cards/FiltersCategoryDropdown.vue';

const props = defineProps<{
    item: Object;
    parent: Object
}>();

const emit = defineEmits<{
    (e: 'change', item: Object, parent: object): void;
}>();

const inputClick = (item: Object, parent: object) => {
    emit('change', item, parent);
};

</script>