import React, { useState } from "react";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useApp } from "../context/AppContext";
import { Post as PostType } from "../types";
import CommentsModal from "./CommentsModal";

interface PostProps {
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { currentUser, updatePost, deletePost, followUser, unfollowUser, users } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [showFullCaption, setShowFullCaption] = useState(false);

  const isLiked = currentUser ? post.likedBy.includes(currentUser.id) : false;
  const isFollowing = currentUser ? users.find(u => u.id === post.userId)?.followers.includes(currentUser.id) : false;
  const isOwnPost = currentUser?.id === post.userId;

  const handleLike = () => {
    if (!currentUser) return;

    const newLikedBy = isLiked 
      ? post.likedBy.filter(id => id !== currentUser.id)
      : [...post.likedBy, currentUser.id];

    updatePost(post.id, {
      likedBy: newLikedBy,
      likes: newLikedBy.length,
    });
  };

  const handleFollow = () => {
    if (!currentUser || post.userId === currentUser.id) return;

    if (isFollowing) {
      unfollowUser(post.userId);
    } else {
      followUser(post.userId);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      deletePost(post.id);
    }
  };

  const formatDate = (timestamp: number) => {
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

  const truncateCaption = (text: string, maxLength = 100) => {
    if (text.length <= maxLength || showFullCaption) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <>
      <Card className="w-full max-w-md mx-auto mb-6 bg-white dark:bg-black border-gray-200 dark:border-gray-800 shadow-none border-0">
        <CardHeader className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={post.userAvatar} alt={post.username} />
                <AvatarFallback>
                  {post.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-sm dark:text-white">{post.username}</p>
                {post.location && (
                  <>
                    <span className="text-gray-400">•</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{post.location}</p>
                  </>
                )}
              </div>
              {!isOwnPost && (
                <>
                  <span className="text-gray-400">•</span>
                  <button
                    onClick={handleFollow}
                    className="text-sm text-blue-500 font-medium hover:text-blue-700"
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                </>
              )}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                {isOwnPost ? (
                  <>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-red-600 dark:text-red-400"
                      onClick={handleDelete}
                    >
                      Delete
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                    <DropdownMenuItem onClick={handleFollow}>
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>

        <div className="relative w-full">
          <div className="aspect-square bg-gray-100 dark:bg-gray-800">
            <img
              src={post.imageUrl}
              alt="Post content"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <CardContent className="p-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="p-0 hover:bg-transparent"
                onClick={handleLike}
              >
                <Heart
                  className={`h-6 w-6 ${
                    isLiked ? "fill-red-500 text-red-500" : "text-gray-700 dark:text-gray-300"
                  }`}
                  strokeWidth={isLiked ? 0 : 2}
                />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="p-0 hover:bg-transparent"
                onClick={() => setShowComments(true)}
              >
                <MessageCircle className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={2} />
              </Button>
              <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
                <Send className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={2} />
              </Button>
            </div>
            <Button variant="ghost" size="icon" className="p-0 hover:bg-transparent">
              <Bookmark className="h-6 w-6 text-gray-700 dark:text-gray-300" strokeWidth={2} />
            </Button>
          </div>

          <div className="mb-2">
            <p className="font-semibold text-sm dark:text-white">{post.likes} likes</p>
          </div>

          <div className="mb-1">
            <p className="text-sm dark:text-white">
              <span className="font-semibold mr-2">{post.username}</span>
              {truncateCaption(post.caption)}
              {post.caption.length > 100 && !showFullCaption && (
                <button
                  className="text-gray-500 dark:text-gray-400 ml-1"
                  onClick={() => setShowFullCaption(true)}
                >
                  more
                </button>
              )}
            </p>
          </div>

          {post.comments.length > 0 && (
            <div className="mb-2">
              <button
                className="text-sm text-gray-500 dark:text-gray-400 mb-1"
                onClick={() => setShowComments(true)}
              >
                View all {post.comments.length} comments
              </button>
              {post.comments.slice(0, 2).map((comment) => (
                <p key={comment.id} className="text-sm mb-1 dark:text-white">
                  <span className="font-semibold mr-2">{comment.username}</span>
                  {comment.text}
                </p>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-500 dark:text-gray-400 uppercase">
            {formatDate(post.timestamp)} ago
          </p>
        </CardContent>
      </Card>

      <CommentsModal
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        post={post}
      />
    </>
  );
};

export default Post;