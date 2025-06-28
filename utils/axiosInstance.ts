import axios from "axios";
import Cookies from "js-cookie";
import {BASEURL} from "@/constants";


axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const axiosInstance = axios.create({
    baseURL: BASEURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to add bearer token from cookies
axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get("word-champ-token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default axiosInstance;
