import axios from "axios";
import auth from "../config/firebase";

const api = process.env.REACT_APP_API_URL_BACKEND;

export const routeService = {
    getRoutes: async () => {
        try {
            const response = await axios.get(`${api}/routes`);
            return response.data;
        } catch (error) {
            console.error('error',error);
        }
    },

    getRouteById: async (routeId) => {
        try {
            const response = await axios.get(  `${api}/routes/${routeId}`);
            return response.data;
        } catch (error) {
            console.error('error',error);
        }
    }
}