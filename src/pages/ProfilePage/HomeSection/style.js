import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfileCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 1.5rem;
    margin: 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
  }

  .rank {
    background-color: red;
    color: #fff;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.9rem;
  }
`;

export const StatsContainer = styled.div`
  display: flex;
  gap: 20px;
`;

export const StatBox = styled.div`
  text-align: center;

  h2 {
    margin: 0;
    font-size: 1.8rem;
    color: #333;
  }

  p {
    margin: 5px 0 0 0;
    font-size: 1rem;
    color: #666;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

export const OptionItem = styled.div`
  flex: 1;
  text-align: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #f1f1f1;
    transform: scale(1.05);
  }

  div {
    font-size: 1rem;
    color: #333;
  }
`;

export const PromoSection = styled.div`
  h2 {
    margin-bottom: 20px;
    font-size: 1.5rem;
    color: #333;
  }

  .promo-list {
    display: flex;
    gap: 20px;
    overflow-x: scroll;
    padding-bottom: 10px;
    position: relative; /* Đảm bảo promo-list không bị che */
    z-index: 2; /* Đặt ưu tiên trên sidebar */
  }

  .promo-list::-webkit-scrollbar {
    height: 5px;
  }

  .promo-list::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 10px;
  }

  .promo-list::-webkit-scrollbar-track {
    background: transparent;
  }
`;

export const SliderContainer = styled.div`
  padding: 20px 0;
  height: 300px;
  display: flex;
  overflow: hidden;
  position: relative; /* Đảm bảo slider không bị che */
  z-index: 1; /* Đảm bảo slider nằm trên các thành phần khác */
  background-color: #f9f9f9; /* Màu nền để tách biệt slider */
`;

export const PromoCard = styled.div`
  text-align: center;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2; /* Đảm bảo PromoCard luôn nằm trên SliderContainer */

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 10px;
    transition: transform 0.3s ease;
    z-index: 3; /* Đảm bảo hình ảnh hiển thị trên cùng */
  }

  img:hover {
    transform: scale(1.05);
  }

  p {
    margin-top: 10px;
    font-size: 1rem;
    color: #333;
    font-weight: bold;
  }
`;