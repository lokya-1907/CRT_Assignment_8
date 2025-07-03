import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const NotificationsPage = () => {
  const { notifications, users, currentUser, followUser, unfollowUser } = useApp();

  const handleFollow = (userId: string) => {
    if (!currentUser) return;
    
    const user = users.find(u => u.id === userId);
    if (!user) return;

    if (user.followers.includes(currentUser.id)) {
      unfollowUser(userId);
    } else {
      followUser(userId);
    }
  };

  // Mock notifications for demo
  const mockNotifications = [
    {
      id: '1',
      type: 'like' as const,
      fromUserId: 'user2',
      fromUsername: 'nature_photography',
      fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
      message: 'liked your photo.',
      timestamp: Date.now() - 3600000,
      read: false,
    },
    {
      id: '2',
      type: 'follow' as const,
      fromUserId: 'user3',
      fromUsername: 'food_lover',
      fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
      message: 'started following you.',
      timestamp: Date.now() - 7200000,
      read: false,
    },
    {
      id: '3',
      type: 'comment' as const,
      fromUserId: 'user4',
      fromUsername: 'travel_adventures',
      fromUserAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
      message: 'commented: "Amazing shot! 📸"',
      timestamp: Date.now() - 10800000,
      read: true,
    },
  ];

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

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={() => {}} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader title="Notifications" showBackButton />

        <div className="max-w-md mx-auto p-4">
          <h1 className="text-xl font-semibold mb-6 dark:text-white hidden lg:block">Notifications</h1>
          
          <div className="space-y-4">
            {mockNotifications.map((notification) => {
              const user = users.find(u => u.id === notification.fromUserId);
              const isFollowing = user?.followers.includes(currentUser?.id || '') || false;
              
              return (
                <div
                  key={notification.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg ${
                    !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-black'
                  }`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={notification.fromUserAvatar} alt={notification.fromUsername} />
                    <AvatarFallback>
                      {notification.fromUsername.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <p className="text-sm dark:text-white">
                      <span className="font-semibold">{notification.fromUsername}</span>{' '}
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatTime(notification.timestamp)}</p>
                  </div>
                  
                  {notification.type === 'follow' && currentUser?.id !== notification.fromUserId && (
                    <Button
                      variant={isFollowing ? 'outline' : 'default'}
                      size="sm"
                      onClick={() => handleFollow(notification.fromUserId)}
                      className={isFollowing ? '' : 'bg-blue-500 hover:bg-blue-600'}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </Button>
                  )}
                  
                  {notification.type === 'like' && (
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {mockNotifications.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-gray-400">No notifications yet</p>
            </div>
          )}
        </div>

        {/* Mobile bottom padding */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </div>
  );
};

export default NotificationsPage;