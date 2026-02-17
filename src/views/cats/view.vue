<template>
    <div class="py-8 xl:pt-10" id="scroll-area">
        <div class="container-sm mx-auto">
            <h2 class="mb-12 text-xl">Cats - Infinite List</h2>
            <div
                v-if="cats.length > 0"
                class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            >
                <motion.picture
                    :initial="{ opacity: 0, transform: 'translateY(100px)' }"
                    :whileInView="{ opacity: 1, transform: 'translateY(0)' }"
                    :inViewOptions="{ amount: .3, once: true}"
                    :whileHover="{scale: 1.1}"
                    v-for="(cat, index) in cats"
                    :key="cat.id"
                    :data-index="index"
                    class="relative block w-full pb-[150%] overflow-hidden rounded-xl opacity-50"
                >
                    <img
                        :src="cat.url"
                        alt="cat"
                        class="absolute top-0 left-0 w-full h-full object-cover"
                    >
                </motion.picture>

            </div>

            <div class="col-span-3 pt-10 text-center">
                <span class="loader" id="load-more-trigger"></span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { motion } from "motion-v";
// @ts-ignore
import apiGetCats from '../../api/cats.js';
import { ref, onMounted } from 'vue';

interface Cat {
    id: string;
    url: string;
    width?: number;
    height?: number;
}

const cats = ref<Cat[]>([]);

const setObserver = () => {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }

    const observer = new IntersectionObserver(() => {
        getCats();
    }, options);

    const trigger = document.querySelector('#load-more-trigger');
    if (trigger) observer.observe(trigger);
}
onMounted(() => {
    setTimeout(() => {
        setObserver();
    }, 2000);

});

const getCats = () => {
    apiGetCats()
        .then((response: any) => {
            if (cats.value.length === 0) {
                cats.value = response.data;
            } else {
                cats.value = cats.value.concat(response.data);
            }
        })
}



</script>

<style scoped lang="scss">

</style>