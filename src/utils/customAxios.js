import axios from "axios";
import url from '../common/urlConstant'

const axiosClient = axios.create({
    baseURL: url.base,
});

const sendAuthorizedRequest = async (url, method, data = null, config = {}) => {
    let accessToken = localStorage.getItem('token');
    const headers = {};

    headers['Authorization'] = `Bearer ${accessToken}`;

    try {
        const response = await axiosClient({
            method,
            url,
            headers: { ...headers, ...config.headers },
            data,
        });
        return response;
    } catch (error) {
        // Handle errors
        console.error("Error fetching data: ", error);
        // Clear data or perform other error handling as needed
        throw error;
    }
};



const axiosLocalHost = {
    sendAuthorizedRequest,
    normalRequest: axiosClient,    
};

export default axiosLocalHost;

