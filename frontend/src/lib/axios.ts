import axios from 'axios';

// Configure axios defaults
// In production on Vercel, use relative paths to the same domain
// In development, use localhost backend
const baseURL = process.env.NODE_ENV === 'production' 
  ? '/api'  // Same domain, relative path
  : 'http://localhost:5000/api';

axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;

console.log('Axios configured with baseURL:', baseURL);

export default axios;