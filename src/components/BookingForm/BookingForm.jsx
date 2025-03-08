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
import { useDispatch, useSelector } from 'react-redux';
import {  routeService } from '../../services/routeService';
import { useNavigate } from 'react-router-dom';
import { cityVnService } from '../../services/cityVnService';
import { schedulesService } from '../../services/schedulesService';
import { toZonedTime, format } from 'date-fns-tz';
import { setFrom, setTo } from '../../redux/slides/bookingSlide';

const BookingForm = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [numSelectAdult, setNumSelectPersonAdult] = useState(1);
    const [numSelectChildren, setNumSelectPersonChildren] = useState(1);
    const [showPersonDropdown, setShowPersonDropdown] = useState(false);
    const [routes,setRoutes] = useState([]);
    const [schedules, setSchedules] = useState([]);
    // const [selectedFrom, setSelectedFrom] = useState("");
    // const [selectedTo, setSelectedTo] = useState("");
    const [filteredRoutes, setFilteredRoutes] = useState([]);
    const [city,setCity] = useState([]);
    const datePickerRef = useRef(null);
    const dropdownRef = useRef(null);
    

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const selectedFrom = useSelector(state => state.book.selectedFrom);
    const selectedTo = useSelector(state => state.book.selectedTo);

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

    useEffect(() => {
        const fetchRoutes = async () => {
        try {
            const response = await routeService.getRoutes();
            if (response.success) {
            setRoutes(response.data);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu tuyến đường:", error);
        }
        };
        fetchRoutes();
    }, []);

    useEffect(() => {
      const fetchAllSchedules = async () => {
        try {
          const response = await schedulesService.getSchedules();
          console.log('response',response.data);
          setSchedules(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu lịch trình:", error);
        }
      }
      fetchAllSchedules();
    },[])

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

  //   const handleSearchTicket = () => {
  //     if (!selectedFrom || !selectedTo) {
  //         alert("Vui lòng chọn đầy đủ các trường dữ liệu");
  //         return;
  //     }
  
  //     // Nối chuỗi
  //     const combinedRoute = `${selectedFrom} - ${selectedTo}`;
  //     // Tìm `routeId` tương ứng với tuyến đường đã chọn
  //     const matchingRoutes = routes.filter(route => `${route.from} - ${route.to}` === combinedRoute);
  //     // Lấy danh sách `routeId`
  //     const matchingRouteIds = matchingRoutes.map(route => route.id);
  
  //     // Lọc danh sách lịch trình (`schedules`) có `routeId` trùng khớp
  //     const filteredSchedules = schedules.filter(schedule => matchingRouteIds.includes(schedule.routeId));
  
  //     // Chuyển hướng đến trang kết quả tìm kiếm, hiển thị danh sách vé từ `schedules`
  //     navigate('/search-results', {
  //         state: {
  //             from: selectedFrom,
  //             to: selectedTo,
  //             date: selectedDate,
  //             adults: numSelectAdult,
  //             children: numSelectChildren,
  //             results: filteredSchedules,
  //         },
  //     });
  // };
  
  const handleSearchTicket = () => {
    if (!selectedFrom || !selectedTo || !selectedDate) {
        alert("Vui lòng chọn đầy đủ các trường dữ liệu");
        return;
    }
    dispatch(setFrom(selectedFrom));
    dispatch(setTo(selectedTo));

    const timeZone = 'Asia/Ho_Chi_Minh';

    // Chuyển đổi selectedDate về định dạng YYYY-MM-DD theo múi giờ Asia/Ho_Chi_Minh
    const formattedDate = format(toZonedTime(selectedDate, timeZone), 'yyyy-MM-dd', { timeZone });

    console.log('formattedDate:', formattedDate);

    // Tìm tuyến đường có từ điểm đi đến điểm đến
    const combinedRoute = `${selectedFrom} - ${selectedTo}`;
    const matchingRoutes = routes.filter(route => `${route.from} - ${route.to}` === combinedRoute);
    const matchingRouteIds = matchingRoutes.map(route => route.id);

    // Lọc lịch trình dựa trên routeId và ngày khởi hành (chuẩn hóa departureTime)
    const filteredSchedules = schedules.filter(schedule => {
        const scheduleDate = format(toZonedTime(schedule.departureTime, timeZone), 'yyyy-MM-dd', { timeZone });
        return matchingRouteIds.includes(schedule.routeId) && scheduleDate === formattedDate;
    });

    // Điều hướng đến trang kết quả tìm kiếm
    navigate('/search-results', {
        state: {
            from: selectedFrom,
            to: selectedTo,
            date: selectedDate,
            adults: numSelectAdult,
            children: numSelectChildren,
            results: filteredSchedules,
        },
    });
};

    useEffect(() => {
      const fetchAllCity = async () => {
        const response = await cityVnService.getAllCity();
        setCity(response.data);
      }
      fetchAllCity();
    }, []);
  return (
    <DropdownSection>
        <div className="dropdown-group">
            {/* Dropdown chọn From (startPoint) */}
            <div className="dropdown valid">
              <select value={selectedFrom} onChange={(e) => dispatch(setFrom(e.target.value))}>
                <option value="">From</option>
                {city.map((item) => (
                  <option key={item.code} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
          </div>
          <div className="arrow">
            <img src={mui_ten} alt="Arrow" />
          </div>
          <div className="dropdown success">
            <select value={selectedTo} onChange={(e) => dispatch(setTo(e.target.value))}>
              <option value="">To</option>
              {city.map((item) => (
                  <option key={item.code} value={item.name}>
                    {item.name}
                  </option>
              ))}
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
                minDate={new Date()}
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
  )
}

export default BookingForm