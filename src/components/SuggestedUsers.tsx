import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';

const SuggestedUsers = () => {
  const { currentUser, users, followUser } = useApp();

  // Get users that current user is not following
  const suggestedUsers = users.filter(user => 
    user.id !== currentUser?.id && 
    !currentUser?.following.includes(user.id)
  ).slice(0, 5);

  const handleFollow = (userId: string) => {
    followUser(userId);
  };

  return (
    <div className="space-y-4">
      {/* Current user info */}
      {currentUser && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
              <AvatarFallback>
                {currentUser.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm dark:text-white">{currentUser.username}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{currentUser.displayName}</p>
            </div>
          </div>
          <Button variant="ghost" className="text-blue-500 text-sm font-semibold">
            Switch
          </Button>
        </div>
      )}

      {/* Suggested for you */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
            Suggested for you
          </h3>
          <Button variant="ghost" className="text-xs text-black dark:text-white font-semibold p-0">
            See All
          </Button>
        </div>

        <div className="space-y-3">
          {suggestedUsers.map(user => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.username} />
                  <AvatarFallback>
                    {user.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm dark:text-white">{user.username}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Followed by {user.followers.length > 0 ? `${user.followers.length} others` : 'New to Instagram'}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleFollow(user.id)}
                className="text-blue-500 font-semibold text-xs p-0"
              >
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer links */}
      <div className="text-xs text-gray-400 space-y-1 pt-4">
        <div className="flex flex-wrap gap-1">
          <span>About</span> · <span>Help</span> · <span>Press</span> · <span>API</span> · 
          <span>Jobs</span> · <span>Privacy</span> · <span>Terms</span> · 
          <span>Locations</span> · <span>Language</span> · <span>Meta Verified</span>
        </div>
        <p className="text-gray-500">© 2025 INSTAGRAM FROM META</p>
      </div>
    </div>
  );
};

export default SuggestedUsers;