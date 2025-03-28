import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { historyService } from '../../services/historyService';
import { Container, Title, TicketList, TicketItem, TicketDetail } from './style';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';

const HistoryPage = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  
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

  // Xử lý mở modal
  const handleOpenModal = (ticket) => {
    setSelectedTicket(ticket);
    setOpenModal(true);
  };

  // Xử lý đóng modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTicket(null);
  };

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
                <Button variant="contained" color="primary" onClick={() => handleOpenModal(ticket)}>
                  Xem chi tiết vé
                </Button>
              </TicketItem>
            ))}
          </TicketList>
        ) : (
          <p>Không có lịch sử đặt vé.</p>
        )}
      </Container>

      {/* Modal hiển thị chi tiết vé và QR Code */}
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <DialogTitle>Chi tiết vé</DialogTitle>
        <DialogContent>
          {selectedTicket && (
            <>
              <TicketDetail>
                <strong>Mã đơn hàng:</strong> {selectedTicket.orderId}
              </TicketDetail>
              <TicketDetail>
                <strong>Từ:</strong> {selectedTicket.from} → <strong>Đến:</strong> {selectedTicket.to}
              </TicketDetail>
              <TicketDetail>
                <strong>Ngày khởi hành:</strong> {new Date(selectedTicket.departureTime).toLocaleString()}
              </TicketDetail>
              <TicketDetail>
                <strong>Giá vé:</strong> {selectedTicket.price.toLocaleString()} VND
              </TicketDetail>
              <TicketDetail>
                <strong>Ghế:</strong> {selectedTicket.seatNumber.join(', ')}
              </TicketDetail>
              <TicketDetail>
                <strong>Trạng thái:</strong> {selectedTicket.status}
              </TicketDetail>

              {/* QR Code được tạo từ thông tin vé */}
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <QRCodeCanvas value={JSON.stringify(selectedTicket)} size={200} />
                <p>Quét mã QR để xác nhận vé</p>
              </div>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">Đóng</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default HistoryPage;
