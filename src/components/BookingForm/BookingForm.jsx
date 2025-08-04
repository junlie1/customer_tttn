import { useState, useRef, useEffect } from 'react';
import { DropdownSection } from './style';
import mui_ten from '../../assets/mui_ten.jpg';
import icon_user from '../../assets/icon_user.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { routeService } from '../../services/routeService';
import { useNavigate } from 'react-router-dom';
import { cityVnService } from '../../services/cityVnService';
import { schedulesService } from '../../services/schedulesService';
import { toZonedTime, format } from 'date-fns-tz';
import { setFrom, setTo } from '../../redux/slides/bookingSlide';
import { useSearchParams } from 'react-router-dom';
import { useRoutesMap } from '../../hooks/useRoutesMap';

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numSelectAdult, setNumSelectPersonAdult] = useState(1);
  const [numSelectChildren, setNumSelectPersonChildren] = useState(1);
  const [showPersonDropdown, setShowPersonDropdown] = useState(false);
  const [routes, setRoutes] = useState([]);
  const { data: schedules } = useSelector((state) => state.schedules);
  const [city, setCity] = useState([]);
  const datePickerRef = useRef(null);
  const dropdownRef = useRef(null);
  const [searchParams] = useSearchParams();
  const [hasAutoSearched, setHasAutoSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const routeMaps = useRoutesMap(schedules);
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

  //Using for AI chatbot URL
  useEffect(() => {
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');
    const dateParam = searchParams.get('date');

    if (!hasAutoSearched && fromParam && toParam && dateParam) {
      dispatch(setFrom(fromParam));
      dispatch(setTo(toParam));

      const parsedDate = new Date(dateParam);
      if (!isNaN(parsedDate)) {
        setSelectedDate(parsedDate);
        setTimeout(() => {
          setHasAutoSearched(true);
        }, 100);
      }
    }
  }, [searchParams, hasAutoSearched, dispatch]);

  useEffect(() => {
    if (hasAutoSearched && selectedDate) {
      handleSearchTicket();
    }
  }, [hasAutoSearched, selectedDate]);

  const handleIncrement = () => setNumSelectPersonAdult((prev) => prev + 1);
  const handleDecrement = () => setNumSelectPersonAdult((prev) => (prev > 1 ? prev - 1 : 1));
  const handleDecrementChildren = () => setNumSelectPersonChildren((prev) => (prev > 1 ? prev - 1 : 1));
  const handleIncrementChildren = () => setNumSelectPersonChildren((prev) => prev + 1);

  const handleSearchTicket = () => {
    if (!selectedFrom || !selectedTo || !selectedDate) {
      alert("Vui lòng chọn đầy đủ các trường dữ liệu");
      return;
    }
    setIsLoading(true);

    dispatch(setFrom(selectedFrom));
    dispatch(setTo(selectedTo));

    setIsLoading(true);

    const timeZone = 'Asia/Ho_Chi_Minh';
    const formattedDate = format(toZonedTime(selectedDate, timeZone), 'yyyy-MM-dd', { timeZone });
    const filteredSchedules = schedules.filter(schedule => {
      const route = routeMaps[schedule.routeId];
      if (!route) return false;

      const isMatchingRoute = route.from === selectedFrom && route.to === selectedTo;
      const scheduleDate = format(toZonedTime(schedule.departureTime, timeZone), 'yyyy-MM-dd', { timeZone });

      return (
        isMatchingRoute &&
        scheduleDate === formattedDate &&
        schedule.status === "upcoming"
      );
    });

    navigate(`/search-results?from=${selectedFrom}&to=${selectedTo}&date=${selectedDate}`, {
      state: {
        from: selectedFrom,
        to: selectedTo,
        date: selectedDate,
        adults: numSelectAdult,
        children: numSelectChildren,
        results: filteredSchedules,
        isLoading: isLoading
      },
    });
  };

  useEffect(() => {
    if (hasAutoSearched && selectedFrom && selectedTo && selectedDate) {
      let retries = 0;
      const maxRetries = 10;
      setIsLoading(true);

      const interval = setInterval(() => {
        const timeZone = 'Asia/Ho_Chi_Minh';
        const formattedDate = format(toZonedTime(selectedDate, timeZone), 'yyyy-MM-dd', { timeZone });
        const combinedRoute = `${selectedFrom} - ${selectedTo}`;
        const matchingRoutes = routes.filter(route => `${route.from} - ${route.to}` === combinedRoute);
        const matchingRouteIds = matchingRoutes.map(route => route.id);

        const filteredSchedules = schedules.filter(schedule => {
          const scheduleDate = format(toZonedTime(schedule.departureTime, timeZone), 'yyyy-MM-dd', { timeZone });
          return matchingRouteIds.includes(schedule.routeId) && scheduleDate === formattedDate && schedule.status === "upcoming";
        });

        if (filteredSchedules.length > 0 || retries >= maxRetries) {
          clearInterval(interval);
          setIsLoading(false);

          if (filteredSchedules.length > 0) {
            navigate(`/search-results?from=${selectedFrom}&to=${selectedTo}&date=${selectedDate}`, {
              state: {
                from: selectedFrom,
                to: selectedTo,
                date: selectedDate,
                adults: numSelectAdult,
                children: numSelectChildren,
                results: filteredSchedules,
              },
            });
          }
        }
        retries++;
      }, 1000);
    }
  }, [hasAutoSearched, selectedDate, selectedFrom, selectedTo, routes, schedules]);

  useEffect(() => {
    const fetchAllCity = async () => {
      const response = await cityVnService.getAllCity();
      setCity(response?.data);
    }
    fetchAllCity();
  }, []);

  return (
    <>
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
    </>
  );
};

export default BookingForm;
