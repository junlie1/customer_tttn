import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { container, title, field, label, inputField, buttonContainer, button } from './style';
import { updateUserService } from '../../../services/userService';
import { updateUser } from '../../../redux/slides/userSlide';

const Account = () => {
  const user = useSelector((state) => state.user.user);
  console.log('user',user);
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    displayName: user.displayName || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    // Kiểm tra xem có trường nào bị bỏ trống không
    // const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');
    // if (!isFormComplete) {
    //   alert('Nhập đủ các trường dữ liệu');
    //   return;
    // }
    try {
      const updatedUser = await updateUserService(user.uid,formData);
      dispatch(updateUser({ 
        ...updatedUser
      }));      
      if (updatedUser) {
        alert('Cập nhật thông tin thành công!');
      } else {
        alert('Cập nhật thất bại. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div style={container}>
      <h2 style={title}>Thông tin tài khoản</h2>
      
      <div style={field}>
        <label style={label} htmlFor="displayName">Họ và tên:</label>
        <input
          style={inputField}
          type="text"
          id="displayName"
          name="displayName"
          value={formData.displayName}
          onChange={handleChange}
        />
      </div>
      
      <div style={field}>
        <label style={label} htmlFor="email">Email:</label>
        <input
          style={inputField}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      
      <div style={field}>
        <label style={label} htmlFor="phoneNumber">Số điện thoại:</label>
        <input
          style={inputField}
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div style={buttonContainer}>
        <button style={button} onClick={handleUpdate}>
          Cập nhật thông tin
        </button>
      </div>
    </div>
  );
};

export default Account;