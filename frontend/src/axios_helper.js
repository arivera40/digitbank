import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || 'http://35.226.140.244/digitbank';

axios.defaults.baseURL = baseURL;
axios.defaults.headers.post["Content-type"] = 'application/json';

export const getAuthToken = () => {
    const token = window.localStorage.getItem('accessToken');
    return token;
}

export const setAuthHeader = (token) => {
    if (token !== null) {
        window.localStorage.setItem("accessToken", token);
    } else {
        window.localStorage.removeItem("accessToken");
    }
}

export const request = (method, url, data) => {
    
    let headers = {};
    const token = getAuthToken(); // Call getAuthToken function to retrieve the token
    if (token !== null && token !== "null" && token !== "undefined") {
        headers = {'Authorization': `Bearer ${token}`} // Call the function and use its return value
    }
    
    return axios({
        method: method,
        url: url,
        headers: headers,
        data: data
    });
}
