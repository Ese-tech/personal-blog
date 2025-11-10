import axios from 'axios';

// Configure axios defaults
const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

console.log('Axios configured with baseURL:', baseURL);

export default axios;