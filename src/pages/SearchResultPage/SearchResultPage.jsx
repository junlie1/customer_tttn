import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { 
  Container, 
  Banner, 
  SearchResultsWrapper, 
  FilterSection, 
  SearchResultsContainer, 
  SearchResultsList 
} from './style';
import banner from '../../assets/banner.png';
import start_point from '../../assets/start-point.png';
import end_point from '../../assets/end_point.png';
import BookingForm from '../../components/BookingForm/BookingForm';
import SeatSelectionForm from '../../components/SeatSelectionForm/SeatSelectionForm';
import ScheduleForm from '../../components/ScheduleForm/ScheduleForm';
import PolicyForm from '../../components/PolicyForm/PolicyForm';

const SearchResultsPage = () => {
  const location = useLocation();
  const [results, setResults] = useState(location.state?.results || []);
  const [selectedScheduleId, setSelectedScheduleId] = useState(null);
  const [selectedTab, setSelectedTab] = useState({});

  // 👉 State bộ lọc
  const [seatFilters, setSeatFilters] = useState([]);
  const [timeFilters, setTimeFilters] = useState([]);

  useEffect(() => {
    setResults(location.state?.results || []);
  }, [location.state]);

  const handleSelectSchedule = (scheduleId) => {
    setSelectedScheduleId(scheduleId);
    setSelectedTab(prev => ({ ...prev, [scheduleId]: "Chọn ghế" }));
  };

  const handleTabClick = (routeId, tab) => {
    setSelectedTab({ [routeId]: tab });
  };

  // 👉 Xử lý lọc
  const filteredResults = results.filter(schedule => {
    const availableSeats = schedule.route?.availableSeats || 0;
    const seatMatch = seatFilters.length === 0 || seatFilters.some(range => {
      if (range === "0-10") return availableSeats <= 10;
      if (range === "11-20") return availableSeats > 10 && availableSeats <= 20;
      if (range === "21+") return availableSeats > 20;
      return true;
    });

    const departureHour = new Date(schedule.departureTime).getHours();
    const timeMatch = timeFilters.length === 0 || timeFilters.some(slot => {
      if (slot === "00:00-06:00") return departureHour >= 0 && departureHour < 6;
      if (slot === "06:00-12:00") return departureHour >= 6 && departureHour < 12;
      if (slot === "12:00-18:00") return departureHour >= 12 && departureHour < 18;
      if (slot === "18:00-24:00") return departureHour >= 18 && departureHour < 24;
      return true;
    });

    return seatMatch && timeMatch;
  });

  return (
    <Container>
      <HeaderComponent />
      <Banner>
        <img src={banner} alt="Banner" />
      </Banner>
      <BookingForm />

      <SearchResultsWrapper>
        <FilterSection>
          <h3>BỘ LỌC TÌM KIẾM</h3>

          {/* Giờ đi */}
          <div className="filter-group">
            <h4>Giờ đi</h4>
            {["00:00-06:00", "06:00-12:00", "12:00-18:00", "18:00-24:00"].map(time => (
              <label key={time}>
                <input
                  type="checkbox"
                  value={time}
                  checked={timeFilters.includes(time)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setTimeFilters(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
                  }}
                /> {time}
              </label>
            ))}
          </div>

          {/* Số ghế trống */}
          <div className="filter-group">
            <h4>Số ghế trống</h4>
            {["0-10", "11-20", "21+"].map(range => (
              <label key={range}>
                <input
                  type="checkbox"
                  value={range}
                  checked={seatFilters.includes(range)}
                  onChange={(e) => {
                    const { value, checked } = e.target;
                    setSeatFilters(prev => checked ? [...prev, value] : prev.filter(v => v !== value));
                  }}
                /> {range}
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Danh sách kết quả */}
        <SearchResultsContainer>
          {filteredResults.length > 0 ? (
            <>
              <h2>{filteredResults[0].route.routeName} ({filteredResults.length})</h2>
              <SearchResultsList>
                {filteredResults.map(schedule => (
                  <div key={schedule.id} className="result-item" style={{
                    cursor: "pointer",
                    border: selectedScheduleId === schedule.id ? '1px solid #ff5722' : 'none',
                    padding: '10px',
                    marginBottom: '10px'
                  }}>
                    {/* Cột thông tin */}
                    <div className="route-info">
                      <span className="time">
                        {schedule.departureTime ? new Date(schedule.departureTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "Asia/Ho_Chi_Minh"
                        }) : "16:00"}
                      </span>
                      <span className="location">{schedule.route.startPoint || "Bến Xe Miền Tây"}</span>
                    </div>
                    <div className="route-meta">
                      <div className="route-line">
                        <img src={start_point} alt="start" className="icon-start" />
                        <span className="dashed-line"></span>
                        <span className="travel-time">{`${Math.floor(schedule.route.duration / 60)} giờ` || "4 giờ"}</span>
                        <span className="dashed-line"></span>
                        <img src={end_point} alt="end" className="icon-end" />
                      </div>
                    </div>
                    <div className="route-info">
                      <span className="time">
                        {schedule.arrivalTime ? new Date(schedule.arrivalTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "Asia/Ho_Chi_Minh"
                        }) : "20:00"}
                      </span>
                      <span className="location">{schedule.route.endPoint || "Bến Xe Trà Vinh"}</span>
                    </div>
                    <div className="route-meta">
                      <span className="bus-type">🚍 {schedule.bus.busType || "Limousine"}</span>
                      <span className="available-seats" style={{ color: "green" }}>
                        {schedule.route.availableSeats ? `${schedule.route.availableSeats} chỗ trống` : "11 chỗ trống"}
                      </span>
                    </div>
                    <div className="route-price">
                      {schedule.price ? `${schedule.price} đ` : "160.000 đ"}
                    </div>
                    <hr className="divider" />

                    <div className="options-container">
                      <div className="extra-options">
                        {["Chọn ghế", "Lịch trình", "Chính sách"].map((tab) => (
                          <span
                            key={tab}
                            className={`tab ${selectedTab[schedule.id] === tab ? "active" : ""}`}
                            onClick={() => handleTabClick(schedule.id, tab)}
                          >
                            {tab}
                          </span>
                        ))}
                      </div>
                      <button 
                        className="route-btn" 
                        style={{ backgroundColor: selectedScheduleId === schedule.id ? "#ff5722" : "#ccc", color: "white" }}
                        onClick={() => handleSelectSchedule(schedule.id)}
                      >
                        Chọn chuyến
                      </button>
                    </div>

                    <div className="tab-content active">
                      {selectedTab[schedule.id] === "Chọn ghế" && <SeatSelectionForm seatLayoutId={schedule.seatLayoutId} routePrice={schedule.price} />}
                      {selectedTab[schedule.id] === "Lịch trình" && <ScheduleForm seatLayoutId={schedule.seatLayoutId} routePrice={schedule.price} />}
                      {selectedTab[schedule.id] === "Chính sách" && <PolicyForm seatLayoutId={schedule.seatLayoutId} routePrice={schedule.price} />}
                    </div>
                  </div>
                ))}
              </SearchResultsList>
            </>
          ) : (
            <p>Không có tuyến nào phù hợp với bộ lọc.</p>
          )}
        </SearchResultsContainer>
      </SearchResultsWrapper>
    </Container>
  );
};

export default SearchResultsPage;
