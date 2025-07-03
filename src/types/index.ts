export interface User {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  bio: string;
  website?: string;
  followers: string[];
  following: string[];
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  text: string;
  timestamp: number;
  likes: number;
  likedBy: string[];
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  caption: string;
  likes: number;
  likedBy: string[];
  timestamp: number;
  comments: Comment[];
  location?: string;
  tags: string[];
}

export interface Story {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  imageUrl: string;
  timestamp: number;
  viewed: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  fromUserId: string;
  fromUsername: string;
  fromUserAvatar: string;
  postId?: string;
  message: string;
  timestamp: number;
  read: boolean;
}