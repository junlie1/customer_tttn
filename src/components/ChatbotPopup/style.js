import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
`;

export const ChatBox = styled.div`
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 360px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  z-index: 1001;
  overflow: hidden;
`;


export const Header = styled.div`
  background: #ff5722;
  color: white;
  padding: 12px;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BotName = styled.span`
  font-size: 16px;
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

export const MessageArea = styled.div`
  padding: 10px;
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: #f6f6f6;
`;

export const MessageBubble = styled.div`
  background: #e1f5fe;
  color: #333;
  padding: 10px;
  border-radius: 10px;
  max-width: 90%;
  white-space: pre-wrap;
  align-self: flex-start;
`;

export const UserBubble = styled.div`
  background: #c8e6c9;
  color: #333;
  padding: 10px;
  border-radius: 10px;
  max-width: 90%;
  align-self: flex-end;
`;

export const QuickButton = styled.button`
  background: #ffeb3b;
  border: none;
  padding: 8px 14px;
  margin: 8px auto;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
`;

export const InputArea = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
`;

export const InputField = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  outline: none;
`;

export const SendButton = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  padding: 10px 16px;
  cursor: pointer;
`;
