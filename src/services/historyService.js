import axios from "axios";


export const historyService = {
    getTicketByCustomerId: async (customerId) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL_BACKEND}/history/${customerId}`);
        return response.data;
    }
}