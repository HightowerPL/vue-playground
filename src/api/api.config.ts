import axios from 'axios';

export const inst = axios.create({
    // baseURL: import.meta.env.API_BASE_URL || '/',
    timeout: 240000, // Request timeout
});

export default inst;