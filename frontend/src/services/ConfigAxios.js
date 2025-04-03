// src/utils/axios.js
import axios from 'axios';

// Cấu hình axios với base URL
const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL, // Thay đổi base URL theo API của bạn
    timeout: 10000,  // Thời gian timeout của request (10s)
    headers: {
        'Content-Type': 'application/json', // Đặt header mặc định cho request
    },
});
// Interceptors để thêm token hoặc xử lý các lỗi toàn cục
instance.interceptors.request.use(
    (config) => {
        // Giả sử bạn có token trong localStorage
        const token = sessionStorage.getItem('userToken');
        if (token) {
            config.headers['authorization'] = `Bearer ${token}`; // Thêm token vào headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Xử lý lỗi toàn cục từ phản hồi của server
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Xử lý lỗi nếu có (ví dụ: kiểm tra nếu có lỗi mạng, hoặc thông báo lỗi)
        if (error.response) {
            console.error("Error response", error.response);
        } else if (error.request) {
            console.error("Error request", error.request);
        } else {
            console.error("Error", error.message);
        }
        return Promise.reject(error);
    }
);

export default instance;
