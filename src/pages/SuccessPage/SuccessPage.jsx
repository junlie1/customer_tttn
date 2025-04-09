import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("orderId");
    setOrderId(id || "Không tìm thấy mã vé");
  }, [location.search]);

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
        <ContinueButton onClick={() => navigate("/")}>Trang chủ</ContinueButton>
      </SuccessCard>
    </SuccessContainer>
  );
};

export default SuccessPage;
