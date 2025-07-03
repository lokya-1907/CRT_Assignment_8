import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { useApp } from '../context/AppContext';

const Stories = () => {
  const { stories, currentUser } = useApp();

  return (
    <div className="bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg p-4 mb-6">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
        {/* Current user's story */}
        <div className="flex flex-col items-center space-y-1 min-w-[70px]">
          <div className="relative">
            <Avatar className="h-16 w-16 ring-2 ring-gray-300 dark:ring-gray-600">
              <AvatarImage src={currentUser?.avatar} alt={currentUser?.username} />
              <AvatarFallback>
                {currentUser?.username?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400 text-center">Your story</span>
        </div>

        {/* Other users' stories */}
        {stories.map((story) => (
          <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[70px]">
            <Avatar className={`h-16 w-16 ring-2 ${
              story.viewed 
                ? 'ring-gray-300 dark:ring-gray-600' 
                : 'ring-gradient-to-r from-purple-500 to-pink-500 p-[2px] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full'
            }`}>
              <AvatarImage 
                src={story.userAvatar} 
                alt={story.username}
                className={!story.viewed ? 'ring-2 ring-white dark:ring-black rounded-full' : ''}
              />
              <AvatarFallback>
                {story.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs text-gray-600 dark:text-gray-400 text-center truncate w-16">
              {story.username}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stories;