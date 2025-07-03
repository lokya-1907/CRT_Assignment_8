import React, { useState } from "react";
import { PlusSquare, Search, Home, User, Heart, MessageCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import PostFeed from "../components/PostFeed";
import CreatePostModal from "../components/CreatePostModal";
import Sidebar from "../components/Sidebar";
import MobileHeader from "../components/MobileHeader";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const location = useLocation();

  const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={openCreatePostModal} />

      {/* Main content */}
      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader />

        {/* Main feed area */}
        <div className="flex max-w-6xl mx-auto">
          {/* Posts feed */}
          <div className="flex-1 max-w-xl mx-auto lg:mx-0">
            <div className="py-4 px-4 lg:px-8">
              <PostFeed />
            </div>
          </div>

          {/* Right sidebar - Suggested users (desktop only) */}
          <div className="hidden xl:block w-80 p-8">
            <SuggestedUsers />
          </div>
        </div>

        {/* Mobile navigation bar */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 p-3 z-50">
          <div className="flex justify-around items-center">
            <Link to="/">
              <Home className={`h-6 w-6 cursor-pointer ${isActive('/') ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`} />
            </Link>
            <Link to="/search">
              <Search className={`h-6 w-6 cursor-pointer ${isActive('/search') ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`} />
            </Link>
            <PlusSquare
              className="h-6 w-6 cursor-pointer text-gray-700 dark:text-gray-300"
              onClick={openCreatePostModal}
            />
            <Link to="/notifications">
              <Heart className={`h-6 w-6 cursor-pointer ${isActive('/notifications') ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`} />
            </Link>
            <Link to="/profile">
              <User className={`h-6 w-6 cursor-pointer ${isActive('/profile') ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`} />
            </Link>
          </div>
        </nav>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={closeCreatePostModal}
      />
    </div>
  );
};

export default HomePage;