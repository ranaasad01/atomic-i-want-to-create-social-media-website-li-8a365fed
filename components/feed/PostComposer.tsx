"use client";

import { useState } from "react";
import { Image, Smile, MapPin, X } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { currentUser } from "../../lib/mockData";

interface PostComposerProps {
  onPost?: (content: string, image?: string) => void;
}

export default function PostComposer({ onPost }: PostComposerProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handlePost = () => {
    if (!content.trim()) return;
    onPost && onPost(content, previewImage || undefined);
    setContent("");
    setPreviewImage(null);
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <div className="flex items-center gap-3">
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
        <button
          onClick={() => setIsExpanded(true)}
          className="flex-1 bg-[#F0F2F5] hover:bg-[#E4E6EB] rounded-full px-4 py-2.5 text-left text-[#65676B] text-sm transition-colors"
        >
          {"What's on your mind, " + currentUser.name.split(" ")[0] + "?"}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-3">
          <textarea
            autoFocus
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={"What's on your mind, " + currentUser.name.split(" ")[0] + "?"}
            className="w-full bg-transparent text-[#050505] placeholder-[#65676B] text-lg resize-none outline-none min-h-[80px]"
            rows={3}
          />
          {previewImage && (
            <div className="relative mt-2 rounded-xl overflow-hidden">
              <img src={previewImage} alt="Preview" className="w-full max-h-64 object-cover rounded-xl" />
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center hover:bg-black/80 transition-colors"
              >
                <X size={16} className="text-white" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 mt-3 pt-3 flex items-center justify-between">
        <div className="flex gap-1">
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0F2F5] transition-colors text-sm font-medium text-[#45BD62]">
            <Image size={20} />
            <span className="hidden sm:inline">Photo/Video</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0F2F5] transition-colors text-sm font-medium text-[#F7B928]">
            <Smile size={20} />
            <span className="hidden sm:inline">Feeling</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#F0F2F5] transition-colors text-sm font-medium text-[#F5533D]">
            <MapPin size={20} />
            <span className="hidden sm:inline">Location</span>
          </button>
        </div>
        {isExpanded && (
          <button
            onClick={handlePost}
            disabled={!content.trim()}
            className="bg-[#1877F2] hover:bg-[#166FE5] disabled:bg-[#BCC0C4] text-white font-semibold px-5 py-2 rounded-lg text-sm transition-colors disabled:cursor-not-allowed"
          >
            Post
          </button>
        )}
      </div>
    </div>
  );
}
