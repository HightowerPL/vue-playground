import inst from './api.config.ts';

const apiGetCategories = () => {
    return inst.request({
        method: 'get',
        url: 'https://fakestoreapi.com/products/categories',
    })
}

const apiGetProducts = (limit = 9) => {
    return inst.request({
        method: 'get',
        url: `https://fakestoreapi.com/products?limit=${limit}`,
    })
}

const apiGetProductsSort = (sort = 'asc') => {
    return inst.request({
        method: 'get',
        url: `https://fakestoreapi.com/products?sort=${sort}`,
    })
}

const apiGetSingleProduct = (id) => {
    return inst.request({
        method: 'get',
        url: `https://fakestoreapi.com/products/${id}`,
    })
}

export { 
    apiGetCategories,
    apiGetProducts,
    apiGetProductsSort,
    apiGetSingleProduct
};