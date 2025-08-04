import axios from "axios"

export const seatLayoutService = {
    getSeatLayoutById: async (seatLayoutId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/seat-layout/${seatLayoutId}`);
            return response.data;
        } catch (error) {
            console.error("Error:", error);
        }
    }
}