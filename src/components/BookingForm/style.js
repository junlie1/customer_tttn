import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 100vh; /* Đảm bảo chiều cao tối thiểu của Container bằng chiều cao màn hình */
`;
export const Banner = styled.div`
  width: 100%; /* Đảm bảo chiếm toàn bộ chiều ngang màn hình */
  height: 400px; /* Chiều cao cố định của banner */
  overflow: hidden; /* Ẩn phần dư của ảnh nếu có */
  position: relative;

  img {
    width: 100%; /* Đảm bảo ảnh bao phủ toàn bộ chiều ngang */
    height: 100%; /* Đảm bảo ảnh bao phủ toàn bộ chiều cao */
    object-fit: cover; /* Cắt ảnh để vừa khít khung mà không làm méo */
    display: block; /* Loại bỏ khoảng trắng mặc định dưới ảnh */
  }
`;

export const RouteResults = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;

  h3 {
    font-size: 22px;
    color: #333;
    margin-bottom: 15px;
    font-weight: bold;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    background: white;
    padding: 15px;
    margin-bottom: 10px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform 0.2s ease-in-out;
    
    &:hover {
      transform: scale(1.02);
    }
  }

  strong {
    font-size: 18px;
    color: #007bff;
  }

  p {
    font-size: 16px;
    color: #888;
  }
`;

export const DropdownSection = styled.section`
  background: #ffffff; /* Màu nền trắng */
  padding: 40px 60px; /* Tăng padding cho cân đối */
  border-radius: 20px; /* Bo góc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Đổ bóng */
  max-width: 1200px;
  margin: -50px auto 100px auto; /* Tăng khoảng cách lên trên và dưới */
  position: relative;
  z-index: 1;

  .dropdown-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px; /* Tăng khoảng cách giữa các dropdown */

    .dropdown {
      flex: 1; /* Mỗi dropdown chiếm đều không gian */
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      label {
        font-size: 14px;
        font-weight: bold;
        color: #666;
        margin-bottom: 8px;
      }

      select {
        width: 100%;
        padding: 12px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        color: #333;
        box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
        transition: border-color 0.2s ease;

        &:focus {
          outline: none;
          border-color: #007bff; /* Màu viền khi focus */
        }
      }

      p {
        margin-top: 8px; /* Tăng khoảng cách giữa select và text hỗ trợ */
        font-size: 12px;
        color: #999;
      }
    }

    .search-button {
      flex: 0 0 auto;
      padding: 14px 30px; /* Tăng padding cho nút */
      background-color: #001f54; /* Màu xanh đậm */
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: #004080; /* Màu khi hover */
      }
    }
  }
    .arrow {
      flex: 0 0 auto; /* Không giãn rộng */
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 10px; /* Khoảng cách giữa các dropdown */
      img {
        width: 30px; /* Chiều rộng của ảnh */
        height: 30px; /* Chiều cao của ảnh */
        object-fit: contain; /* Đảm bảo ảnh không bị méo */
      }
    }
  }

  .date-picker-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 15px;
    font-size: 16px;
    background: #fff;

    .date-picker-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
    }

    .calendar-icon {
      color: #999;
      font-size: 20px;
      margin-left: 10px;
    }
  }
  
.select-wrapper {
  position: relative; /* Để tạo mốc cho dropdown */
  display: inline-flex; /* Sử dụng inline-flex để kích thước tự động dựa trên nội dung */
  align-items: center;
  justify-content: center; /* Căn giữa nội dung của select-wrapper */
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px 20px; /* Thêm padding để tạo không gian thoải mái */
  background-color: #fff;
  z-index: 10; /* Ưu tiên hiển thị trên các thành phần khác */
  width: auto; /* Đảm bảo chiều rộng tự động theo nội dung */
  min-width: 120px; /* Đặt chiều rộng tối thiểu (nếu cần) */
  max-width: 100%; /* Đảm bảo không vượt quá khung cha */
  white-space: nowrap; /* Tránh xuống dòng nếu nội dung dài */
}


.user-icon {
  width: 20px; /* Kích thước biểu tượng */
  height: 20px;
  margin-right: 10px; /* Khoảng cách giữa biểu tượng và select */
}

select {
  flex: 1; /* Chiếm toàn bộ không gian còn lại */
  border: none; /* Loại bỏ viền mặc định */
  outline: none; /* Loại bỏ outline khi focus */
  background: transparent; /* Nền trong suốt */
  font-size: 16px; /* Kích thước chữ */
  color: #333; /* Màu chữ */
}

select option {
  color: #333; /* Màu của các option */
}

.user-selector {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-selector div {
  display: flex;
  flex-direction: column; /* Hiển thị các phần tử theo chiều dọc */
  margin-left: 10px; /* Tạo khoảng cách giữa biểu tượng và text */
}

.user-selector div > div {
  margin-bottom: 4px; /* Khoảng cách giữa các dòng */
  font-size: 16px; /* Kích thước chữ */
  color: #333; /* Màu chữ */
}

.person-dropdown {
  position: absolute;
  top: calc(100% + 8px); /* Đặt ngay dưới select-wrapper và tạo khoảng cách nhỏ */
  left: 50%; /* Canh giữa theo chiều ngang */
  transform: translateX(-50%); /* Dịch chuyển để căn giữa */
  background: white;
  border: 1px solid #ccc;
  padding: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100; /* Đảm bảo hiển thị trên select-wrapper */
  width: 300px;
  border-radius: 8px;
}

.person-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.counter {
  display: flex;
  align-items: center;
}

.counter button {
  width: 30px;
  height: 30px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.counter span {
  margin: 0 10px;
}

.done-button {
  background: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  text-align: center;
}
  .search {
    flex: 0 0 auto; /* Không cho nút giãn rộng */
    display: flex;
    justify-content: right;
    align-items: center;
    margin-top: 30px  
  }

  .button-search {
    background-color: #007bff; /* Màu nền xanh */
    color: white; /* Màu chữ trắng */
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px; /* Tăng padding */
    border: none; /* Xóa viền */
    border-radius: 8px; /* Bo góc */
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3; /* Màu xanh đậm hơn khi hover */
    }
  }
}



  @media (max-width: 768px) {
    .dropdown-group {
      flex-direction: column;
      gap: 25px; /* Tăng khoảng cách giữa các dropdown khi xếp dọc */

      .dropdown {
        width: 100%; /* Dropdown chiếm toàn bộ chiều ngang */
      }

      .search-button {
        width: 100%; /* Nút search chiếm toàn bộ chiều ngang */
        text-align: center;
      }
    }
  }
`;






