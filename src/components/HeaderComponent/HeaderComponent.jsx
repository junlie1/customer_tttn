import React, { useState } from 'react';
import { HeaderContainer, Logo, Nav, AuthButtons, UserMenu, MenuItem, UserIcon } from './style';
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

  const handleNavigateSearch = () => {
    navigate('/search-results');
  }
  const handleNavigateHome = () => {
    navigate('/');
  }
  const handleNavigateProfile = () => {
    navigate('/profile')
  }
  return (
    <HeaderContainer>
      <Nav>
        <a onClick={handleNavigateSearch} style={{cursor: 'pointer'}}>
          <span role="img" aria-label="car">🚗</span> Find a Trip
        </a>
        <a onClick={handleNavigateHome} style={{cursor: 'pointer'}}>
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
              <img src={icon_user} alt="User Icon" style={{width: '30px', height: '30px'}} /> {user?.email}
            </div>
            {menuVisible && (
              <UserMenu>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                <MenuItem onClick={handleNavigateProfile}>Quản lý tài khoản</MenuItem>
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
