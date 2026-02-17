<template>
    <article class="product-card bg-lightBlack p-6 pb-8 flex flex-col items-start gap-4 text-white text-left">
        <picture class="product-card__image vblock w-full relative aspect-square bg-white">
            <img
                class="absolute top-[5%] left-[5%] w-[90%] h-[90%] object-contain object-center"
                :src="product.image"
                :alt="product.name"
            >
        </picture>
        <div class="grow h-full">
            <h2 class="product-card__title text-lg mb-2 min-h-72 text-green">{{ product.title }}</h2>
            <p class="product-card__short text-sm line-clamp-5 trim-3 text-3-lines">{{ product.description }}</p>
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

<style lang="scss">
.product-card {
    background-color: var(--color-light-black);
    color: var(--color-white);
    transition: background-color .3s ease;
    &:hover {
        background-color: var(--color-green-light);
    }
    .light-theme & {
        background-color: var(--color-white);
        color: var(--color-main);

        &:hover {
            background-color: var(--color-green-light);
        }
    }
}
</style>