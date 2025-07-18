import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { routeService } from '../../services/routeService';
import { schedulesService } from '../../services/schedulesService';

const NoticeWrapper = styled.div`
  background-color: #fff8e1;
  color: #ff6f00;
  font-weight: bold;
  font-size: 16px;
  padding: 12px 24px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const UpcomingScheduleNotice = () => {
    const [schedules, setSchedules] = useState([]);
    console.log("schedules", schedules);

    const [error, setError] = useState(false); // để xử lý khi gọi API lỗi

    useEffect(() => {
        const fetchUpcoming = async () => {
            try {
                const response = await schedulesService.getSchedules();

                const upcoming = response.data
                    .filter(item => item.status !== "completed")
                    .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime))
                    .slice(0, 5);

                setSchedules(upcoming);
            } catch (err) {
                console.error('Error fetching schedules:', err);
                setError(true);
            }
        };

        fetchUpcoming();
    }, []);

    const calculateAvailableSeat = (seatLayout) => {
        const seatsFloor1 = Object.values(seatLayout.floor1 || {});
        const seatsFloor2 = Object.values(seatLayout.floor2 || {});
        const allSeats = [
            ...seatsFloor1,
            ...seatsFloor2
        ];
        const availableSeats = allSeats.filter((seat) => seat.isBooked === false);
        return availableSeats.length;
    }

    return (
        <NoticeWrapper>
            <marquee behavior="scroll" direction="left" scrollamount="4">
                {error || schedules.length === 0 ? (
                    <>Không có lịch trình nào đang hoạt động. Vui lòng liên hệ tổng đài: 038512xxxx để nhận tư vấn.</>
                ) : (
                    schedules.map((s, i) => {
                        if (s.status === "upcoming") {
                            const depTime = new Date(s.departureTime);
                            const timeStr = depTime.toLocaleTimeString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false,
                                timeZone: 'Asia/Ho_Chi_Minh'
                            });
                            const dateStr = depTime.toLocaleDateString('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                timeZone: 'Asia/Ho_Chi_Minh'
                            });

                            return `🚍 ${s.route?.startPoint} → ${s.route?.endPoint} | ${timeStr} ${dateStr} | còn ${calculateAvailableSeat(s.seatLayout)} ghế${i < schedules.length - 1 ? ' — ' : ''
                                }`;
                        }
                        return "Không có lịch trình nào đang hoạt động. Vui lòng liên hệ tổng đài: 038512xxxx để nhận tư vấn."
                    })
                )}
            </marquee>
        </NoticeWrapper>
    );
};

export default UpcomingScheduleNotice;
