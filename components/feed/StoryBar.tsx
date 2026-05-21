"use client";

import { useState } from "react";
import { Plus } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { mockStories, currentUser } from "../../lib/mockData";

interface StoryBarProps {
  onStoryClick?: (storyId: string) => void;
}

export default function StoryBar({ onStoryClick }: StoryBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
      {/* Create Story */}
      <div className="flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden relative cursor-pointer group">
        <div className="w-full h-full bg-white border border-gray-200 rounded-xl flex flex-col">
          <div className="flex-1 relative overflow-hidden">
            <img
              src={currentUser.avatar}
              alt="Your story"
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.target as HTMLImageElement;
                t.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(currentUser.name) + "&background=1877F2&color=fff&size=128";
              }}
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          </div>
          <div className="flex flex-col items-center pb-3 pt-5 relative">
            <div className="absolute -top-4 w-8 h-8 bg-[#1877F2] rounded-full border-2 border-white flex items-center justify-center">
              <Plus size={16} className="text-white" />
            </div>
            <span className="text-xs font-semibold text-[#050505] text-center leading-tight">Create Story</span>
          </div>
        </div>
      </div>

      {/* Stories */}
      {mockStories.map((story) => (
        <div
          key={story.id}
          className="flex-shrink-0 w-28 h-48 rounded-xl overflow-hidden relative cursor-pointer group"
          onClick={() => onStoryClick && onStoryClick(story.id)}
        >
          <img
            src={story.image}
            alt={story.author.name + "'s story"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(story.author.name) + "&background=1877F2&color=fff&size=128";
            }}
          />
          <div className="absolute inset-0 story-gradient" />
          <div className="absolute top-2 left-2">
            <div className={"w-9 h-9 rounded-full border-3 overflow-hidden " + (story.viewed ? "border-gray-400" : "border-[#1877F2]")} style={{ borderWidth: "3px" }}>
              <img
                src={story.author.avatar}
                alt={story.author.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(story.author.name) + "&background=1877F2&color=fff&size=64";
                }}
              />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 right-2">
            <p className="text-white text-xs font-semibold leading-tight">{story.author.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
