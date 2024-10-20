import React, { useState, useEffect } from 'react';
import { Send, MessageCircle, Bell } from 'lucide-react';
import io from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

interface Message {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface MessagingProps {
  userRole: 'patient' | 'doctor' | 'admin';
  userName: string;
}

const Messaging: React.FC<MessagingProps> = ({ userRole, userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const socket = io('http://localhost:3000'); // Replace with your actual WebSocket server URL

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('newMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
      if (message.recipient === userName && !message.read) {
        setUnreadCount(prevCount => prevCount + 1);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() !== '' && selectedRecipient !== '') {
      const newMsg: Message = {
        id: Date.now(),
        sender: userName,
        recipient: selectedRecipient,
        content: newMessage.trim(),
        timestamp: new Date().toISOString(),
        read: false,
      };
      setMessages([...messages, newMsg]);
      setNewMessage('');
      // In a real application, you would emit this message to the server
      // socket.emit('sendMessage', newMsg);
    }
  };

  const filteredMessages = messages.filter(msg => 
    (msg.sender === userName && msg.recipient === selectedRecipient) ||
    (msg.recipient === userName && msg.sender === selectedRecipient)
  );

  const getRecipients = () => {
    switch (userRole) {
      case 'doctor':
        return ['Admin'];
      case 'admin':
        return ['Dr. Smith', 'Dr. Johnson', 'John Doe', 'Jane Smith'];
      case 'patient':
        return ['Admin', 'Dr. Smith', 'Dr. Johnson'];
      default:
        return [];
    }
  };

  const markAsRead = () => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.recipient === userName ? { ...msg, read: true } : msg
      )
    );
    setUnreadCount(0);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Messages</h2>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
      {showNotification && (
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg">
          New message received!
        </div>
      )}
      <div className="mb-4">
        <select
          value={selectedRecipient}
          onChange={(e) => {
            setSelectedRecipient(e.target.value);
            markAsRead();
          }}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a recipient</option>
          {getRecipients().map(recipient => (
            <option key={recipient} value={recipient}>{recipient}</option>
          ))}
        </select>
      </div>
      {selectedRecipient && (
        <>
          <div className="h-64 overflow-y-auto mb-4 border rounded-md p-2">
            {filteredMessages.map((msg) => (
              <div key={msg.id} className={`mb-2 ${msg.sender === userName ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.sender === userName ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  <p className="font-semibold">{msg.sender}</p>
                  <p>{msg.content}</p>
                  <p className="text-xs text-gray-500">{new Date(msg.timestamp).toLocaleString()}</p>
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Messaging;