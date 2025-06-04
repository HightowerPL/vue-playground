import inst from './api.config.ts';

const apiGetCats = () => {
    return inst.request({
        method: 'get',
        url: `https://api.thecatapi.com/v1/images/search?limit=10`,
    })
}

export default apiGetCats;