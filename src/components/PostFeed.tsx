import React from "react";
import Post from "./Post";
import Stories from "./Stories";
import { useApp } from "../context/AppContext";

const PostFeed: React.FC = () => {
  const { posts, currentUser } = useApp();

  // Filter posts to show posts from followed users and current user
  const feedPosts = posts.filter(post => {
    if (!currentUser) return true;
    return currentUser.following.includes(post.userId) || post.userId === currentUser.id;
  });

  return (
    <div className="w-full max-w-xl mx-auto">
      <Stories />
      
      {feedPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-lg border border-gray-200">
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
          <p className="text-gray-500 mb-4">
            No posts in your feed yet. Follow some users to see their posts!
          </p>
        </div>
      ) : (
        <div className="space-y-0">
          {feedPosts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;