import React, { useState } from 'react';
import { Search, Edit, Video, Phone, Info } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useApp } from '../context/AppContext';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

interface Chat {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  lastMessage: string;
  timestamp: number;
  unread: boolean;
  online: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: number;
  type: 'text' | 'image';
}

const MessagesPage = () => {
  const { currentUser, users } = useApp();
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock chats data
  const chats: Chat[] = [
    {
      id: '1',
      userId: 'user2',
      username: 'nature_photography',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
      lastMessage: 'Hey! Love your latest post 📸',
      timestamp: Date.now() - 1800000,
      unread: true,
      online: true,
    },
    {
      id: '2',
      userId: 'user3',
      username: 'food_lover',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
      lastMessage: 'Thanks for the recipe!',
      timestamp: Date.now() - 3600000,
      unread: false,
      online: false,
    },
    {
      id: '3',
      userId: 'user4',
      username: 'travel_adventures',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
      lastMessage: 'Where was this photo taken?',
      timestamp: Date.now() - 7200000,
      unread: true,
      online: true,
    },
  ];

  // Mock messages for selected chat
  const messages: Message[] = [
    {
      id: '1',
      senderId: 'user2',
      text: 'Hey! Love your latest post 📸',
      timestamp: Date.now() - 1800000,
      type: 'text',
    },
    {
      id: '2',
      senderId: currentUser?.id || '',
      text: 'Thank you! It was taken at sunset',
      timestamp: Date.now() - 1700000,
      type: 'text',
    },
    {
      id: '3',
      senderId: 'user2',
      text: 'The colors are amazing! What camera did you use?',
      timestamp: Date.now() - 1600000,
      type: 'text',
    },
  ];

  const selectedChatData = chats.find(chat => chat.id === selectedChat);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In a real app, this would send the message to the backend
    setNewMessage('');
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return "now";
    }
  };

  const formatMessageTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={() => {}} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader title="Messages" showBackButton />

        <div className="flex h-screen">
          {/* Chat list */}
          <div className={`w-full lg:w-96 border-r border-gray-200 dark:border-gray-800 ${selectedChat ? 'hidden lg:block' : 'block'}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-semibold dark:text-white hidden lg:block">Messages</h1>
                <Button variant="ghost" size="icon">
                  <Edit className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                />
              </div>
            </div>

            {/* Chat list */}
            <div className="overflow-y-auto">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat.id)}
                  className={`flex items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer ${
                    selectedChat === chat.id ? 'bg-gray-50 dark:bg-gray-900' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={chat.userAvatar} alt={chat.username} />
                      <AvatarFallback>
                        {chat.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black"></div>
                    )}
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm dark:text-white truncate">{chat.username}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{formatTime(chat.timestamp)}</span>
                    </div>
                    <p className={`text-sm truncate ${chat.unread ? 'font-medium text-black dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                      {chat.lastMessage}
                    </p>
                  </div>
                  
                  {chat.unread && (
                    <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat window */}
          <div className={`flex-1 flex flex-col ${selectedChat ? 'block' : 'hidden lg:flex'}`}>
            {selectedChat && selectedChatData ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden"
                      onClick={() => setSelectedChat(null)}
                    >
                      ←
                    </Button>
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={selectedChatData.userAvatar} alt={selectedChatData.username} />
                      <AvatarFallback>
                        {selectedChatData.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-sm dark:text-white">{selectedChatData.username}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {selectedChatData.online ? 'Active now' : 'Active 2h ago'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === currentUser?.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                          message.senderId === currentUser?.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === currentUser?.id ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {formatMessageTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                  <div className="flex items-center space-x-2">
                    <Input
                      placeholder="Message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Send
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 text-gray-400">
                    <svg fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 dark:text-white">Your Messages</h3>
                  <p className="text-gray-500 dark:text-gray-400">Send private photos and messages to a friend or group.</p>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                    Send Message
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile bottom padding */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </div>
  );
};

export default MessagesPage;