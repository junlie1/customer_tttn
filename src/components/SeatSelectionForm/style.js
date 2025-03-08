import styled from 'styled-components';

// Khung chứa toàn bộ component
export const Container = styled.div`
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 20px;
  box-sizing: border-box;
`;

// Khung chứa legend (chú thích trạng thái ghế)
export const LegendContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 20px;
`;

// Mỗi legend item
export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// Hình vuông mô phỏng ghế trong legend
export const LegendSeat = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  border: 2px solid #ccc;
  background-color: ${({ bgColor }) => bgColor || '#fff'};
`;

// Container chứa các ghế (mỗi tầng)
export const SeatContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 60px);
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
`;

// Ghế chung (sẽ quyết định màu nền, con trỏ dựa trên prop status)
export const Seat = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  text-align: center;
  line-height: 46px; /* để text (seatNumber) nằm giữa theo chiều dọc */
  border: 2px solid #ccc;
  font-weight: bold;
  cursor: ${({ status }) => (status === 'sold' ? 'not-allowed' : 'pointer')};

  background-color: ${({ status }) => {
    if (status === 'sold') return '#ccc';      // ghế đã bán
    if (status === 'selected') return '#58afff'; // ghế đang chọn
    return '#fff';                            // ghế còn trống
  }};
`;

// Tiêu đề tầng (tầng dưới / tầng trên)
export const FloorTitle = styled.h5`
  text-align: center;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const PaymentActionsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between; /* Đẩy các phần tử con sang 2 bên */
  align-items: center;
`;

export const PaymentButton = styled.button`
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 25px; /* bo tròn góc để tạo dạng pill */
  padding: 8px 20px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #e64a19;
  }

  /* Tùy chọn thêm hiệu ứng đổ bóng, nếu muốn */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

