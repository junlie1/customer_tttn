import axios from "axios"

export const busService = {
    getBusById: async (busId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/buses/${busId}`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
}