import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Heart, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Post, Comment } from '../types';

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, post }) => {
  const { currentUser, updatePost } = useApp();
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!currentUser || !newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      text: newComment.trim(),
      timestamp: Date.now(),
      likes: 0,
      likedBy: [],
    };

    updatePost(post.id, {
      comments: [...post.comments, comment],
    });

    setNewComment('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddComment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] p-0 bg-white">
        <div className="flex h-full">
          {/* Image */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <img
              src={post.imageUrl}
              alt="Post"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          {/* Comments Section */}
          <div className="w-96 flex flex-col">
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200">
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={post.userAvatar} alt={post.username} />
                <AvatarFallback>
                  {post.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">{post.username}</span>
              <Button variant="ghost" size="icon" className="ml-auto">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            {/* Caption */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-start space-x-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={post.userAvatar} alt={post.username} />
                  <AvatarFallback>
                    {post.username.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold mr-2">{post.username}</span>
                    {post.caption}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(post.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.username}`} 
                      alt={comment.username} 
                    />
                    <AvatarFallback>
                      {comment.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold mr-2">{comment.username}</span>
                      {comment.text}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-gray-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </p>
                      {comment.likes > 0 && (
                        <p className="text-xs text-gray-500">{comment.likes} likes</p>
                      )}
                      <button className="text-xs text-gray-500 font-medium">Reply</button>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Heart className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="p-0">
                    <Heart className="h-6 w-6" />
                  </Button>
                  <Button variant="ghost" size="icon" className="p-0">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                  </Button>
                </div>
                <Button variant="ghost" size="icon" className="p-0">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </Button>
              </div>
              <p className="font-semibold text-sm mb-2">{post.likes} likes</p>
              <p className="text-xs text-gray-500 uppercase mb-4">
                {new Date(post.timestamp).toLocaleDateString()}
              </p>

              {/* Add Comment */}
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 border-none p-0 focus-visible:ring-0"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  variant="ghost"
                  className="text-blue-500 font-semibold p-0 h-auto disabled:text-gray-300"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;