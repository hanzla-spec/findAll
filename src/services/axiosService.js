import axios from 'axios';
import jwtDecode from 'jwt-decode';
import toast from 'react-hot-toast';
import loginService from './loginService';
import { FcInfo } from 'react-icons/fc';

const defaultOptions = {
    baseURL: 'http://localhost:8080/',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ReAuthorization': ''
    }
}

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
    async (request) => {
        if (request.url.includes('api/v1')) {
            return request;
        }
        else {
            if (!(request.headers.Authorization && request.headers.ReAuthorization)) {
                if (localStorage.getItem("JWT")) {
                    try {
                        let token = JSON.parse(localStorage.getItem("JWT")).access_token;
                        const jwtDecoded = jwtDecode(token);
                        if (Date.now() > jwtDecoded.exp * 1000) {
                            await loginService.refreshToken().then(
                                (res) => {
                                    const new_token = res.data.message;
                                    const jwt = JSON.parse(localStorage.getItem("JWT"));
                                    jwt.access_token = new_token;
                                    localStorage.setItem("JWT", JSON.stringify(jwt));
                                }, (err) => {
                                    if (request.url.includes('refresh-token')) {
                                        toast((t) => (
                                            <span style={{ fontSize: '1rem' }}><FcInfo />&nbsp;&nbsp;Your session is expired</span>
                                        ));
                                    }
                                    return;
                                }
                            ).catch((ex) => {
                                console.log('exception in generating new token');
                                return;
                            });
                            token = JSON.parse(localStorage.getItem("JWT")).access_token;
                        }
                        request.headers.Authorization = token ? `Bearer ${token}` : null;
                    } catch (ex) {
                        request.headers.Authorization = null;
                        return;
                    }
                }
                else {
                    request.headers.Authorization = null;
                    return;
                }
            }
        }

        return request;
    },
    (error) => Promise.reject(error)
);

export default instance;