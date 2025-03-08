import axios from "axios";
import auth from "../config/firebase";

const api = process.env.REACT_APP_API_URL_BACKEND;

export const schedulesService = {
    getSchedules: async () => {
        try {
            const response = await axios.get(`${api}/schedules`);
            return response.data;
        } catch (error) {
            console.error("Lỗi api", error);
        }
    },
    getScheduleById: async () => {
        try {
            const response = await axios.get(`${api}/schedules/:scheduleId`);
            return response.data;
        } catch (error) {
            console.error("Lỗi api", error);
        }
    }
}