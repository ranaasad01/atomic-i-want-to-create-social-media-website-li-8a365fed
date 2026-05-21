"use client";

import { useState } from "react";
import Link from "next/link";
import { UserPlus, UserCheck, X, Users, Search } from 'lucide-react';
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import Avatar from "../../components/ui/Avatar";
import { mockUsers, mockFriendRequests, suggestedFriends, currentUser } from "../../lib/mockData";
import { User } from "../../lib/types";

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<"requests" | "suggestions" | "all">("requests");
  const [friendRequests, setFriendRequests] = useState(mockFriendRequests);
  const [friends, setFriends] = useState<User[]>(mockUsers);
  const [suggestions, setSuggestions] = useState(suggestedFriends);
  const [searchQuery, setSearchQuery] = useState("");

  const acceptRequest = (id: string) => {
    const req = friendRequests.find((r) => r.id === id);
    if (req) {
      setFriends([...friends, req.from]);
      setFriendRequests(friendRequests.filter((r) => r.id !== id));
    }
  };

  const rejectRequest = (id: string) => {
    setFriendRequests(friendRequests.filter((r) => r.id !== id));
  };

  const addFriend = (id: string) => {
    setSuggestions(suggestions.filter((s) => s.id !== id));
  };

  const removeFriend = (id: string) => {
    setFriends(friends.filter((f) => f.id !== id));
  };

  const filteredFriends = friends.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const tabs = [
    { key: "requests", label: "Friend Requests", count: friendRequests.length },
    { key: "suggestions", label: "People You May Know", count: null },
    { key: "all", label: "All Friends", count: friends.length },
  ];

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-20 md:pb-6">
        <div className="max-w-[900px] mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#050505]">Friends</h1>
              <p className="text-sm text-[#65676B] mt-1">{friends.length} friends · {friendRequests.length} pending requests</p>
            </div>
            <Link href="/search" className="flex items-center gap-2 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
              <Search size={16} />
              Find Friends
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as "requests" | "suggestions" | "all")}
                className={"flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-colors " + (activeTab === tab.key ? "bg-[#E7F3FF] text-[#1877F2]" : "text-[#65676B] hover:bg-[#F0F2F5]")}
              >
                {tab.label}
                {tab.count !== null && tab.count > 0 && (
                  <span className={"text-xs px-1.5 py-0.5 rounded-full font-bold " + (activeTab === tab.key ? "bg-[#1877F2] text-white" : "bg-[#E4E6EB] text-[#050505]")}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Friend Requests Tab */}
          {activeTab === "requests" && (
            <div>
              {friendRequests.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <div className="w-16 h-16 bg-[#E4E6EB] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users size={28} className="text-[#65676B]" />
                  </div>
                  <h3 className="font-semibold text-[#050505] text-lg mb-2">No pending requests</h3>
                  <p className="text-[#65676B] text-sm">When someone sends you a friend request, it will appear here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {friendRequests.map((request) => (
                    <div key={request.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex gap-3">
                      <Link href={"/profile/" + request.from.id}>
                        <Avatar src={request.from.avatar} alt={request.from.name} size="xl" />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={"/profile/" + request.from.id} className="font-semibold text-[#050505] hover:underline text-sm">
                          {request.from.name}
                        </Link>
                        <p className="text-xs text-[#65676B] mt-0.5">{request.mutualFriends} mutual friends</p>
                        <p className="text-xs text-[#65676B]">{request.timestamp}</p>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => acceptRequest(request.id)}
                            className="flex-1 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold py-2 rounded-lg text-sm transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => rejectRequest(request.id)}
                            className="flex-1 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold py-2 rounded-lg text-sm transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Suggestions Tab */}
          {activeTab === "suggestions" && (
            <div>
              <p className="text-sm text-[#65676B] mb-4">People you might know based on your mutual friends and interests</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {suggestions.map((user) => (
                  <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="h-24 bg-gradient-to-br from-blue-100 to-purple-100 relative">
                      <img
                        src={user.coverPhoto || "/images/cover-default.jpg"}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                      <button
                        onClick={() => addFriend(user.id)}
                        className="absolute top-2 right-2 w-7 h-7 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <X size={14} className="text-[#65676B]" />
                      </button>
                    </div>
                    <div className="p-3 -mt-8">
                      <Link href={"/profile/" + user.id}>
                        <div className="w-16 h-16 rounded-full border-4 border-white overflow-hidden bg-gray-200 mb-2">
                          <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const t = e.target as HTMLImageElement;
                              t.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&background=1877F2&color=fff&size=128";
                            }}
                          />
                        </div>
                      </Link>
                      <Link href={"/profile/" + user.id} className="font-semibold text-[#050505] text-sm hover:underline block">{user.name}</Link>
                      <p className="text-xs text-[#65676B] mt-0.5">{user.mutualFriends} mutual friends</p>
                      <button
                        onClick={() => addFriend(user.id)}
                        className="w-full mt-3 bg-[#E7F3FF] hover:bg-[#D8EAFF] text-[#1877F2] font-semibold py-2 rounded-lg text-sm transition-colors flex items-center justify-center gap-1.5"
                      >
                        <UserPlus size={14} />
                        Add Friend
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* All Friends Tab */}
          {activeTab === "all" && (
            <div>
              <div className="flex items-center gap-3 bg-white rounded-xl shadow-sm border border-gray-200 px-4 py-3 mb-4">
                <Search size={18} className="text-[#65676B]" />
                <input
                  type="text"
                  placeholder="Search friends..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none"
                />
              </div>
              {filteredFriends.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                  <p className="text-[#65676B]">No friends found matching your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {filteredFriends.map((friend) => (
                    <div key={friend.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 flex items-center gap-3">
                      <Link href={"/profile/" + friend.id}>
                        <Avatar src={friend.avatar} alt={friend.name} size="lg" isOnline={friend.isOnline} />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={"/profile/" + friend.id} className="font-semibold text-[#050505] text-sm hover:underline block truncate">
                          {friend.name}
                        </Link>
                        <p className="text-xs text-[#65676B] truncate">{friend.mutualFriends} mutual friends</p>
                        {friend.isOnline && <p className="text-xs text-green-500">Active now</p>}
                      </div>
                      <div className="flex gap-2">
                        <Link href="/messages" className="flex items-center gap-1.5 bg-[#E7F3FF] hover:bg-[#D8EAFF] text-[#1877F2] font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
                          <Users size={12} />
                          Message
                        </Link>
                        <button
                          onClick={() => removeFriend(friend.id)}
                          className="flex items-center gap-1.5 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors"
                        >
                          <UserCheck size={12} />
                          Friends
                        </button>
                      </div>
                    </div>
                  ))}
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
