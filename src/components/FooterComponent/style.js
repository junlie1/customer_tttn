import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #e75b0d; /* Cam đậm */
  padding: 50px 0;
  display: flex;
  flex-direction: column; /* Đảm bảo CouponSection và FooterWrapper nằm dọc */
  justify-content: center;
  align-items: center;
  color: black;
  width: 100%; /* Trải dài toàn màn hình */
  position: relative; /* Để bố cục hoạt động chính xác */
  margin-top: auto; /* Đẩy Footer xuống cuối trang */
`;

export const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  flex-wrap: wrap;
  padding: 20px 0;
`;

export const FooterSection = styled.div`
  text-align: left;
  margin: 0 20px;

  h3 {
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
    color: black;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin: 5px 0;
      font-size: 14px;
      color: black;
    }
  }
`;

export const FooterLogo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    height: 50px; /* Kích thước logo */
    margin-bottom: 15px;
  }
`;

export const FooterSocialIcons = styled.div`
  display: flex;
  gap: 10px;

  a img {
    height: 20px;
    width: 20px;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.2);
    }
  }
`;

export const FooterLinks = styled.div`
  flex: 1; /* Chiếm toàn bộ phần còn lại */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const CouponSection = styled.section`
  background: #ffa500; /* Màu nền cam */
  color: #333;
  padding: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px; /* Bo góc */
  position: relative;
  margin: -100px auto 30px auto; /* Đẩy Coupon lên trên Footer */
  max-width: 1200px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Đổ bóng nhẹ */

  .content {
    max-width: 600px;

    h2 {
      font-size: 36px;
      font-weight: bold;
      color: #333;
      margin-bottom: 15px;
    }

    .subheading {
      font-size: 20px;
      font-weight: bold;
      color: #666;
      margin-bottom: 20px;
    }

    p {
      margin: 20px 0;
      font-size: 16px;
    }

    form {
      display: flex;

      input {
        flex: 1;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-right: 10px;
        font-size: 14px;
      }

      button {
        padding: 10px 20px;
        background: #000;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }

  .image {
    width: 200px; /* Đặt chiều rộng cố định cho ảnh */
    height: 150px; /* Đặt chiều cao cố định cho ảnh */
    overflow: hidden; /* Ẩn phần dư của ảnh nếu cần */
    border-radius: 10px; /* Bo góc cho ảnh */
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      width: 100%; /* Đảm bảo ảnh vừa khít chiều rộng khung */
      height: auto; /* Giữ tỷ lệ khung hình của ảnh */
      object-fit: contain; /* Đảm bảo ảnh nằm gọn trong khung mà không cắt */
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;

    .content {
      margin-bottom: 20px;
    }

    .image {
      width: 100%;
      height: 200px;
    }
  }
`;

