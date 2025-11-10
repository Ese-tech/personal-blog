import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export default axios;