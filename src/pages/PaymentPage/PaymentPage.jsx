import React, { useEffect, useState } from "react";
import {
  PaymentContainer,
  PaymentWrapper,
  PaymentLeft,
  PaymentRight,
  Section,
  SectionTitle,
  CustomerForm,
  FormGroup,
  Label,
  Input,
  BookingInfo,
  InfoRow,
  InfoLabel,
  InfoValue,
  PayButton,
  RequiredStar,
  Note,
  ErrorMessage,
} from "./style";
import { useLocation, useNavigate } from "react-router-dom";
import { createPayment } from "../../services/paymentService";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import CustomToast from "../../components/CustomToast/CustomToast";

const PaymentPage = () => {
  const location = useLocation();
  const paymentData = location.state;
  console.log('paymentData',paymentData);
  
  const user = useSelector((state) => state.user.user);
  const [userName, setUserName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phone || "");
  const [error, setError] = useState({ userName: "", phoneNumber: "" });
  const navigate = useNavigate();

  const validateName = (name) => {
    if (!name.trim()) return "Họ tên không được để trống";
    if (!/^[A-Za-zÀ-ỹ\s]+$/.test(name))
      return "Họ tên chỉ được chứa chữ cái và khoảng trắng";
    return "";
  };

  const validatePhoneNumber = (phone) => {
    if (!phone.trim()) return "Số điện thoại không được để trống.";
    if (!/^\d{10,11}$/.test(phone))
      return "Số điện thoại phải có 10-11 chữ số.";
    return "";
  };

  useEffect(() => {
    if (user) {
      setUserName(user.name || "");
      setPhoneNumber(user.phone || "");
    }
  }, [user]); 
  

  const handleChange = (setter, validator, fieldName, value) => {
    setter(value);
    setError((prevErrors) => ({
      ...prevErrors,
      [fieldName]: validator(value),
    }));
  };

  const handleConfirm = () => {
    navigate("/login");
  };

  const showCustomToast = () => {
    toast(
      <CustomToast
        text={"Bạn chưa đăng nhập, vui lòng đăng nhập để thanh toán!"}
        onConfirm={() => handleConfirm()}
      />,
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        theme: "colored",
      }
    );
  };

  const handlePayment = async () => {
    const nameError = validateName(userName);
    const phoneError = validatePhoneNumber(phoneNumber);
    if (nameError || phoneError) {
      setError({ userName: nameError, phoneNumber: phoneError });
      return;
    }
    if (!user) {
      showCustomToast();
      return;
    }
    const updatedPaymentData = {
      ...paymentData,
      userData: {
          ...paymentData.userData,
          name: userName,
          phoneNumber: phoneNumber,  
      }
  };
  console.log('updatedPaymentData',updatedPaymentData);
  
    try {
      const userInfo = { userName, phoneNumber };
      const paymentUrl = await createPayment(updatedPaymentData, userInfo);
      window.location.href = paymentUrl;
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Thanh toán thất bại: " + error.message);
    }
  };

  return (
    <PaymentContainer>
      <ToastContainer />
      <PaymentWrapper>
        <PaymentLeft>
          <Section>
            <SectionTitle>Thông tin khách hàng</SectionTitle>
            <Note>
              Các trường có dấu <RequiredStar>*</RequiredStar> là bắt buộc.
            </Note>
            <CustomerForm>
              <FormGroup>
                <Label>
                  Họ tên <RequiredStar>*</RequiredStar>
                </Label>
                <Input
                  type="text"
                  value={userName}
                  onChange={(e) =>
                    handleChange(setUserName, validateName, "userName", e.target.value)
                  }
                  placeholder="Nhập họ tên..."
                />
                {error.userName && <ErrorMessage>{error.userName}</ErrorMessage>}
              </FormGroup>
              <FormGroup>
                <Label>
                  Số điện thoại <RequiredStar>*</RequiredStar>
                </Label>
                <Input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) =>
                    handleChange(setPhoneNumber, validatePhoneNumber, "phoneNumber", e.target.value)
                  }
                  placeholder="Nhập số điện thoại..."
                />
                {error.phoneNumber && <ErrorMessage>{error.phoneNumber}</ErrorMessage>}
              </FormGroup>
            </CustomerForm>
          </Section>
        </PaymentLeft>

        <PaymentRight>
          <Section>
            <SectionTitle>Thông tin đặt vé</SectionTitle>
            <BookingInfo>
              <InfoRow>
                <InfoLabel>Tuyến:</InfoLabel>
                <InfoValue>{paymentData.routeName}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Giờ đi:</InfoLabel>
                <InfoValue>
                  {new Date(paymentData.selectedSchedule.departureTime).toLocaleTimeString(
                    "vi-VN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                      timeZone: "Asia/Ho_Chi_Minh",
                    }
                  )}
                </InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Ghế đã chọn:</InfoLabel>
                <InfoValue>{paymentData.selectedSeats.join(", ")}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Giá vé (1 ghế):</InfoLabel>
                <InfoValue>{paymentData.routePrice} VNĐ</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Tổng tiền:</InfoLabel>
                <InfoValue style={{ fontWeight: "bold", color: "#ff5722" }}>
                  {paymentData.totalPrice}
                </InfoValue>
              </InfoRow>
            </BookingInfo>
            <PayButton onClick={handlePayment}>Thanh toán</PayButton>
          </Section>
        </PaymentRight>
      </PaymentWrapper>
    </PaymentContainer>
  );
};

export default PaymentPage;
