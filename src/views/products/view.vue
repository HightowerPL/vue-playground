<template>
    <div class="container">
        <div class="product-grid py-8 xl:pt-10">
            <div class="filters">
                Here will be filters
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                <template v-if="products.length > 0">
                    <productCard v-for="product in products" :key="product.id" :product="product" />
                </template>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiGetProducts } from '../../api/products.js'
import productCard from '../../components/cards/productCard.vue'


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
    }
}
</style>