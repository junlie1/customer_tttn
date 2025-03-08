import React, { useState, useRef, useEffect } from 'react';
import { Container, DropdownSection, Banner, RouteResults } from './style';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import banner from '../../assets/banner.png';
import mui_ten from '../../assets/mui_ten.jpg';
import icon_user from '../../assets/icon_user.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import {  routeService } from '../../services/routeService';
import { useNavigate } from 'react-router-dom';
import BookingForm from '../../components/BookingForm/BookingForm';

const HomePage = () => {
  
  return (
    <Container>
      <HeaderComponent />

      <Banner>
        <img src={banner} alt="Banner" />
      </Banner>

      <BookingForm />
      
      <FooterComponent />
    </Container>
  );
};

export default HomePage;
