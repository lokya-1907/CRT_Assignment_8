import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

const allPosts = [
  // Replace with your actual data or fetch from API
  { id: 1, imageUrl: 'https://via.placeholder.com/150', caption: 'Post 1', likes: 10, comments: [] },
  { id: 2, imageUrl: 'https://via.placeholder.com/150', caption: 'Post 2', likes: 20, comments: [] },
  { id: 3, imageUrl: 'https://via.placeholder.com/150', caption: 'Post 3', likes: 30, comments: [] },
  { id: 4, imageUrl: 'https://via.placeholder.com/150', caption: 'Post 4', likes: 40, comments: [] },
  { id: 5, imageUrl: 'https://via.placeholder.com/150', caption: 'Post 5', likes: 50, comments: [] },
  { id: 6, imageUrl: 'https://via.placeholder.com/150', caption: 'Post 6', likes: 60, comments: [] },
  // ...add more posts
];

const PAGE_SIZE = 3;

interface ExplorePageProps {
  onCreatePost: () => void;
}

const ExplorePage: React.FC<ExplorePageProps> = ({ onCreatePost }) => {
  const { posts } = useApp(); // these are user-created posts
  const [visiblePosts, setVisiblePosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  // Combine user posts and static posts (optional)
  const combinedPosts = [...posts, ...allPosts];

  useEffect(() => {
    setVisiblePosts(combinedPosts.slice(0, PAGE_SIZE * page));
  }, [page, posts]); // add posts as dependency

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // Create a grid layout with different sizes
  const getGridItemClass = (index: number) => {
    const patterns = [
      'col-span-1 row-span-1', // small
      'col-span-2 row-span-2', // large
      'col-span-1 row-span-2', // tall
      'col-span-2 row-span-1', // wide
      'col-span-1 row-span-1', // small
      'col-span-1 row-span-1', // small
    ];
    return patterns[index % patterns.length];
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={onCreatePost} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader title="Explore" showBackButton />

        <div className="p-4">
          <h1 className="text-xl font-semibold mb-6 dark:text-white hidden lg:block">Explore</h1>
          
          {/* Trending hashtags */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3 dark:text-white">Trending</h2>
            <div className="flex flex-wrap gap-2">
              {['photography', 'travel', 'food', 'nature', 'sunset', 'coffee', 'art', 'music'].map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition-colors dark:text-white"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Posts grid */}
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-1 auto-rows-[200px]">
            {visiblePosts.map((post, index) => (
              <div
                key={post.id}
                className={`relative group cursor-pointer overflow-hidden ${getGridItemClass(index)}`}
                onClick={() => setSelectedPost(post.id)}
              >
                <img
                  src={post.imageUrl}
                  alt={post.caption}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-6 text-white">
                    <div className="flex items-center space-x-2">
                      <Heart className="w-6 h-6 fill-white" />
                      <span className="font-semibold">{post.likes}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MessageCircle className="w-6 h-6 fill-white" />
                      <span className="font-semibold">{post.comments.length}</span>
                    </div>
                  </div>
                </div>

                {/* Multiple photos indicator */}
                {index % 4 === 0 && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2zm-11.5-6L8 13h12l-3.5-5-2.5 3.01L10.5 10z"/>
                      <path d="M2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z"/>
                    </svg>
                  </div>
                )}

                {/* Video indicator */}
                {index % 5 === 0 && (
                  <div className="absolute top-2 right-2">
                    <svg className="w-4 h-4 text-white drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load more */}
          <div className="text-center mt-8">
            <button className="px-6 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors dark:text-white" onClick={handleLoadMore}>
              Load More
            </button>
          </div>
        </div>

        {/* Mobile bottom padding */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </div>
  );
};

export default ExplorePage;