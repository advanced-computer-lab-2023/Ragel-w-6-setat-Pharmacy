// Chat.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button} from 'reactstrap';
import {io} from 'socket.io-client';



const Chat = ({ pharmacistId, patientId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

    const socket = io('http://localhost:8080');


  useEffect(() => {
    // Fetch initial chat messages
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${pharmacistId}/${patientId}`);
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();
  }, [pharmacistId, patientId]);

  const handleSendMessage = async () => {
    try {
      await axios.post(`/api/chat/${pharmacistId}/${patientId}`, { message: newMessage });
      setNewMessage('');
      // Fetch updated messages after sending a new message
      const response = await axios.get(`/api/chat/${pharmacistId}/${patientId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <strong>{message.sender}: </strong>
            {message.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
