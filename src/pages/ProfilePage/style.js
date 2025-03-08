import styled from 'styled-components';

export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column; /* HeaderComponent nằm trên cùng */
  height: 100vh; /* Chiều cao toàn màn hình */
  background-color: #f9f9f9; /* Màu nền tổng thể */
`;

export const Container = styled.div`
  display: flex;
  flex: 1; /* Chiếm toàn bộ chiều cao còn lại bên dưới HeaderComponent */
`;

export const Sidebar = styled.div`
  position: sticky; /* Sidebar cố định khi cuộn */
  top: 0; /* Căn chỉnh với HeaderComponent */
  height: calc(100vh - 64px); /* Chiều cao bằng màn hình trừ Header (64px) */
  width: 250px; /* Độ rộng Sidebar */
  background-color: #ffffff; /* Màu nền Sidebar */
  border-right: 1px solid #e0e0e0; /* Đường viền bên phải */
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  z-index: 10; /* Đảm bảo Sidebar không chồng lên các phần khác */
  display: flex;
  flex-direction: column;
`;

export const SidebarItem = styled.div`
  margin-bottom: 20px;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  border-radius: 8px;
  padding: 10px;
  transition: all 0.3s;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.02); /* Zoom nhẹ khi hover */
  }

  &:active {
    background-color: #e0e0e0; /* Màu khi nhấn */
  }
`;

export const ProfileSection = styled.div`
  flex: 1; /* Chiếm toàn bộ phần còn lại của chiều ngang */
  overflow-y: auto; /* Thêm scroll dọc nếu nội dung dài */
  padding: 20px; /* Tạo khoảng cách với các cạnh */
  background-color: #f9f9f9; /* Màu nền ProfileSection */
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.05); /* Đổ bóng nhẹ bên trong */
`;