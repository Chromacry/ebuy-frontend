import {getUserInfoFromLocalStorage } from "../utils/LocalStorageUntil";
const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

class APIService {
    async request(endpoint, method, body = null) {
        const requestOptions = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'token': getUserInfoFromLocalStorage()?.accessToken || "accessToken"
            },
            body: body ? JSON.stringify(body) : null,
        }
        try {
            const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
            // if (!response.ok) {
            //     throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
            // }
            
            const responseData = await response.json();
            // console.log(responseData)
            return responseData;
        } catch (error) {
            return error;
        }
    }

    get(endpoint) {
        return this.request(endpoint, 'GET');
    }

    post(endpoint, body) {
        return this.request(endpoint, 'POST', body);
    }

    put(endpoint, body) {
        return this.request(endpoint, 'PUT', body);
    }

    delete(endpoint) {
        return this.request(endpoint, 'DELETE');
    }
}

export default APIService;
