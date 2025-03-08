import styled from 'styled-components';

// Khung bao quanh toàn bộ trang thanh toán
export const PaymentContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(to bottom, #fff, #f8f9fa);
  padding: 30px 0;
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

// Khung chính, chia làm 2 cột
export const PaymentWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 20px;
`;

// Cột bên trái
export const PaymentLeft = styled.div`
  flex: 2;
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

// Cột bên phải
export const PaymentRight = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
`;

// Mỗi khu vực (form khách hàng, thông tin vé)
export const Section = styled.div`
  margin-bottom: 20px;
`;

// Tiêu đề của từng khu vực
export const SectionTitle = styled.h3`
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
  font-weight: bold;
`;

// Form khách hàng
export const CustomerForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// Nhóm label - input
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

// Label chung
export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
`;

// Dấu * màu đỏ
export const RequiredStar = styled.span`
  color: red;
  font-weight: bold;
  margin-left: 3px;
`;

// Chú thích cho các trường bắt buộc
export const Note = styled.p`
  font-size: 14px;
  color: red;
  margin-top: 5px;
`;

// Input chung
export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: all 0.3s ease-in-out;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff5722;
    box-shadow: 0px 0px 8px rgba(255, 87, 34, 0.5);
  }
`;

// Khu vực hiển thị chi tiết vé
export const BookingInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// Mỗi hàng thông tin
export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: rgba(255, 87, 34, 0.1);
    padding: 12px 10px;
    border-radius: 6px;
  }
`;

// Label trong hàng
export const InfoLabel = styled.span`
  color: #666;
  font-weight: bold;
`;

// Giá trị trong hàng
export const InfoValue = styled.span`
  color: #333;
  font-size: 16px;
`;

// Nút thanh toán
export const PayButton = styled.button`
  width: 100%;
  padding: 14px 0;
  background: linear-gradient(45deg, #ff5722, #ff784e);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 18px;
  margin-top: 20px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0px 4px 10px rgba(255, 87, 34, 0.3);

  &:hover {
    background: linear-gradient(45deg, #e64a19, #ff6e40);
    transform: scale(1.05);
    box-shadow: 0px 6px 12px rgba(255, 87, 34, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
`;

// Thông báo lỗi
export const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
  font-weight: bold;
`;

// Lưới ghế
export const SeatLayout = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 45px);
  gap: 10px;
`;

// Từng ghế
export const Seat = styled.div`
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 6px;
  background-color: ${({ isSelected }) => (isSelected ? '#ff5722' : '#fff')};
  color: ${({ isSelected }) => (isSelected ? '#fff' : '#333')};
  border: 2px solid #ddd;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff5722;
    color: #fff;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;
