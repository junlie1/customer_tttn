import styled from 'styled-components';

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;

  a {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;

    span {
      margin-right: 5px;
    }

    &:hover {
      color: orange;
    }
  }
`;

export const Logo = styled.div`
  img {
    height: 60px; /* Kích thước logo */
  }
`;

export const AuthButtons = styled.div`
  display: flex;
  gap: 10px;

  .login {
    padding: 8px 16px;
    border: 1px solid #000;
    background: transparent;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #f0f0f0;
    }
  }

  .signup {
    padding: 8px 16px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background: #333;
    }
  }
`;
export const UserMenu = styled.div`
  position: absolute;
  top: 200%;
  right: 0;
  background-color: #f0f8ff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  z-index: 10;
  min-width: 150px;
`;

export const MenuItem = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  font-size: 14px;
  color: #333;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f5f5f5;
  }
`;