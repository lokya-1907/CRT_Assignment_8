import React, { createContext, useContext, useEffect } from 'react';
import { User, Post, Story, Notification } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AppContextType {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  stories: Story[];
  notifications: Notification[];
  darkMode: boolean;
  setCurrentUser: (user: User | null) => void;
  setUsers: (users: User[] | ((prev: User[]) => User[])) => void;
  setPosts: (posts: Post[] | ((prev: Post[]) => Post[])) => void;
  setStories: (stories: Story[] | ((prev: Story[]) => Story[])) => void;
  setNotifications: (notifications: Notification[] | ((prev: Notification[]) => Notification[])) => void;
  setDarkMode: (darkMode: boolean) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  followUser: (userId: string) => void;
  unfollowUser: (userId: string) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('currentUser', null);
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [posts, setPosts] = useLocalStorage<Post[]>('posts', []);
  const [stories, setStories] = useLocalStorage<Story[]>('stories', []);
  const [notifications, setNotifications] = useLocalStorage<Notification[]>('notifications', []);
  const [darkMode, setDarkMode] = useLocalStorage<boolean>('darkMode', false);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Initialize default data
  useEffect(() => {
    if (users.length === 0) {
      const defaultUsers: User[] = [
        {
          id: 'user1',
          username: 'instagram_user',
          displayName: 'Instagram User',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=instagram_user',
          bio: 'Photography enthusiast | Travel lover | Coffee addict ☕',
          website: 'www.instagram.com',
          followers: ['user2', 'user3'],
          following: ['user2', 'user4'],
          isVerified: true,
        },
        {
          id: 'user2',
          username: 'nature_photography',
          displayName: 'Nature Photography',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
          bio: 'Capturing the beauty of nature 🌿📸',
          followers: ['user1', 'user3', 'user4'],
          following: ['user1'],
        },
        {
          id: 'user3',
          username: 'food_lover',
          displayName: 'Food Lover',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
          bio: 'Foodie | Chef | Recipe creator 🍕🍰',
          followers: ['user1', 'user2'],
          following: ['user1', 'user2', 'user4'],
        },
        {
          id: 'user4',
          username: 'travel_adventures',
          displayName: 'Travel Adventures',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
          bio: 'Exploring the world one city at a time ✈️🗺️',
          followers: ['user2', 'user3'],
          following: ['user1', 'user3'],
        },
      ];
      setUsers(defaultUsers);
      setCurrentUser(defaultUsers[0]);
    }

    if (posts.length === 0) {
      const defaultPosts: Post[] = [
        {
          id: 'post1',
          userId: 'user2',
          username: 'nature_photography',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
          imageUrl: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714?w=800&q=80',
          caption: 'Beautiful sunset at the beach 🌅 Nothing beats the golden hour magic! #sunset #photography #nature',
          likes: 124,
          likedBy: ['user1', 'user3'],
          timestamp: Date.now() - 3600000,
          comments: [
            {
              id: 'comment1',
              userId: 'user1',
              username: 'instagram_user',
              text: 'Wow! Amazing view! 😍',
              timestamp: Date.now() - 3000000,
              likes: 5,
              likedBy: ['user2'],
            },
            {
              id: 'comment2',
              userId: 'user3',
              username: 'food_lover',
              text: 'Great composition! 📸',
              timestamp: Date.now() - 2400000,
              likes: 2,
              likedBy: [],
            },
          ],
          location: 'Malibu Beach, CA',
          tags: ['sunset', 'photography', 'nature'],
        },
        {
          id: 'post2',
          userId: 'user3',
          username: 'food_lover',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
          imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80',
          caption: 'Homemade pizza for dinner tonight! 🍕 Recipe in my bio #homemade #pizza #foodie',
          likes: 89,
          likedBy: ['user1'],
          timestamp: Date.now() - 7200000,
          comments: [
            {
              id: 'comment3',
              userId: 'user2',
              username: 'nature_photography',
              text: 'Looks delicious! 🤤',
              timestamp: Date.now() - 6000000,
              likes: 3,
              likedBy: ['user3'],
            },
          ],
          tags: ['homemade', 'pizza', 'foodie'],
        },
        {
          id: 'post3',
          userId: 'user4',
          username: 'travel_adventures',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
          imageUrl: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&q=80',
          caption: 'Exploring the mountains this weekend ⛰️ The view from the top was absolutely breathtaking! #mountains #hiking #adventure',
          likes: 210,
          likedBy: ['user1', 'user2', 'user3'],
          timestamp: Date.now() - 10800000,
          comments: [
            {
              id: 'comment4',
              userId: 'user1',
              username: 'instagram_user',
              text: 'Which trail is this? 🥾',
              timestamp: Date.now() - 9000000,
              likes: 1,
              likedBy: [],
            },
          ],
          location: 'Rocky Mountain National Park',
          tags: ['mountains', 'hiking', 'adventure'],
        },
      ];
      setPosts(defaultPosts);
    }

    if (stories.length === 0) {
      const defaultStories: Story[] = [
        {
          id: 'story1',
          userId: 'user2',
          username: 'nature_photography',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
          imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
          timestamp: Date.now() - 1800000,
          viewed: false,
        },
        {
          id: 'story2',
          userId: 'user3',
          username: 'food_lover',
          userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
          imageUrl: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80',
          timestamp: Date.now() - 3600000,
          viewed: false,
        },
      ];
      setStories(defaultStories);
    }
  }, [users.length, posts.length, stories.length, setUsers, setCurrentUser, setPosts, setStories]);

  const addPost = (post: Post) => {
    setPosts(prev => [post, ...prev]);
  };

  const updatePost = (postId: string, updates: Partial<Post>) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    ));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const followUser = (userId: string) => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, followers: [...user.followers, currentUser.id] };
      }
      if (user.id === currentUser.id) {
        return { ...user, following: [...user.following, userId] };
      }
      return user;
    }));

    setCurrentUser(prev => prev ? { ...prev, following: [...prev.following, userId] } : null);
  };

  const unfollowUser = (userId: string) => {
    if (!currentUser) return;
    
    setUsers(prev => prev.map(user => {
      if (user.id === userId) {
        return { ...user, followers: user.followers.filter(id => id !== currentUser.id) };
      }
      if (user.id === currentUser.id) {
        return { ...user, following: user.following.filter(id => id !== userId) };
      }
      return user;
    }));

    setCurrentUser(prev => prev ? { ...prev, following: prev.following.filter(id => id !== userId) } : null);
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      users,
      posts,
      stories,
      notifications,
      darkMode,
      setCurrentUser,
      setUsers,
      setPosts,
      setStories,
      setNotifications,
      setDarkMode,
      addPost,
      updatePost,
      deletePost,
      followUser,
      unfollowUser,
      toggleTheme,
    }}>
      {children}
    </AppContext.Provider>
  );
};