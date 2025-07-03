import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const SearchPage = () => {
  const { users, posts, currentUser, followUser, unfollowUser } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'top' | 'accounts' | 'tags'>('top');

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.displayName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = posts.filter(post =>
    post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularTags = ['photography', 'travel', 'food', 'nature', 'sunset', 'coffee'];

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

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={() => {}} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader title="Search" showBackButton />

        <div className="max-w-2xl mx-auto p-4">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {searchQuery ? (
            <>
              {/* Search Tabs */}
              <div className="flex space-x-8 border-b border-gray-200 dark:border-gray-800 mb-6">
                <button
                  onClick={() => setActiveTab('top')}
                  className={`pb-3 text-sm font-medium ${
                    activeTab === 'top' 
                      ? 'border-b-2 border-black dark:border-white text-black dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Top
                </button>
                <button
                  onClick={() => setActiveTab('accounts')}
                  className={`pb-3 text-sm font-medium ${
                    activeTab === 'accounts' 
                      ? 'border-b-2 border-black dark:border-white text-black dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Accounts
                </button>
                <button
                  onClick={() => setActiveTab('tags')}
                  className={`pb-3 text-sm font-medium ${
                    activeTab === 'tags' 
                      ? 'border-b-2 border-black dark:border-white text-black dark:text-white' 
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  Tags
                </button>
              </div>

              {/* Search Results */}
              {activeTab === 'top' && (
                <div className="space-y-6">
                  {/* Accounts */}
                  {filteredUsers.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 dark:text-white">Accounts</h3>
                      <div className="space-y-3">
                        {filteredUsers.slice(0, 3).map(user => (
                          <div key={user.id} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={user.avatar} alt={user.username} />
                                <AvatarFallback>
                                  {user.username.slice(0, 2).toUpperCase()}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-sm dark:text-white">{user.username}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{user.displayName}</p>
                                <p className="text-xs text-gray-400">{user.followers.length} followers</p>
                              </div>
                            </div>
                            {currentUser?.id !== user.id && (
                              <Button
                                variant={user.followers.includes(currentUser?.id || '') ? 'outline' : 'default'}
                                size="sm"
                                onClick={() => handleFollow(user.id)}
                                className={user.followers.includes(currentUser?.id || '') ? '' : 'bg-blue-500 hover:bg-blue-600'}
                              >
                                {user.followers.includes(currentUser?.id || '') ? 'Following' : 'Follow'}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Posts Grid */}
                  {filteredPosts.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3 dark:text-white">Posts</h3>
                      <div className="grid grid-cols-3 gap-1">
                        {filteredPosts.slice(0, 9).map(post => (
                          <div key={post.id} className="aspect-square">
                            <img
                              src={post.imageUrl}
                              alt={post.caption}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'accounts' && (
                <div className="space-y-3">
                  {filteredUsers.map(user => (
                    <div key={user.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={user.avatar} alt={user.username} />
                          <AvatarFallback>
                            {user.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-sm dark:text-white">{user.username}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{user.displayName}</p>
                          <p className="text-xs text-gray-400">{user.followers.length} followers</p>
                        </div>
                      </div>
                      {currentUser?.id !== user.id && (
                        <Button
                          variant={user.followers.includes(currentUser?.id || '') ? 'outline' : 'default'}
                          size="sm"
                          onClick={() => handleFollow(user.id)}
                          className={user.followers.includes(currentUser?.id || '') ? '' : 'bg-blue-500 hover:bg-blue-600'}
                        >
                          {user.followers.includes(currentUser?.id || '') ? 'Following' : 'Follow'}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'tags' && (
                <div className="grid grid-cols-3 gap-1">
                  {filteredPosts.map(post => (
                    <div key={post.id} className="aspect-square relative">
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2">
                        <div className="flex flex-wrap gap-1">
                          {post.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="text-xs bg-black/50 text-white px-1 rounded">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Explore Content */
            <div>
              <h2 className="text-lg font-semibold mb-4 dark:text-white">Explore</h2>
              
              {/* Popular Tags */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 dark:text-white">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(`#${tag}`)}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explore Grid */}
              <div className="grid grid-cols-3 gap-1">
                {posts.map(post => (
                  <div key={post.id} className="aspect-square relative group cursor-pointer">
                    <img
                      src={post.imageUrl}
                      alt={post.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-4 text-white">
                        <div className="flex items-center space-x-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                          </svg>
                          <span className="font-semibold">{post.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Mobile bottom padding */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </div>
  );
};

export default SearchPage;