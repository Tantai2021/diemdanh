import axios from "./ConfigAxios";
const endpoint = process.env.REACT_APP_ENDPOINT_RECORDS;

const AttendanceRecord = {
    getAttendanceRecordsByClassId: async (class_id) => {
        try {
            const response = await axios.get(`${endpoint}/classes`, {
                params: { class_id }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    bulkCreateAttendanceRecords: async (data) => {
        try {
            const response = await axios.post(`${endpoint}/`, data);
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    },
    bulkDeleteAttendanceRecords: async (record_ids) => {
        try {
            const response = await axios.delete(`${endpoint}/`, {
                data: { record_ids }
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return null;
        }
    }
};
export default AttendanceRecord;