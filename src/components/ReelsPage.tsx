import React, { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { useApp } from '../context/AppContext';
import MobileHeader from './MobileHeader';
import Sidebar from './Sidebar';

interface Reel {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  videoUrl: string;
  caption: string;
  likes: number;
  likedBy: string[];
  comments: number;
  shares: number;
  timestamp: number;
}

const ReelsPage = () => {
  const { currentUser } = useApp();
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Mock reels data
  const reels: Reel[] = [
    {
      id: '1',
      userId: 'user2',
      username: 'nature_photography',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
      caption: 'Beautiful sunset timelapse 🌅 #nature #sunset #timelapse',
      likes: 1240,
      likedBy: ['user1'],
      comments: 89,
      shares: 23,
      timestamp: Date.now() - 3600000,
    },
    {
      id: '2',
      userId: 'user3',
      username: 'food_lover',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=food',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
      caption: 'Making the perfect pasta 🍝 Recipe in bio! #cooking #pasta #foodie',
      likes: 856,
      likedBy: [],
      comments: 45,
      shares: 12,
      timestamp: Date.now() - 7200000,
    },
    {
      id: '3',
      userId: 'user4',
      username: 'travel_adventures',
      userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=travel',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      caption: 'Epic mountain climbing adventure! 🏔️ #travel #adventure #mountains',
      likes: 2100,
      likedBy: ['user1'],
      comments: 156,
      shares: 67,
      timestamp: Date.now() - 10800000,
    },
  ];

  useEffect(() => {
    const currentVideo = videoRefs.current[currentReelIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.play();
      } else {
        currentVideo.pause();
      }
    }
  }, [currentReelIndex, isPlaying]);

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const handleScroll = (e: React.WheelEvent) => {
    if (e.deltaY > 0 && currentReelIndex < reels.length - 1) {
      setCurrentReelIndex(currentReelIndex + 1);
    } else if (e.deltaY < 0 && currentReelIndex > 0) {
      setCurrentReelIndex(currentReelIndex - 1);
    }
  };

  const formatCount = (count: number) => {
    if (count >= 1000000) {
      return (count / 1000000).toFixed(1) + 'M';
    } else if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'K';
    }
    return count.toString();
  };

  return (
    <div className="flex min-h-screen bg-black">
      {/* Sidebar for desktop */}
      <Sidebar onCreatePost={() => {}} />

      <div className="flex-1 lg:ml-64">
        {/* Mobile header */}
        <MobileHeader title="Reels" showBackButton />

        {/* Reels container */}
        <div 
          className="relative h-screen overflow-hidden"
          onWheel={handleScroll}
        >
          {reels.map((reel, index) => (
            <div
              key={reel.id}
              className={`absolute inset-0 transition-transform duration-300 ${
                index === currentReelIndex ? 'translate-y-0' : 
                index < currentReelIndex ? '-translate-y-full' : 'translate-y-full'
              }`}
            >
              {/* Video */}
              <div className="relative w-full h-full flex items-center justify-center bg-black">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="w-full h-full object-cover max-w-md mx-auto"
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={handleVideoClick}
                  poster="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80"
                >
                  <source src={reel.videoUrl} type="video/mp4" />
                  {/* Fallback image for demo */}
                  <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">🎬</div>
                      <p className="text-lg">Video Content</p>
                      <p className="text-sm opacity-75">{reel.caption}</p>
                    </div>
                  </div>
                </video>

                {/* Play/Pause overlay */}
                {!isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 rounded-full p-4">
                      <Play className="w-12 h-12 text-white fill-white" />
                    </div>
                  </div>
                )}

                {/* Controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-black/50 text-white hover:bg-black/70"
                    onClick={() => setIsMuted(!isMuted)}
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </Button>
                </div>

                {/* User info and actions */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-end justify-between">
                    {/* Left side - User info and caption */}
                    <div className="flex-1 mr-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <Avatar className="h-8 w-8 ring-2 ring-white">
                          <AvatarImage src={reel.userAvatar} alt={reel.username} />
                          <AvatarFallback>
                            {reel.username.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-white">{reel.username}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white text-white hover:bg-white hover:text-black"
                        >
                          Follow
                        </Button>
                      </div>
                      <p className="text-white text-sm mb-2">{reel.caption}</p>
                      <div className="flex items-center space-x-4 text-white text-sm">
                        <span>{formatCount(reel.likes)} likes</span>
                        <span>{formatCount(reel.comments)} comments</span>
                      </div>
                    </div>

                    {/* Right side - Action buttons */}
                    <div className="flex flex-col space-y-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-white hover:bg-white/20 flex flex-col h-auto py-2"
                      >
                        <Heart className="h-6 w-6 mb-1" />
                        <span className="text-xs">{formatCount(reel.likes)}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-white hover:bg-white/20 flex flex-col h-auto py-2"
                      >
                        <MessageCircle className="h-6 w-6 mb-1" />
                        <span className="text-xs">{formatCount(reel.comments)}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-white hover:bg-white/20 flex flex-col h-auto py-2"
                      >
                        <Send className="h-6 w-6 mb-1" />
                        <span className="text-xs">{formatCount(reel.shares)}</span>
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-white hover:bg-white/20"
                      >
                        <Bookmark className="h-6 w-6" />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-transparent text-white hover:bg-white/20"
                      >
                        <MoreHorizontal className="h-6 w-6" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Scroll indicators */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
            {reels.map((_, index) => (
              <div
                key={index}
                className={`w-1 h-8 rounded-full transition-colors ${
                  index === currentReelIndex ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mobile bottom padding */}
        <div className="h-16 lg:hidden"></div>
      </div>
    </div>
  );
};

export default ReelsPage;