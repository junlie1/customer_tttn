import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { historyService } from '../../services/historyService';
import { Container, Title, TicketList, TicketItem, TicketDetail } from './style';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';

const HistoryPage = () => {
  const [tickets, setTickets] = useState([]);
  const user = useSelector((state) => state.user.user);
  const customerId = user?.uid;

  useEffect(() => {
    const fetchTicketById = async () => {
      try {
        if (!customerId) return;
        const response = await historyService.getTicketByCustomerId(customerId);
        const filteredTickets = response.data.filter(ticket => 
          ticket.status === 'pending' || ticket.status === 'booking'
        );
        setTickets(filteredTickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };
    fetchTicketById();
  }, [customerId]);

  return (
<>
    <HeaderComponent />
    <Container>
      <Title>Lịch sử đặt vé</Title>
      {tickets.length > 0 ? (
        <TicketList>
          {tickets.map((ticket) => (
            <TicketItem key={ticket.id}>
              <TicketDetail>
                <strong>Mã đơn hàng:</strong> {ticket.orderId}
              </TicketDetail>
              <TicketDetail>
                <strong>Từ:</strong> {ticket.from} → <strong>Đến:</strong> {ticket.to}
              </TicketDetail>
              <TicketDetail>
                <strong>Ngày khởi hành:</strong> {new Date(ticket.departureTime).toLocaleString()}
              </TicketDetail>
              <TicketDetail>
                <strong>Giá vé:</strong> {ticket.price.toLocaleString()} VND
              </TicketDetail>
              <TicketDetail>
                <strong>Ghế:</strong> {ticket.seatNumber.join(', ')}
              </TicketDetail>
              <TicketDetail>
                <strong>Trạng thái:</strong> {ticket.status}
              </TicketDetail>
            </TicketItem>
          ))}
        </TicketList>
      ) : (
        <p>Không có lịch sử đặt vé.</p>
      )}
    </Container>  
</>
  );
};

export default HistoryPage;
