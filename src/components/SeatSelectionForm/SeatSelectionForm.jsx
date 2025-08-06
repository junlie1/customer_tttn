import React, { useEffect, useMemo, useState } from 'react';
import { routeService } from '../../services/routeService';
import { schedulesService } from '../../services/schedulesService';
import {
  Container,
  LegendContainer,
  LegendItem,
  LegendSeat,
  SeatContainer,
  Seat,
  FloorTitle,
  PaymentActionsContainer,
  PaymentButton
} from './style';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SeatSelectionForm = ({ schedule, seatLayout, route }) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState({
    floor1: [],
    floor2: []
  });
  const user = useSelector((state) => state.user.user);

  const handleSeatClick = (floor, seatNumber, seatData) => {
    if (seatData.isBooked) return;
    setSelectedSeats(prev => {
      const floorSelection = prev[floor] || [];
      if (floorSelection.includes(seatNumber)) {
        return {
          ...prev,
          [floor]: floorSelection.filter(seat => seat !== seatNumber)
        };
      } else {
        return {
          ...prev,
          [floor]: [...floorSelection, seatNumber]
        };
      }
    });
  };

  const totalSelectedSeats = [
    ...selectedSeats.floor1,
    ...selectedSeats.floor2
  ];
  const totalPrice = totalSelectedSeats.length * route?.price * 1000;
  const totalPriceFormatted = totalPrice.toLocaleString('vi-VN') + " VNĐ";

  const handleNavigatePayment = () => {
    const paymentData = {
      routeId: route?.id,
      routeName: route?.routeName,
      selectedSeats: totalSelectedSeats,
      routePrice: route?.price,
      totalPrice: totalPriceFormatted,
      userData: user,
      selectedSchedule: schedule,
      vendorId: schedule?.vendorId,
      route: route
    };
    navigate(`/payment?${schedule?.routeId}&${route?.price}${user.uid}&${route?.routeName}`, { state: paymentData });
  };

  return (
    <Container>
      <h3>Chọn ghế cho chuyến: {route?.routeName || "Đang tải..."}</h3>

      <LegendContainer>
        <LegendItem>
          <LegendSeat bgColor="#ccc" />
          <span>Đã bán</span>
        </LegendItem>
        <LegendItem>
          <LegendSeat bgColor="#fff" />
          <span>Còn trống</span>
        </LegendItem>
        <LegendItem>
          <LegendSeat bgColor="#58afff" />
          <span>Đang chọn</span>
        </LegendItem>
      </LegendContainer>

      {seatLayout ? (
        <div>
          <h4>Sơ đồ ghế:</h4>
          <FloorTitle>Tầng dưới</FloorTitle>
          <SeatContainer>
            {Object.entries(seatLayout.floor1).map(
              ([seatNumber, seatData]) => {
                let status = 'available';
                if (seatData.isBooked) {
                  status = 'sold';
                } else if (selectedSeats.floor1.includes(seatNumber)) {
                  status = 'selected';
                }
                return (
                  <Seat
                    key={seatNumber}
                    status={status}
                    onClick={() => {
                      if (!seatData.isBooked) {
                        handleSeatClick('floor1', seatNumber, seatData);
                      }
                    }}
                  >
                    {seatNumber}
                  </Seat>
                );
              }
            )}
          </SeatContainer>

          {seatLayout.floor2 && (
            <>
              <FloorTitle>Tầng trên</FloorTitle>
              <SeatContainer>
                {Object.entries(seatLayout.floor2).map(
                  ([seatNumber, seatData]) => {
                    let status = 'available';
                    if (seatData.isBooked) {
                      status = 'sold';
                    } else if (selectedSeats.floor2.includes(seatNumber)) {
                      status = 'selected';
                    }
                    return (
                      <Seat
                        key={seatNumber}
                        status={status}
                        onClick={() => {
                          if (!seatData.isBooked) {
                            handleSeatClick('floor2', seatNumber, seatData);
                          }
                        }}
                      >
                        {seatNumber}
                      </Seat>
                    );
                  }
                )}
              </SeatContainer>
            </>
          )}
        </div>
      ) : (
        <p>Không có lịch trình nào phù hợp.</p>
      )}

      <div style={{ marginTop: '30px' }}>
        <strong>Ghế được chọn tầng dưới:</strong> {selectedSeats.floor1.join(", ")}
      </div>
      <div>
        <strong>Ghế được chọn tầng trên:</strong> {selectedSeats.floor2.join(", ")}
      </div>

      {(selectedSeats.floor1.length > 0 || selectedSeats.floor2.length > 0) && (
        <PaymentActionsContainer>
          <p>
            <strong>Tổng tiền:</strong> {totalPriceFormatted}
          </p>
          <PaymentButton onClick={handleNavigatePayment}>
            Chọn
          </PaymentButton>
        </PaymentActionsContainer>
      )}
    </Container>
  );
};

export default SeatSelectionForm;
