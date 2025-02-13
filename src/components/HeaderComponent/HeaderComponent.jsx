import React, { useState } from 'react';
import { HeaderContainer, Logo, Nav, AuthButtons, UserMenu, MenuItem } from './style';
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slides/userSlide';
import icon_user from '../../assets/icon_user.png';

const HeaderComponent = () => {
  const [menuVisible, setMenuVisible] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleNavigateLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    dispatch(clearUser(user));
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <HeaderContainer>
      <Nav>
        <a href="#find-a-trip">
          <span role="img" aria-label="car">🚗</span> Find a Trip
        </a>
        <a href="#community">
          <span role="img" aria-label="community">🔗</span> Community
        </a>
      </Nav>
      <Logo>
        <img src={logo} alt="Logo" />
      </Logo>
      <AuthButtons>
        {user?.uid ? (
          <div style={{ position: 'relative' }}>
            <div onClick={toggleMenu} className="user-email" style={{cursor: 'pointer'}}>
            <img src={icon_user} alt="User Icon" className="user-icon" /> {user?.email}
            </div>
            {menuVisible && (
              <UserMenu>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                <MenuItem onClick={() => navigate('/history')}>Lịch sử đặt vé</MenuItem>
              </UserMenu>
            )}
          </div>
        ) : (
          <button className="login" onClick={handleNavigateLogin}>Login</button>
        )}
      </AuthButtons>
    </HeaderContainer>
  );
};

export default HeaderComponent;
