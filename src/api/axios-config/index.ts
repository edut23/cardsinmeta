import axios from "axios";

import { responseInterceptor, errorInterceptor } from "./interceptor";

const Api = axios.create({
    baseURL: "https://cards-marketplace-api.onrender.com/"
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error),
);

export {Api}