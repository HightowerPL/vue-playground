<template>
    <div class="container-fluid">
        <div class="product-grid py-8 xl:pt-10">
            <div class="filters bg-green min-h-[400px] ">
                
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
                <template v-if="products.length > 0">
                    <ProductCard v-for="product in products" :key="product.id" :product="product" />
                </template>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiGetProducts } from '../../api/products.js'
import ProductCard from '../../components/cards/ProductCard.vue'

const products = ref([])

onMounted(async () => {
    getProducts()
})

const getProducts = () => {
    apiGetProducts()
        .then((response: object) => {
            products.value = response.data
        })
}


</script>

<style scoped lang="scss">
.product-grid {
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
    gap: 1rem;

    @media (min-width: 1280px) {
        grid-template-columns: 23.64% auto;
        gap: 36px;
    }
}
</style>