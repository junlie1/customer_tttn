import React from "react";
import { useNavigate } from "react-router-dom";
import {
  SuccessContainer,
  SuccessCard,
  SuccessIcon,
  SuccessTitle,
  SuccessText,
  OrderNumber,
  OrderLink,
  ContinueButton,
} from "./style";

const SuccessPage = () => {
  const navigate = useNavigate();
  const orderId = "1744229936309"; 

  return (
    <SuccessContainer>
      <SuccessCard>
        <SuccessIcon>✔</SuccessIcon>
        <SuccessTitle>Thanh toán thành công</SuccessTitle>
        <SuccessText>
          Mã số vé của bạn là <OrderNumber>{orderId}</OrderNumber>.
        </SuccessText>
        <SuccessText>
          Bạn có thể xem chi tiết trong{" "}
          <OrderLink href="https://junwoan-gotta-go.vercel.app/history">Vé của tôi</OrderLink>.
        </SuccessText>
        <ContinueButton onClick={() => navigate("/")}>
          Trang chủ
        </ContinueButton>
      </SuccessCard>
    </SuccessContainer>
  );
};

export default SuccessPage;
