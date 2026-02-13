<template>
    <div class="relative rounded overflow-hidden">

        <!-- <div class="absolute bottom-100 left-0">
           selectedPointId: {{selectedPointId}} ; isDragging: {{ isDragging }} ; dragOffset: {{ dragOffset }}
        </div> -->

        <iconCourt 
            id="court-icon"
            class="w-full h-auto bg-gray-700 cursor-pointer" 
            @click="handleCourtClick"
        />
        <div 
            v-for="point in props.points" 
            :key="point.id"
            class="absolute w-3 h-3 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            :class="{
                'bg-rose': selectedPointId !== point.id,
                'bg-white-100 ring-2 ring-rose': selectedPointId === point.id
            }"
            :style="{ left: point.position.x + 'px', top: point.position.y + 'px' }"
            @click.stop="selectPoint(point.id)"
            @mousedown="startDrag(point.id, $event)"
        ></div>
    </div>
</template>

<script setup lang="ts">
import iconCourt from '@/assets/court.svg';
import { ref, onMounted, onUnmounted } from 'vue';
import { Point } from '@/types/points.ts';

const props = defineProps<{
    points: Point[];
}>();


const emit = defineEmits<{
    newPoint: [point: Point];
    pointUpdate: [point: Point];
}>();

const selectedPointId = ref<string | null>(null);
const isDragging = ref(false);

const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

const selectPoint = (pointId: string) => {
    selectedPointId.value = selectedPointId.value === pointId ? null : pointId;
};

const handleCourtClick = (event: MouseEvent) => {
    if (isDragging.value) return;
    
    const courtElement = event.currentTarget as HTMLElement;
    const rect = courtElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newPoint: Point = { 
        id: generateId(),
        position: {
            x,
            y
        }
    };

    emit('newPoint', newPoint);
};

const startDrag = (pointId: string, event: MouseEvent) => {
    event.preventDefault();
    isDragging.value = true;
    selectedPointId.value = pointId;
};

const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

const handleMouseMove = (event: MouseEvent) => {
    if (!isDragging.value || !selectedPointId.value) return;
    
    const courtElement = document.querySelector('#court-icon') as HTMLElement;

    if (!courtElement) return;
    
    const rect = courtElement.getBoundingClientRect();
    const x =  event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const point = props.points.find(p => p.id === selectedPointId.value);
    const pointX = point?.x;
    const pointY = point?.y;

    const lerpX = lerp(pointX, x, 0.1);
    const lerpY = lerp(pointY, y, 0.1);

    if (point) {
        const updatedPoint: Point = {
            ...point,
            x: lerpX,
            y: lerpY
        };
                    emit('pointUpdate', updatedPoint);

    }
};

const handleMouseUp = () => {
    isDragging.value = false;
    selectedPointId.value = null;
};

onMounted(() => {
    const courtIcon = document.querySelector('#court-icon');

    if (courtIcon) {
        courtIcon.addEventListener('mousemove', handleMouseMove);
        courtIcon.addEventListener('mouseup', handleMouseUp);
    }
});

onUnmounted(() => {
    const courtIcon = document.querySelector('#court-icon');

    if (courtIcon) {
        courtIcon.removeEventListener('mousemove', handleMouseMove);
        courtIcon.removeEventListener('mouseup', handleMouseUp);
    }
});
</script>