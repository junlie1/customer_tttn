import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const TicketList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const TicketItem = styled.div`
  background: #f9f9f9;
  padding: 15px;
  border-radius: 8px;
  border-left: 5px solid #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

export const TicketDetail = styled.p`
  margin: 5px 0;
  font-size: 16px;
  color: #555;
  strong {
    color: #222;
  }
`;
