import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
import ScheduleForm from '../../components//ScheduleForm/ScheduleForm';
import PolicyForm from '../../components/PolicyForm/PolicyForm';

const SearchResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState(location.state?.results || []);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [selectedTab, setSelectedTab] = useState("Chọn ghế");
  console.log('results',results);

  // Mỗi lần location.state thay đổi (nghĩa là có tìm kiếm mới), cập nhật lại results
  useEffect(() => {
    setResults(location.state?.results || []);
  }, [location.state]);

  const handleSelectRoute = (routeId) => {
    setSelectedRouteId(routeId);
  };
  
  const handleTabClick = (routeId, tab) => {
    setSelectedTab({
      [routeId]: tab, // Chỉ giữ lại tab của route mới, xóa mọi route cũ
    });
  };
  
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

          <div className="filter-group">
            <h4>Giờ đi</h4>
            <label><input type="checkbox" /> Sáng sớm 00:00 - 06:00</label>
            <label><input type="checkbox" /> Buổi sáng 06:00 - 12:00</label>
            <label><input type="checkbox" /> Buổi chiều 12:00 - 18:00</label>
            <label><input type="checkbox" /> Buổi tối 18:00 - 24:00</label>
          </div>

          <div className="filter-group">
            <h4>Loại xe</h4>
            <button>Ghế</button>
            <button>Giường</button>
            <button>Limousine</button>
          </div>

          <div className="filter-group">
            <h4>Tầng</h4>
            <button>Tầng trên</button>
            <button>Tầng dưới</button>
          </div>
        </FilterSection>

        {/* Danh sách kết quả tìm kiếm */}
        <SearchResultsContainer>
          {results
            ? (
              results.map((schedule) => (
                <h2>{schedule.route.routeName} ({results?.length || 0})</h2>
              ))
            )
            : <p>Hãy lựa chọn chuyến đi</p>
          }
          <SearchResultsList>
            {results && results.length > 0 ? (
              results.map((schedule) => (
                <div 
                  key={schedule.route.id} 
                  className="result-item" 
                  onClick={() => handleSelectRoute(schedule.route.id)}
                  style={{ cursor: "pointer" }}
                >
                  {/* Cột 1: Thời gian đi & điểm đi */}
                  <div className="route-info">
                  <span className="time">
                    {schedule.departureTime
                      ? new Date(schedule.departureTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "Asia/Ho_Chi_Minh"
                        })
                      : "16:00"}
                  </span>
                    <span className="location">{schedule.route.startPoint || "Bến Xe Miền Tây"}</span>
                  </div>

                  {/* Cột 2: Dấu chấm, ảnh & thời gian di chuyển */}
                  <div className="route-meta">
                    <div className="route-line">
                      <img src={start_point} alt="start" className="icon-start" />
                      <span className="dashed-line"></span>
                      <span className="travel-time">{`${Math.floor(schedule.route.duration / 60)} giờ` || "4 giờ"}</span>
                      <span className="dashed-line"></span>
                      <img src={end_point} alt="end" className="icon-end" />
                    </div>
                  </div>

                  {/* Cột 3: Thời gian đến & điểm đến */}
                  <div className="route-info">
                  <span className="time">
                    {schedule.arrivalTime
                      ? new Date(schedule.arrivalTime).toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "Asia/Ho_Chi_Minh"
                        })
                      : "16:00"}
                  </span>
                    <span className="location">{schedule.route.endPoint || "Bến Xe Trà Vinh"}</span>
                  </div>

                  {/* Cột 4: Loại xe & chỗ trống */}
                  <div className="route-meta">
                    <span className="bus-type">🚍 {schedule.bus.busType || "Limousine"}</span>
                    <span className="available-seats" style={{ color: "green" }}>
                      {schedule.route.availableSeats ? `${schedule.route.availableSeats} chỗ trống` : "11 chỗ trống"}
                    </span>
                  </div>

                  {/* Cột 5: Giá vé */}
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
                      style={{ backgroundColor: selectedRouteId === schedule.route.id ? "#ff5722" : "#ccc", color: "white" }}
                    >
                      Chọn chuyến
                    </button>
                  </div>
                  {/* Nội dung hiển thị dựa trên tab */}
                  <div className="tab-content active">
                      {selectedTab[schedule.id] === "Chọn ghế" && <SeatSelectionForm routeId = {schedule.route.id} routePrice = {schedule.price} />}
                      {selectedTab[schedule.id] === "Lịch trình" && <ScheduleForm routeId = {schedule.route.id} routePrice = {schedule.price} />}
                      {selectedTab[schedule.id] === "Chính sách" && <PolicyForm routeId = {schedule.route.id} routePrice = {schedule.price} />}
                     </div>
                </div>
              ))
            ) : (
              <p>Không có tuyến nào phù hợp.</p>
            )}
          </SearchResultsList>
        </SearchResultsContainer>
      </SearchResultsWrapper>
    </Container>
  );
};

export default SearchResultsPage;

