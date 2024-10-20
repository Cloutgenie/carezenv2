import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Bell, Search } from 'lucide-react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

interface Message {
  id: number;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
}

interface SecureMessagingProps {
  userRole: 'patient' | 'doctor' | 'admin';
  userName: string;
}

const SecureMessaging: React.FC<SecureMessagingProps> = ({ userRole, userName }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:3000'); // Replace with your actual WebSocket server URL

    socketRef.current.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socketRef.current.on('newMessage', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
      if (message.recipient === userName && !message.read) {
        setUnreadCount(prevCount => prevCount + 1);
        addNotification({
          id: Date.now(),
          message: `New message from ${message.sender}`,
          type: 'info',
          timestamp: new Date().toLocaleString()
        });
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userName, addNotification]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
      setMessages(prevMessages => [...prevMessages, newMsg]);
      setNewMessage('');
      if (socketRef.current) {
        socketRef.current.emit('sendMessage', newMsg);
      }
    }
  };

  const filteredMessages = messages.filter(msg => 
    (msg.sender === userName && msg.recipient === selectedRecipient) ||
    (msg.recipient === userName && msg.sender === selectedRecipient)
  );

  const getRecipients = () => {
    switch (userRole) {
      case 'doctor':
        return ['Admin', ...new Set(messages.filter(msg => msg.sender !== userName).map(msg => msg.sender))];
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

  const filteredRecipients = getRecipients().filter(recipient =>
    recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-6 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Secure Messages</h2>
        <div className="relative">
          <Bell className="w-6 h-6 text-gray-500" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
      </div>
      <div className="mb-4 relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search recipients..."
          className="w-full p-2 pl-8 border rounded-md"
        />
        <Search className="absolute left-2 top-2.5 text-gray-400" />
      </div>
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
          {filteredRecipients.map(recipient => (
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
            <div ref={messagesEndRef} />
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

export default SecureMessaging;