import axios from "./ConfigAxios";
const endpoint = process.env.REACT_APP_ENDPOINT_STUDENT;
const Student = {
    getStudentNotInSesion: async (session_id) => {
        try {
            const response = await axios.get(`${endpoint}/not-in-session`, {
                params: { session_id }
            });
            return response?.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getAllStudents: async () => {
        try {
            const response = await axios.get(`${endpoint}/`);
            return response?.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    createBulkQrcode: async () => {
        try {
            const response = await axios.post(`${endpoint}/create-bulk-qrcode`);
            return response?.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    getQrcodeByUserId: async () => {
        try {
            const response = await axios.get(`${endpoint}/qr-code`);
            return response?.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};
export default Student;