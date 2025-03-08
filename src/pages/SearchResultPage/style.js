import styled from 'styled-components';

export const Container = styled.div`
  font-family: 'Arial', sans-serif;
  color: #333;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

export const Banner = styled.div`
  width: 100%;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/* Wrapper chứa cả bộ lọc và danh sách kết quả */
export const SearchResultsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 80%;
  max-width: 1200px;
  margin: 20px auto;
`;

/* Bộ lọc tìm kiếm */
export const FilterSection = styled.div`
  width: 300px;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 18px;
    color: #ff5722;
    margin-bottom: 10px;
  }

  .filter-group {
    margin-bottom: 15px;

    h4 {
      font-size: 16px;
      margin-bottom: 5px;
    }

    label {
      display: block;
      font-size: 14px;
      margin-bottom: 5px;
    }

    button {
      background: #f8f9fa;
      border: 1px solid #ddd;
      padding: 5px 10px;
      margin: 5px;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: #ff5722;
        color: white;
      }
    }
  }
`;

/* Danh sách kết quả */
export const SearchResultsContainer = styled.div`
  flex: 1;
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: stretch; /* Đảm bảo con của nó (tab-content) cũng chiếm toàn bộ */
`;

export const SearchResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  .result-item {
    display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    background: white;
    border: 1px solid #ddd;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 15px;
    transition: all 0.3s ease-in-out;

    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    text-align: center;

    /* Cột chứa giờ đi & đến */
    .route-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 16px;

      .time {
        font-size: 18px;
        font-weight: bold;
      }

      .location {
        font-size: 14px;
        color: #777;
      }
    }
       /* Tab container */
    .options-container {
      display: flex;
      justify-content: space-around;
      margin-top: 10px;
      border-bottom: 1px solid #ddd;
      padding-bottom: 5px;
    }

    /* Tab items */
    .tab {
      cursor: pointer;
      font-size: 14px;
      color: #777;
      padding: 5px 10px;
      position: relative;
    }

    .tab.active {
      font-weight: bold;
      color: #ff5722;
    }

    .tab.active::after {
      content: "";
      display: block;
      width: 100%;
      height: 3px;
      background: #ff5722;
      position: absolute;
      bottom: -5px;
      left: 0;
    }

    /* Nội dung form */
.tab-content-wrapper {
      grid-column: span 5; /* Kéo dài toàn bộ width */
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .tab-content {
      grid-column: 1 / -1;
      width: 95%;
      max-width: none;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
      display: none;
      transition: all 0.3s ease-in-out;
    }

    .tab-content.active {
      display: flex;
      flex-direction: column;
    }
  }

    /* Đường nối giữa hai điểm */
    .route-meta {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 14px;
      color: #777;

      .route-line {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
      }

      .icon-start, .icon-end {
        width: 20px;
        height: 20px;
      }

      .dashed-line {
        flex-grow: 1;
        height: 2px;
        border-top: 2px dashed #bbb;
        margin: 0 5px;
      }

      .travel-time {
        position: absolute;
        top: -12px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 16px;
        font-weight: bold;
        background: white;
        padding: 2px 5px;
      }
    }

    /* Loại xe & chỗ trống */
    .bus-type {
      font-size: 14px;
      color: #777;
    }

    .available-seats {
      font-size: 14px;
      font-weight: bold;
      color: green;
    }

    /* Giá vé */
    .route-price {
      font-size: 20px;
      font-weight: bold;
      color: #ff5722;
      text-align: right;
    }

    /* Đường gạch ngang */
    .divider {
      grid-column: span 5;
      width: 100%;
      height: 1px;
      background: #ddd;
      margin: 10px 0;
    }

    /* Hàng chứa Chọn ghế | Lịch trình | Trung chuyển | Chính sách và Chọn chuyến */
    .options-container {
      grid-column: span 5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
    }

    /* Extra options: Chọn ghế, Lịch trình, Trung chuyển, Chính sách */
    .extra-options {
      display: flex;
      gap: 15px;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }

    /* Nút chọn chuyến */
    .route-btn {
      background-color: #ff5722;
      color: white;
      border: none;
      padding: 8px 20px;
      font-size: 16px;
      font-weight: bold;
      border-radius: 25px;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background-color: #e64a19;
      }
    }
  }
`;





