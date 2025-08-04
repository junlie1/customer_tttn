import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useRoutesMap } from '../../hooks/useRoutesMap';
import { useSeatLayoutMap } from '../../hooks/useSeatLayoutMap';

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
    const { data: schedules } = useSelector((state) => state.schedules);
    const now = new Date();

    const upcoming = schedules
        .filter(item => {
            const depTime = new Date(item.departureTime);
            return item.status !== 'completed' && depTime < now;
        })
        .sort((a, b) => new Date(a.departureTime) - new Date(b.departureTime))
        .slice(0, 5);

    const routesMap = useRoutesMap(upcoming);
    const seatLayoutMap = useSeatLayoutMap(upcoming);

    const calculateAvailableSeats = (seatLayout) => {
        if (!seatLayout) return 0;
        const floor1Seats = Object.values(seatLayout.floor1 || {});
        const floor2Seats = Object.values(seatLayout.floor2 || {});
        const allSeats = [...floor1Seats, ...floor2Seats];
        return allSeats.filter(seat => seat.isBooked === false).length;
    };


    return (
        <NoticeWrapper>
            <marquee behavior="scroll" direction="left" scrollamount="4">
                {upcoming.length === 0 ? (
                    <>Không có lịch trình nào đang hoạt động. Vui lòng liên hệ tổng đài: 038512xxxx để nhận tư vấn.</>
                ) : (
                    upcoming.map((s, i) => {
                        const route = routesMap[s.routeId];
                        const seatLayout = seatLayoutMap[s.seatLayoutId];
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

                        const routeName = route
                            ? `${route.startPoint} → ${route.endPoint}`
                            : `Tuyến ${s.routeId}`;
                        const availableSeats = calculateAvailableSeats(seatLayout);

                        return (
                            `🚍 ${routeName} | ${timeStr} ${dateStr} | còn ${availableSeats} ghế${i < upcoming.length - 1 ? ' — ' : ''}`
                        );
                    })
                )}
            </marquee>
        </NoticeWrapper>
    );

};

export default UpcomingScheduleNotice;
