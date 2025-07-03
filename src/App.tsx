import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SearchPage from './components/SearchPage';
import NotificationsPage from './components/NotificationsPage';
import ExplorePage from './components/ExplorePage';
import ReelsPage from './components/ReelsPage';
import MessagesPage from './components/MessagesPage';
import AuthModal from './components/AuthModal';

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showCreatePost, setShowCreatePost] = useState(false); // Add this

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/explore" element={
              <ExplorePage onCreatePost={() => setShowCreatePost(true)} />
            } />
            <Route path="/reels" element={<ReelsPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
          
          {/* Auth Modal */}
          <AuthModal 
            isOpen={showAuth} 
            onClose={() => setShowAuth(false)} 
          />
          {/* Create Post Modal (replace with your actual modal) */}
          {/* <CreatePostModal isOpen={showCreatePost} onClose={() => setShowCreatePost(false)} /> */}
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;