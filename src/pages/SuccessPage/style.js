import styled from "styled-components";

// Toàn bộ trang Success
export const SuccessContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f6ff;
`;

// Hộp thông báo thanh toán thành công
export const SuccessCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  width: 340px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Icon thành công
export const SuccessIcon = styled.div`
  font-size: 50px;
  color: #28a745;
  margin-bottom: 15px;
`;

// Tiêu đề chính
export const SuccessTitle = styled.h2`
  color: #333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

// Văn bản mô tả
export const SuccessText = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;

// Mã đơn hàng (màu xanh lá)
export const OrderNumber = styled.span`
  font-weight: bold;
  color: #28a745;
  font-size: 16px;
`;

// Link "Đơn hàng của tôi"
export const OrderLink = styled.a`
  color: #0078d7;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Nút tiếp tục mua hàng
export const ContinueButton = styled.button`
  background: #0078d7;
  color: white;
  border: none;
  padding: 12px 18px;
  font-size: 14px;
  border-radius: 6px;
  margin-top: 15px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-weight: bold;

  &:hover {
    background: #005bb5;
    transform: scale(1.05);
  }
`;
