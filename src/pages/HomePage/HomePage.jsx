import React, { useState, useRef, useEffect } from 'react';
import { Container, DropdownSection, Banner, RouteResults } from './style';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import FooterComponent from '../../components/FooterComponent/FooterComponent';
import UpcomingScheduleNotice from '../../components/UpcomingScheduleNotice/UpcomingScheduleNotice';
import banner from '../../assets/banner.png';
import 'react-datepicker/dist/react-datepicker.css';
import BookingForm from '../../components/BookingForm/BookingForm';

const HomePage = () => {

  return (
    <Container>
      <HeaderComponent />

      <UpcomingScheduleNotice />

      <Banner>
        <img src={banner} alt="Banner" />
      </Banner>

      <BookingForm />

      <FooterComponent />
    </Container>
  );
};

export default HomePage;
