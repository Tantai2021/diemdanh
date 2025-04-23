// src/services/AuthServices.js
import axios from "./ConfigAxios";

const endpoint = process.env.REACT_APP_ENDPOINT_AUTH;

const AuthServices = {
    login: async (email, password) => {
        try {
            // Gọi API đăng nhập với email và password
            console.log(email, password);

            const response = await axios.post(`${endpoint}/login`, { email, password });
            return response;
        } catch (error) {
            return error; // Ném lỗi để xử lý bên ngoài
        }
    },
};

export default AuthServices;
