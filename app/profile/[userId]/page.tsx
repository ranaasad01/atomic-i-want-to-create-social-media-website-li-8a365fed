"use client";

import { useState } from "react";
import Link from "next/link";
import { Camera, Edit, UserPlus, MessageCircle, MoreHorizontal, MapPin, Briefcase, GraduationCap, Heart, Globe, ThumbsUp, Share2 } from 'lucide-react';
import Navbar from "../../../components/layout/Navbar";
import MobileBottomNav from "../../../components/layout/MobileBottomNav";
import Avatar from "../../../components/ui/Avatar";
import PostCard from "../../../components/feed/PostCard";
import { currentUser, mockUsers, mockPosts, mockPhotos } from "../../../lib/mockData";

const tabs = ["Posts", "About", "Friends", "Photos"];

export default function ProfilePage({ params }: { params: { userId: string } }) {
  const [activeTab, setActiveTab] = useState("Posts");
  const [isFriend, setIsFriend] = useState(false);

  const isOwnProfile = params.userId === currentUser.id;
  const profileUser = isOwnProfile ? currentUser : (mockUsers.find((u) => u.id === params.userId) || mockUsers[0]);
  const userPosts = mockPosts.filter((p) => p.author.id === profileUser.id || isOwnProfile);

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-20 md:pb-6">
        {/* Cover Photo + Profile Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-[900px] mx-auto">
            {/* Cover Photo */}
            <div className="relative h-48 sm:h-64 md:h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-b-xl overflow-hidden">
              <img
                src={profileUser.coverPhoto}
                alt="Cover"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const t = e.target as HTMLImageElement;
                  t.style.display = "none";
                }}
              />
              {isOwnProfile && (
                <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-white/90 hover:bg-white text-[#050505] font-semibold px-3 py-2 rounded-lg text-sm transition-colors shadow-sm">
                  <Camera size={16} />
                  <span className="hidden sm:inline">Edit cover photo</span>
                </button>
              )}
            </div>

            {/* Profile Info */}
            <div className="px-4 sm:px-6 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="flex items-end gap-4 -mt-12 sm:-mt-16">
                  <div className="relative">
                    <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-md">
                      <img
                        src={profileUser.avatar}
                        alt={profileUser.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const t = e.target as HTMLImageElement;
                          t.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(profileUser.name) + "&background=1877F2&color=fff&size=256";
                        }}
                      />
                    </div>
                    {isOwnProfile && (
                      <button className="absolute bottom-1 right-1 w-8 h-8 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-full flex items-center justify-center transition-colors shadow-sm">
                        <Camera size={14} className="text-[#050505]" />
                      </button>
                    )}
                  </div>
                  <div className="mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-[#050505]">{profileUser.name}</h1>
                    <p className="text-[#65676B] text-sm">{profileUser.friendCount.toLocaleString()} friends</p>
                    {profileUser.mutualFriends && (
                      <p className="text-[#65676B] text-xs">{profileUser.mutualFriends} mutual friends</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {isOwnProfile ? (
                    <>
                      <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                        <Edit size={16} />
                        Edit Profile
                      </button>
                      <button className="flex items-center gap-2 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                        <MoreHorizontal size={16} />
                        More
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setIsFriend(!isFriend)}
                        className={"flex items-center gap-2 font-semibold px-4 py-2 rounded-lg text-sm transition-colors " + (isFriend ? "bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505]" : "bg-[#1877F2] hover:bg-[#166FE5] text-white")}
                      >
                        <UserPlus size={16} />
                        {isFriend ? "Friends" : "Add Friend"}
                      </button>
                      <Link href="/messages" className="flex items-center gap-2 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                        <MessageCircle size={16} />
                        Message
                      </Link>
                      <button className="flex items-center justify-center w-10 h-10 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-lg transition-colors">
                        <MoreHorizontal size={18} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Bio */}
              {profileUser.bio && (
                <p className="text-[#050505] text-sm mt-3 text-center sm:text-left">{profileUser.bio}</p>
              )}

              {/* Quick Info */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                {profileUser.workplace && (
                  <div className="flex items-center gap-1.5 text-sm text-[#65676B]">
                    <Briefcase size={16} />
                    <span>Works at <strong className="text-[#050505]">{profileUser.workplace}</strong></span>
                  </div>
                )}
                {profileUser.education && (
                  <div className="flex items-center gap-1.5 text-sm text-[#65676B]">
                    <GraduationCap size={16} />
                    <span>Studied at <strong className="text-[#050505]">{profileUser.education}</strong></span>
                  </div>
                )}
                {profileUser.location && (
                  <div className="flex items-center gap-1.5 text-sm text-[#65676B]">
                    <MapPin size={16} />
                    <span>Lives in <strong className="text-[#050505]">{profileUser.location}</strong></span>
                  </div>
                )}
              </div>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 px-4 sm:px-6 flex gap-1 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={"px-4 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap " + (activeTab === tab ? "border-[#1877F2] text-[#1877F2]" : "border-transparent text-[#65676B] hover:text-[#050505] hover:bg-[#F0F2F5] rounded-t-lg")}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-[900px] mx-auto px-4 py-6">
          {activeTab === "Posts" && (
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Column - Intro */}
              <div className="lg:w-80 flex-shrink-0 flex flex-col gap-4">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <h3 className="font-bold text-[#050505] text-lg mb-3">Intro</h3>
                  <div className="flex flex-col gap-3">
                    {profileUser.bio && (
                      <p className="text-sm text-[#050505] text-center">{profileUser.bio}</p>
                    )}
                    <div className="flex flex-col gap-2">
                      {profileUser.workplace && (
                        <div className="flex items-center gap-2 text-sm text-[#050505]">
                          <Briefcase size={18} className="text-[#65676B]" />
                          <span>Works at <strong>{profileUser.workplace}</strong></span>
                        </div>
                      )}
                      {profileUser.education && (
                        <div className="flex items-center gap-2 text-sm text-[#050505]">
                          <GraduationCap size={18} className="text-[#65676B]" />
                          <span>Studied at <strong>{profileUser.education}</strong></span>
                        </div>
                      )}
                      {profileUser.location && (
                        <div className="flex items-center gap-2 text-sm text-[#050505]">
                          <MapPin size={18} className="text-[#65676B]" />
                          <span>Lives in <strong>{profileUser.location}</strong></span>
                        </div>
                      )}
                      {profileUser.relationship && (
                        <div className="flex items-center gap-2 text-sm text-[#050505]">
                          <Heart size={18} className="text-[#65676B]" />
                          <span>{profileUser.relationship}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2 text-sm text-[#050505]">
                        <Globe size={18} className="text-[#65676B]" />
                        <span>Joined {profileUser.joinedDate}</span>
                      </div>
                    </div>
                    {isOwnProfile && (
                      <button className="w-full bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold py-2 rounded-lg text-sm transition-colors mt-1">
                        Edit details
                      </button>
                    )}
                  </div>
                </div>

                {/* Photos Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#050505] text-lg">Photos</h3>
                    <Link href="/photos" className="text-sm text-[#1877F2] hover:underline font-medium">See all photos</Link>
                  </div>
                  <div className="grid grid-cols-3 gap-1">
                    {mockPhotos.slice(0, 9).map((photo) => (
                      <div key={photo.id} className="aspect-square rounded-lg overflow-hidden bg-gray-200">
                        <img src={photo.url} alt={photo.caption || "Photo"} className="w-full h-full object-cover hover:opacity-90 transition-opacity cursor-pointer" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Friends Preview */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-[#050505] text-lg">Friends</h3>
                    <Link href="/friends" className="text-sm text-[#1877F2] hover:underline font-medium">See all friends</Link>
                  </div>
                  <p className="text-sm text-[#65676B] mb-3">{profileUser.friendCount.toLocaleString()} friends</p>
                  <div className="grid grid-cols-3 gap-2">
                    {mockUsers.slice(0, 6).map((user) => (
                      <Link key={user.id} href={"/profile/" + user.id} className="flex flex-col items-center gap-1 group">
                        <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-200">
                          <img src={user.avatar} alt={user.name} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                        </div>
                        <span className="text-xs font-medium text-[#050505] text-center leading-tight">{user.name.split(" ")[0]}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Posts */}
              <div className="flex-1 flex flex-col gap-4">
                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <p className="text-[#65676B]">No posts yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === "About" && (
            <div className="max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-[#050505] text-xl mb-6">About {profileUser.name}</h3>
              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-semibold text-[#050505] mb-3">Overview</h4>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-sm">
                      <Briefcase size={20} className="text-[#65676B] flex-shrink-0" />
                      <span className="text-[#050505]">Works at <strong>{profileUser.workplace}</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <GraduationCap size={20} className="text-[#65676B] flex-shrink-0" />
                      <span className="text-[#050505]">Studied at <strong>{profileUser.education}</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <MapPin size={20} className="text-[#65676B] flex-shrink-0" />
                      <span className="text-[#050505]">Lives in <strong>{profileUser.location}</strong></span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Heart size={20} className="text-[#65676B] flex-shrink-0" />
                      <span className="text-[#050505]">{profileUser.relationship}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Globe size={20} className="text-[#65676B] flex-shrink-0" />
                      <span className="text-[#050505]">Joined {profileUser.joinedDate}</span>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-[#050505] mb-2">Bio</h4>
                  <p className="text-sm text-[#050505] leading-relaxed">{profileUser.bio}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-[#050505] mb-2">Contact Info</h4>
                  <div className="flex items-center gap-3 text-sm">
                    <Mail size={20} className="text-[#65676B]" />
                    <span className="text-[#050505]">{profileUser.email}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Friends" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-[#050505] text-xl mb-2">Friends</h3>
              <p className="text-sm text-[#65676B] mb-6">{profileUser.friendCount.toLocaleString()} friends</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {mockUsers.map((user) => (
                  <Link key={user.id} href={"/profile/" + user.id} className="flex flex-col items-center gap-2 group">
                    <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-200">
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                    </div>
                    <span className="text-sm font-semibold text-[#050505] text-center">{user.name}</span>
                    <span className="text-xs text-[#65676B]">{user.mutualFriends} mutual friends</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Photos" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="font-bold text-[#050505] text-xl mb-6">Photos</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mockPhotos.map((photo) => (
                  <div key={photo.id} className="aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer group relative">
                    <img src={photo.url} alt={photo.caption || "Photo"} className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-2 text-white text-xs">
                        <ThumbsUp size={12} />
                        <span>{photo.likes}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}

function Mail({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
