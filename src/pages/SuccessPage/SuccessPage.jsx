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
  const orderId = "833883794"; 

  return (
    <SuccessContainer>
      <SuccessCard>
        <SuccessIcon>✔</SuccessIcon>
        <SuccessTitle>Thanh toán thành công</SuccessTitle>
        <SuccessText>
          Mã số đơn hàng của bạn là <OrderNumber>{orderId}</OrderNumber>.
        </SuccessText>
        <SuccessText>
          Bạn có thể xem chi tiết trong{" "}
          <OrderLink href="#">đơn hàng của tôi</OrderLink>.
        </SuccessText>
        <SuccessText>Thời gian dự kiến giao hàng là...</SuccessText>

        <ContinueButton onClick={() => navigate("/")}>
          Trang chủ
        </ContinueButton>
      </SuccessCard>
    </SuccessContainer>
  );
};

export default SuccessPage;
