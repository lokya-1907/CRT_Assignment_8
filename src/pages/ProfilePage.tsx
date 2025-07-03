import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Grid, Settings, Bookmark, TagIcon, ArrowLeft, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "../context/AppContext";
import { Post } from "../types";
import MobileHeader from "../components/MobileHeader";
import Sidebar from "../components/Sidebar";

const ProfilePage = () => {
  const { currentUser, posts, users } = useApp();
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  const userPosts = posts.filter(post => post.userId === currentUser.id);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
  };

  const closePostModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={() => {}} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader title={currentUser.username} showBackButton />

        {/* Desktop header */}
        <header className="hidden lg:block sticky top-0 z-10 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-4">
          <div className="max-w-screen-md mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="h-6 w-6 mr-2" />
              <span className="font-semibold dark:text-white">{currentUser.username}</span>
            </Link>
            <div className="flex space-x-4">
              <Settings className="h-6 w-6 cursor-pointer hover:text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </header>

        {/* Profile Header */}
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="h-24 w-24 md:h-36 md:w-36">
              <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
              <AvatarFallback>
                {currentUser.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
                  {currentUser.username}
                  {currentUser.isVerified && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </h1>
                <Button variant="outline" size="sm" className="px-4 py-1">
                  Edit Profile
                </Button>
              </div>

              <div className="flex gap-8 mb-4">
                <div className="text-center md:text-left">
                  <span className="font-semibold dark:text-white">{userPosts.length}</span> 
                  <span className="text-gray-600 dark:text-gray-400"> posts</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-semibold dark:text-white">{currentUser.followers.length}</span> 
                  <span className="text-gray-600 dark:text-gray-400"> followers</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-semibold dark:text-white">{currentUser.following.length}</span> 
                  <span className="text-gray-600 dark:text-gray-400"> following</span>
                </div>
              </div>

              <div className="text-sm text-center md:text-left">
                <p className="font-medium dark:text-white">{currentUser.displayName}</p>
                <p className="dark:text-gray-300">{currentUser.bio}</p>
                {currentUser.website && (
                  <p className="text-blue-500">{currentUser.website}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8">
          <Tabs defaultValue="posts" className="container mx-auto">
            <TabsList className="grid grid-cols-3 max-w-md mx-auto bg-transparent border-0">
              <TabsTrigger 
                value="posts" 
                className="flex items-center gap-2 data-[state=active]:border-t-2 data-[state=active]:border-black dark:data-[state=active]:border-white rounded-none bg-transparent"
              >
                <Grid size={16} />
                <span className="hidden sm:inline">Posts</span>
              </TabsTrigger>
              <TabsTrigger 
                value="saved" 
                className="flex items-center gap-2 data-[state=active]:border-t-2 data-[state=active]:border-black dark:data-[state=active]:border-white rounded-none bg-transparent"
              >
                <Bookmark size={16} />
                <span className="hidden sm:inline">Saved</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tagged" 
                className="flex items-center gap-2 data-[state=active]:border-t-2 data-[state=active]:border-black dark:data-[state=active]:border-white rounded-none bg-transparent"
              >
                <TagIcon size={16} />
                <span className="hidden sm:inline">Tagged</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              {userPosts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 mb-4 text-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 text-center">
                    No posts yet. Share your first photo!
                  </p>
                  <Link to="/" className="mt-4">
                    <Button variant="outline">
                      Create your first post
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-1 md:gap-4">
                  {userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="aspect-square relative cursor-pointer group"
                      onClick={() => handlePostClick(post)}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.caption}
                        className="w-full h-full object-cover hover:opacity-90 transition-opacity"
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
              )}
            </TabsContent>

            <TabsContent value="saved" className="mt-6">
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <Bookmark className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No saved posts yet</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="tagged" className="mt-6">
              <div className="flex justify-center items-center py-12">
                <div className="text-center">
                  <TagIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No tagged posts</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Post Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-900 max-w-4xl w-full rounded-lg overflow-hidden max-h-[90vh]">
              <div className="flex flex-col md:flex-row h-full">
                <div className="md:w-2/3 bg-black flex items-center justify-center">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.caption}
                    className="max-h-[60vh] md:max-h-[80vh] max-w-full object-contain"
                  />
                </div>
                <div className="md:w-1/3 p-4 flex flex-col">
                  <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser.avatar} alt={currentUser.username} />
                      <AvatarFallback>
                        {currentUser.username.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium dark:text-white">{currentUser.username}</span>
                  </div>
                  <div className="py-4 flex-grow">
                    <p className="text-sm dark:text-white">{selectedPost.caption}</p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {new Date(selectedPost.timestamp).toLocaleDateString()}
                  </div>
                  <Button
                    onClick={closePostModal}
                    variant="outline"
                    className="w-full"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile bottom padding */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </div>
  );
};

export default ProfilePage;