import React, { useState } from 'react';
import {
  Overlay,
  ChatBox,
  Header,
  BotName,
  CloseBtn,
  MessageArea,
  MessageBubble,
  UserBubble,
  InputArea,
  InputField,
  SendButton
} from './style';

const ChatbotPopup = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 

  const handleSend = () => {
    if (!input.trim()) return;

    // ✅ Thêm tin nhắn người dùng vào danh sách
    setMessages([...messages, { from: 'user', text: input }]);
    setInput('');
  };

  return (
    <>
      <Overlay onClick={onClose} />
      <ChatBox>
        <Header>
          <BotName>🤖 Gotta Go - Trợ lý ảo</BotName>
          <CloseBtn onClick={onClose}>✖</CloseBtn>
        </Header>

        <MessageArea>
          {messages.map((msg, idx) =>
            msg.from === 'user' ? (
              <UserBubble key={idx}>{msg.text}</UserBubble>
            ) : (
              <MessageBubble key={idx}>{msg.text}</MessageBubble>
            )
          )}
        </MessageArea>

        <InputArea>
          <InputField
            placeholder="Nhập câu hỏi..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <SendButton onClick={handleSend}>Gửi</SendButton>
        </InputArea>
      </ChatBox>
    </>
  );
};

export default ChatbotPopup;
