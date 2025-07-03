import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, X, MapPin } from "lucide-react";
import { useApp } from "../context/AppContext";
import { Post } from "../types";

interface CreatePostModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const CreatePostModal = ({
  isOpen = false,
  onClose = () => {},
}: CreatePostModalProps) => {
  const { currentUser, addPost } = useApp();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = () => {
    if (!selectedImage || !currentUser) return;

    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      const newPost: Post = {
        id: Date.now().toString(),
        userId: currentUser.id,
        username: currentUser.username,
        userAvatar: currentUser.avatar,
        imageUrl: selectedImage,
        caption,
        location: location || undefined,
        likes: 0,
        likedBy: [],
        timestamp: Date.now(),
        comments: [],
        tags: extractHashtags(caption),
      };

      addPost(newPost);

      // Reset form
      setSelectedImage(null);
      setCaption("");
      setLocation("");
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  const extractHashtags = (text: string): string[] => {
    const hashtags = text.match(/#\w+/g);
    return hashtags ? hashtags.map(tag => tag.slice(1)) : [];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Create New Post</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!selectedImage ? (
            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-12 cursor-pointer hover:border-gray-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-12 w-12 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">
                Click to upload an image
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          ) : (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Preview"
                className="w-full h-auto rounded-md object-cover max-h-[400px]"
              />
              <Button
                variant="outline"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                onClick={handleRemoveImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          <Textarea
            placeholder="Write a caption... Use #hashtags to reach more people"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="resize-none"
            rows={3}
          />

          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Add location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedImage || isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            {isLoading ? "Posting..." : "Share"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;