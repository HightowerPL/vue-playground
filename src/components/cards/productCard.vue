<template>
    <article class="bg-white p-4 shadow-md flex flex-col items-start gap-4 text-black text-left">
        <picture class="block w-full relative aspect-square">
            <img
                class="absolute top-0 left-0 w-full h-full object-contain"
                :src="product.image"
                :alt="product.name"
            >
        </picture>
        <div class="grow h-full">
            <h2 class="text-lg mb-2 min-h-72">{{ product.title }}</h2>
            <p class="text-sm">{{ product.description }}</p>
        </div>

        <div class="flex w-full flex-nowrap items-center justify-between">
            <span class="inline-block text-xs py-2 px-3 capitalize border rounded-3xl">{{ product.category  }}</span>
            <p class="font-bold">{{ product.price }} PLN</p>
        </div>

    </article>
</template>

<script setup lang="ts">
const props = defineProps<{
    product: Object
}>()

</script>