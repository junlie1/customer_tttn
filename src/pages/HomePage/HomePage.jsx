import React, { useState, useRef, useEffect } from 'react';
import { Container, DropdownSection, Banner } from './style';
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

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numSelectAdult, setNumSelectPersonAdult] = useState(1);
  const [numSelectChildren, setNumSelectPersonChildren] = useState(1);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const datePickerRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPersonDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPersonDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleIncrement = () => {
    setNumSelectPersonAdult((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setNumSelectPersonAdult((prev) => (prev > 1 ? prev - 1 : 1));
  };
  
  const handleDecrementChildren = () => {
    setNumSelectPersonChildren((prev) => (prev > 1 ? prev - 1 : 1));
  }

  const handleIncrementChildren = () => {
    setNumSelectPersonChildren((prev) => prev + 1);
  }

  const handleSearchTicket = async () => {
    try {
      
    } catch (error) {
      
    }
  }
  return (
    <Container>
      <HeaderComponent />

      <Banner>
        <img src={banner} alt="Banner" />
      </Banner>

      <DropdownSection>
        <div className="dropdown-group">
          <div className="dropdown valid">
            <select>
              <option>From</option>
            </select>
          </div>
          <div className="arrow">
            <img src={mui_ten} alt="Arrow" />
          </div>
          <div className="dropdown success">
            <select>
              <option>To</option>
            </select>
          </div>
          <div className="dropdown calendar">
            <div className="date-picker-wrapper">
              <DatePicker
                ref={datePickerRef}
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Calendar"
                className="date-picker-input"
              />
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="calendar-icon"
                onClick={() => datePickerRef.current.setFocus()}
              />
            </div>
          </div>
          <div className="select-wrapper" ref={dropdownRef}>
          <div className="user-selector" onClick={() => setShowPersonDropdown((prev) => !prev)}>
            <img src={icon_user} alt="User Icon" className="user-icon" />
            <div>
              <div>{numSelectAdult} {numSelectAdult > 1 ? 'Adults' : 'Adult'}</div>
              <div>{numSelectChildren} {numSelectChildren > 1 ? 'Children' : 'Child'}</div>
            </div>
          </div>
            {showPersonDropdown && (
              <div className="person-dropdown">
                <div className="person-row">
                  <span>Adults (Age 18+)</span>
                  <div className="counter">
                    <button onClick={handleDecrement}>-</button>
                    <span>{numSelectAdult}</span>
                    <button onClick={handleIncrement}>+</button>
                  </div>
                </div>
                <div className="person-row">
                  <span>Children (0 - 17)</span>
                  <div className="counter">
                    <button onClick={handleDecrementChildren}>-</button>
                    <span>{numSelectChildren}</span>
                    <button onClick={handleIncrementChildren}>+</button>
                  </div>
                </div>
                <button className="done-button" onClick={() => setShowPersonDropdown(false)}>
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='search'>
          <button className='button-search' onClick={handleSearchTicket}>Search</button>
        </div>
      </DropdownSection>
    
      <FooterComponent />
    </Container>
  );
};

export default HomePage;
