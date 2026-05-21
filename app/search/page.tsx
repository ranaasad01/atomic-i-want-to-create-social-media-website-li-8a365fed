"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, UserPlus, MessageCircle, Filter, Users, FileText, Image } from 'lucide-react';
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import Avatar from "../../components/ui/Avatar";
import PostCard from "../../components/feed/PostCard";
import { mockUsers, mockPosts, mockPhotos } from "../../lib/mockData";

type FilterType = "all" | "people" | "posts" | "photos";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [addedUsers, setAddedUsers] = useState<Set<string>>(new Set());

  const filteredUsers = mockUsers.filter((u) =>
    u.name.toLowerCase().includes(query.toLowerCase()) ||
    u.username.toLowerCase().includes(query.toLowerCase()) ||
    u.location.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPosts = mockPosts.filter((p) =>
    p.content.toLowerCase().includes(query.toLowerCase()) ||
    p.author.name.toLowerCase().includes(query.toLowerCase())
  );

  const filteredPhotos = mockPhotos.filter((p) =>
    (p.caption || "").toLowerCase().includes(query.toLowerCase())
  );

  const filters: { key: FilterType; label: string; icon: React.ReactNode; count: number }[] = [
    { key: "all", label: "All", icon: <Search size={16} />, count: filteredUsers.length + filteredPosts.length + filteredPhotos.length },
    { key: "people", label: "People", icon: <Users size={16} />, count: filteredUsers.length },
    { key: "posts", label: "Posts", icon: <FileText size={16} />, count: filteredPosts.length },
    { key: "photos", label: "Photos", icon: <Image size={16} />, count: filteredPhotos.length },
  ];

  const handleAddFriend = (id: string) => {
    const newSet = new Set(addedUsers);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setAddedUsers(newSet);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-20 md:pb-6">
        <div className="max-w-3xl mx-auto px-4 py-6">
          {/* Search Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <h1 className="text-2xl font-bold text-[#050505] mb-4">Search</h1>
            <div className="flex items-center gap-3 bg-[#F0F2F5] rounded-xl px-4 py-3">
              <Search size={20} className="text-[#65676B] flex-shrink-0" />
              <input
                type="text"
                placeholder="Search for people, posts, photos..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
                className="flex-1 bg-transparent text-[#050505] placeholder-[#65676B] outline-none text-base"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="text-[#65676B] hover:text-[#050505] transition-colors text-sm font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
            {filters.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={"flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors " + (activeFilter === f.key ? "bg-[#1877F2] text-white" : "bg-white text-[#65676B] hover:bg-[#F0F2F5] border border-gray-200")}
              >
                {f.icon}
                {f.label}
                {query && f.count > 0 && (
                  <span className={"text-xs px-1.5 py-0.5 rounded-full " + (activeFilter === f.key ? "bg-white/20 text-white" : "bg-[#E4E6EB] text-[#050505]")}>
                    {f.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* No query state */}
          {!query && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="w-16 h-16 bg-[#E4E6EB] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={28} className="text-[#65676B]" />
              </div>
              <h3 className="font-semibold text-[#050505] text-lg mb-2">Search SocialConnect</h3>
              <p className="text-[#65676B] text-sm">Find friends, posts, photos, and more. Start typing to search.</p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {["Technology", "Travel", "Photography", "Fitness", "Food"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="px-4 py-2 bg-[#E7F3FF] text-[#1877F2] rounded-full text-sm font-medium hover:bg-[#D8EAFF] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {query && (
            <div className="flex flex-col gap-6">
              {/* People Results */}
              {(activeFilter === "all" || activeFilter === "people") && filteredUsers.length > 0 && (
                <div>
                  <h2 className="font-bold text-[#050505] text-lg mb-3">People</h2>
                  <div className="flex flex-col gap-3">
                    {filteredUsers.map((user) => (
                      <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-4">
                        <Link href={"/profile/" + user.id}>
                          <Avatar src={user.avatar} alt={user.name} size="xl" isOnline={user.isOnline} />
                        </Link>
                        <div className="flex-1 min-w-0">
                          <Link href={"/profile/" + user.id} className="font-semibold text-[#050505] hover:underline text-base">
                            {user.name}
                          </Link>
                          <p className="text-sm text-[#65676B] mt-0.5">{user.location}</p>
                          {user.mutualFriends && (
                            <p className="text-xs text-[#65676B] mt-0.5">{user.mutualFriends} mutual friends</p>
                          )}
                          <p className="text-xs text-[#65676B] mt-0.5 truncate">{user.bio}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleAddFriend(user.id)}
                            className={"flex items-center gap-1.5 font-semibold px-3 py-2 rounded-lg text-sm transition-colors " + (addedUsers.has(user.id) ? "bg-[#E4E6EB] text-[#050505]" : "bg-[#E7F3FF] text-[#1877F2]")}
                          >
                            <UserPlus size={14} />
                            {addedUsers.has(user.id) ? "Requested" : "Add Friend"}
                          </button>
                          <Link href="/messages" className="flex items-center gap-1.5 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-3 py-2 rounded-lg text-sm transition-colors">
                            <MessageCircle size={14} />
                            Message
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts Results */}
              {(activeFilter === "all" || activeFilter === "posts") && filteredPosts.length > 0 && (
                <div>
                  <h2 className="font-bold text-[#050505] text-lg mb-3">Posts</h2>
                  <div className="flex flex-col gap-4">
                    {filteredPosts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}

              {/* Photos Results */}
              {(activeFilter === "all" || activeFilter === "photos") && filteredPhotos.length > 0 && (
                <div>
                  <h2 className="font-bold text-[#050505] text-lg mb-3">Photos</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {filteredPhotos.map((photo) => (
                      <div key={photo.id} className="aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer group relative">
                        <img src={photo.url} alt={photo.caption || "Photo"} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                        {photo.caption && (
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-3 opacity-0 group-hover:opacity-100">
                            <p className="text-white text-xs font-medium">{photo.caption}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No results */}
              {filteredUsers.length === 0 && filteredPosts.length === 0 && filteredPhotos.length === 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-[#E4E6EB] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={28} className="text-[#65676B]" />
                  </div>
                  <h3 className="font-semibold text-[#050505] text-lg mb-2">No results for &ldquo;{query}&rdquo;</h3>
                  <p className="text-[#65676B] text-sm">Try searching for something else or check your spelling.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
