import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8080/digitbank'
axios.defaults.headers.post["Content-type"] = 'application/json'

export const getAuthToken = () => {
    const token = window.localStorage.getItem('accessToken');
    console.log("Token:", token); // Add this line for debugging
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
