import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* Canh trái toàn bộ nội dung */
  padding: 20px;
  background-color: #f9f9f9;
  width: 100%; /* Chiếm toàn bộ chiều ngang */
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
`;

export const OrderList = styled.div`
  display: flex;
  flex-direction: column; /* Sắp xếp các đơn hàng theo chiều dọc */
  gap: 20px;
  width: 100%; /* Đảm bảo chiếm toàn bộ chiều ngang */
`;

export const OrderCard = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-start; /* Canh các nội dung trong card lên trên cùng */
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 80%; /* Giới hạn chiều rộng của mỗi card */
`;

export const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
`;

export const OrderInfo = styled.div`
  flex: 1; /* Đảm bảo phần thông tin chiếm phần còn lại */
  display: flex;
  flex-direction: column;
  gap: 10px;

  h2 {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
  }

  p {
    font-size: 0.95rem;
    color: #555;
    margin: 0;

    strong {
      font-weight: bold;
      color: #333;
    }
  }
`;