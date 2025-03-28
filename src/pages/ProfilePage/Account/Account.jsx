import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { container, title, field, label, inputField, buttonContainer, button } from './style';
import { getUserById, updateUserService } from '../../../services/userService';
import { updateUser } from '../../../redux/slides/userSlide';

const Account = () => {
  const customerId = useSelector((state) => state.user.user?.uid);
  const [user,setUser] = useState({});
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  useEffect(() => {
    try {
      const fetchUserById = async () => {
        const response = await getUserById(customerId);
        if(response?.success) {
          setUser(response.data);
          setFormData({
            name: response.data.name || "",
            email: response.data.email || "",
            phone: response.data.phone || "",
          })
        }
      }
      if(customerId) {
        fetchUserById();
      }
    } catch (error) {
      console.error("Error",error);
    }
  }, [customerId]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await updateUserService(customerId,formData);
      if (response.success) {
        alert('Cập nhật thông tin thành công!');
        dispatch(updateUser(response.data));      
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
        <label style={label} htmlFor="name">Họ và tên:</label>
        <input
          style={inputField}
          type="text"
          id="name"
          name="name"
          value={formData.name}
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
        <label style={label} htmlFor="phone">Số điện thoại:</label>
        <input
          style={inputField}
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
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