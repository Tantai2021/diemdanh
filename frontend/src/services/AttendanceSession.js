import axios from "./ConfigAxios";
const endpoint = process.env.REACT_APP_ENDPOINT_SESSIONS;
const AttendanceSession = {
    createAttendanceSession: async (class_id) => {
        try {
            const response = await axios.post(`${endpoint}/`, { class_id });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
export default AttendanceSession;