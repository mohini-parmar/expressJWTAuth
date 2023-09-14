import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user';

export const registerUser =(formData) =>{
    return axios.post(`${API_URL}/register`, formData);
}

export const loginUser = (formData) =>{
    return axios.post(`${API_URL}/login` , formData);
}