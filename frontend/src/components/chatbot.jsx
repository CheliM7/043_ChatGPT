import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai'; // Import the close icon

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'I am an AI chatbot designed to answer questions related to Sri Lankan elections. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(false); // State to control accordion visibility
  const chatHistoryRef = useRef(null);

  useEffect(() => {
    if (isOpen && chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const userMessage = { from: 'user', text: input.trim() };
      const botReply = generateBotReply(input.trim());

      setMessages([...messages, userMessage, { from: 'bot', text: botReply }]);
      setInput('');
    }
  };

  const generateBotReply = (userMessage) => {
    if (userMessage.toLowerCase().includes('hello')) {
      return 'I am an AI chatbot designed to answer questions related to Sri Lankan elections. How can I help you today?';
    } else if (userMessage.toLowerCase().includes('bye')) {
      return 'Goodbye! Feel free to come back anytime.';
    } else {
      return "I'm here to help. Could you clarify your question?";
    }
  };

  const handleInputChange = (e) => setInput(e.target.value);

  return (
    <ChatbotContainer>
      {!isOpen ? (
        <ToggleContainer onClick={() => setIsOpen(true)}>
          <ToggleButton>Chat with us</ToggleButton>
        </ToggleContainer>
      ) : (
        <ChatWindow>
          <CloseIcon onClick={() => setIsOpen(false)}>
            <AiOutlineClose />
          </CloseIcon>
          <ChatHistory ref={chatHistoryRef}>
            {messages.map((message, index) => (
              <ChatMessage key={index} from={message.from}>
                {message.text}
              </ChatMessage>
            ))}
          </ChatHistory>
          <ChatInput>
            <InputField
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <SendButton onClick={handleSendMessage}>Send</SendButton>
          </ChatInput>
        </ChatWindow>
      )}
    </ChatbotContainer>
  );
};

// Styled Components
const ChatbotContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  background-color: #ececec; /* Very light ash background */
  border-radius: 15px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.1);
  font-family: 'Roboto', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ToggleContainer = styled.div`
  cursor: pointer;
  padding: 10px;
  text-align: center;
  background-color: #f5e8d0; /* Light brown shade */
  border: 2px solid #4a1f1a;
  border-radius: 10px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const ToggleButton = styled.div`
  font-size: 16px;
  padding: 10px 20px;
  text-transform: uppercase;
  cursor: pointer;
  background-color: transparent;
  color: #4a1f1a;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const ChatWindow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 600px;
  position: relative;
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  cursor: pointer;
  font-size: 24px;
  color: #4a1f1a;
  transition: color 0.3s ease;
  &:hover {
    color: #8b0000;
  }
`;

const ChatHistory = styled.div`
  padding: 20px;
  background-color: white;
  overflow-y: auto;
  flex: 1;
  border-radius: 0 0 15px 15px;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.05);
`;

const ChatMessage = styled.div`
  padding: 15px;
  margin: 10px 0;
  border-radius: 20px;
  max-width: 90%; /* Increased width to take up more space */
  word-break: break-word;
  background-color: ${({ from }) => (from === 'bot' ? '#4a1f1a' : '#f4c300')};
  color: ${({ from }) => (from === 'bot' ? 'white' : '#4a1f1a')};
  align-self: ${({ from }) => (from === 'bot' ? 'flex-start' : 'flex-end')};
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: ${({ from }) => (from === 'bot' ? '#3b1915' : '#e6b500')};
    transform: scale(1.02);
  }
`;

const ChatInput = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 0 0 15px 15px;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.05);
`;

const InputField = styled.input`
  flex: 1;
  padding: 15px;
  border: none;
  border-radius: 10px;
  margin-right: 10px;
  outline: none;
  background-color: #eaeaea;
  font-size: 16px;
  color: #4a1f1a;
  box-shadow: inset 0px 0px 5px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  &:focus {
    background-color: #fff;
  }
`;

const SendButton = styled.button`
  padding: 15px 20px;
  background-color: #4a1f1a;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #8b0000;
    transform: scale(1.05);
  }
  &:active {
    background-color: #7a0000;
    transform: scale(0.98);
  }
`;

export default Chatbot;
