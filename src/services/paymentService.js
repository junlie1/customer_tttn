import axios from "axios";

const api = process.env.REACT_APP_API_URL_BACKEND;

export const createPayment = async (updatedPaymentData, userInfo) => {
  try {
    const orderId = Date.now().toString();
    const amount = updatedPaymentData.totalPrice;
    const orderInfo = `Thanh toán vé xe cho tuyến ${updatedPaymentData.routeName} - Họ tên: ${userInfo.userName}, SĐT: ${userInfo.phoneNumber}`;
    const response = await axios.post(`${api}/payment/create_payment_url`, { 
      orderId, 
      amount, 
      orderInfo,
      updatedPaymentData
    });
    
    return response.data.paymentUrl;
  } catch (error) {
    console.error("Payment Service error:", error);
    throw error;
  }
};
