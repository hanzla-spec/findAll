import Axios from '../services/axiosService';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const loginService = {
    loginUser: async (payload) => {
        return await Axios.post(`api/v1/auth/login`, payload);
    },

    isUserLogin: () => {
        if (localStorage.getItem("JWT")) {
            try {
                const token = JSON.parse(localStorage.getItem("JWT")).access_token;
                const refresh_token = JSON.parse(localStorage.getItem("JWT")).refresh_token;
                if (token) {
                    const jwtDecoded = jwtDecode(refresh_token);
                    if (Date.now() > jwtDecoded.exp * 1000) {
                        return false;
                    }
                } else {
                    return false;
                }
            } catch (ex) {
                console.log('Error in parsing JWT');
                return false;
            }
        } else {
            return false;
        }
        return true;
    },

    refreshToken: async () => {
        const baseURL = 'http://localhost:8080';
        const header = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'ReAuthorization': `Bearer ${JSON.parse(localStorage.getItem("JWT")).refresh_token}`
        }

        return await axios.post(`${baseURL}/api/v1/auth/refresh-token`, null, { headers: header })
    },

    registerUser: async (payload) => {
        return await Axios.post(`api/v1/auth/register`, payload);
    },

    getUserIdByUsername: async (username) => {
        return await Axios.get(`private/v1/auth/getId/${username}`);
    }
}


export default loginService;