// src/services/AuthServices.js
import axios from "./ConfigAxios";

const endpoint = process.env.REACT_APP_ENDPOINT_CLASSES;
const ClassesServices = {
    getClasses: async () => {
        try {
            const response = await axios.get(endpoint);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    getClassById: async (class_id) => {
        try {
            const response = await axios.get(endpoint, {
                params: { class_id }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    getClassByTeacherId: async () => {
        try {
            const response = await axios.get(`${endpoint}/teacher`);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};

export default ClassesServices;
