<template>
    <div v-if="virtualScroll && data.length > virtualScrollThreshold" class="virtual-scroll-container">
        <!-- Virtual scrolling enabled for large datasets -->
        <table class="table">
            <thead class="table__head" ref="tableHead">
                <tr>
                    <th
                        v-for="(column, index) in columns"
                        :key="index"
                        class="table__th"
                    >
                        {{ column.name }}
                    </th>
                </tr>
            </thead>
        </table>

        <div
            class="virtual-scroll-body"
            :style="{ height: containerHeight }"
            @scroll="handleScroll"
            ref="scrollContainer"
        >
            <div :style="{ height: `${totalHeight}px`, position: 'relative' }">
                <table class="table" :style="{ transform: `translateY(${offsetY}px)` }">
                    <tbody class="table__body">
                        <tr
                            v-for="(row, index) in visibleRows"
                            :key="startIndex + index"
                            class="table__tr"
                        >
                            <td v-for="(column, colIndex) in columns" :key="colIndex" class="table__td">
                                <button
                                    v-if="column.field === 'actions'"
                                    class="text-blue-500 p-2 rounded bg-green hover:bg-rose"
                                    @click="editPlayer(row.id)"
                                >
                                    <OhVueIcon :name="'io-pencil-sharp'" />
                                </button>
                                <span v-else>
                                    {{ row[column.field] }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Standard rendering for small datasets -->
    <table v-else class="table">
        <thead class="table__head">
            <tr>
                <th
                    v-for="(column, index) in columns"
                    :key="index"
                    class="table__th"
                >
                    {{ column.name }}
                </th>
            </tr>
        </thead>
        <tbody class="table__body">
            <tr v-for="(row, rowIndex) in data" :key="rowIndex" class="table__tr">
                <td v-for="(column, colIndex) in columns" :key="colIndex" class="table__td">

                    <button v-if="column.field === 'actions'" class="text-blue-500 p-2 rounded bg-green hover:bg-rose" @click="editPlayer(row.id)">
                        <OhVueIcon :name="'io-pencil-sharp'" />
                    </button>
                    <span v-else>
                        {{ row[column.field] }}
                    </span>
                </td>

            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { OhVueIcon } from 'oh-vue-icons';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = withDefaults(defineProps<{
    columns: Array<{ name: string; field: string; sortable?: boolean }>;
    data: Array<Record<string, any>>;
    virtualScroll?: boolean;
    virtualScrollThreshold?: number;
    rowHeight?: number;
    containerHeight?: string;
}>(), {
    virtualScroll: true,
    virtualScrollThreshold: 50, // Enable virtual scroll for datasets > 50 rows
    rowHeight: 60, // Estimated row height in pixels
    containerHeight: '500px'
});

// Virtual scrolling state
const scrollContainer = ref<HTMLElement | null>(null);
const scrollTop = ref(0);

// Computed properties for virtual scrolling with memoization
const totalHeight = computed(() => props.data.length * props.rowHeight);

const startIndex = computed(() => {
    return Math.floor(scrollTop.value / props.rowHeight);
});

const visibleRowCount = computed(() => {
    const height = parseInt(props.containerHeight);
    return Math.ceil(height / props.rowHeight) + 1; // +1 for smooth scrolling
});

const endIndex = computed(() => {
    return Math.min(startIndex.value + visibleRowCount.value, props.data.length);
});

const visibleRows = computed(() => {
    return props.data.slice(startIndex.value, endIndex.value);
});

const offsetY = computed(() => {
    return startIndex.value * props.rowHeight;
});

// Virtual scroll handler
const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    scrollTop.value = target.scrollTop;
};

const editPlayer = (id: number) => {
    router.push({ name: 'PlayerEdit', params: { id } });
    console.log('Edit player clicked');
};

onMounted(() => {
    console.log('DataTable mounted with props:', props);
    console.log('Virtual scrolling enabled:', props.virtualScroll && props.data.length > props.virtualScrollThreshold);
});

</script>

<style scoped lang="scss">
.virtual-scroll-container {
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.virtual-scroll-body {
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;

    /* Smooth scrolling */
    scroll-behavior: smooth;

    /* Custom scrollbar styling */
    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: var(--color-black-light, #2d3748);
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-green, #14B8A6);
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background: var(--color-green-dark, #0d9488);
    }
}

.virtual-scroll-body table {
    width: 100%;
}
</style>