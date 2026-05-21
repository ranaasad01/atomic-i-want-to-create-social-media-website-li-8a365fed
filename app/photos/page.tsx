"use client";

import { useState } from "react";
import Link from "next/link";
import { Upload, Grid, List, ThumbsUp, MessageCircle, Share2, X, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import Avatar from "../../components/ui/Avatar";
import { mockPhotos, currentUser } from "../../lib/mockData";
import { Photo } from "../../lib/types";

export default function PhotosPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo);
    setSelectedIndex(index);
  };

  const closePhoto = () => setSelectedPhoto(null);

  const prevPhoto = () => {
    const newIndex = (selectedIndex - 1 + mockPhotos.length) % mockPhotos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(mockPhotos[newIndex]);
  };

  const nextPhoto = () => {
    const newIndex = (selectedIndex + 1) % mockPhotos.length;
    setSelectedIndex(newIndex);
    setSelectedPhoto(mockPhotos[newIndex]);
  };

  const toggleLike = (id: string) => {
    const newSet = new Set(likedPhotos);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setLikedPhotos(newSet);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-20 md:pb-6">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-[#050505]">Photo Gallery</h1>
              <p className="text-sm text-[#65676B] mt-1">{mockPhotos.length} photos · {currentUser.name}&apos;s collection</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={"w-9 h-9 rounded-lg flex items-center justify-center transition-colors " + (viewMode === "grid" ? "bg-[#E7F3FF] text-[#1877F2]" : "bg-white text-[#65676B] hover:bg-[#F0F2F5] border border-gray-200")}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={"w-9 h-9 rounded-lg flex items-center justify-center transition-colors " + (viewMode === "list" ? "bg-[#E7F3FF] text-[#1877F2]" : "bg-white text-[#65676B] hover:bg-[#F0F2F5] border border-gray-200")}
              >
                <List size={18} />
              </button>
              <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                <Upload size={16} />
                Upload Photos
              </button>
            </div>
          </div>

          {/* Albums Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
            <h2 className="font-bold text-[#050505] text-lg mb-4">Albums</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "Japan Trip 2024", count: 9, cover: mockPhotos[0].url },
                { name: "Profile Pictures", count: 12, cover: currentUser.avatar },
                { name: "Cover Photos", count: 5, cover: currentUser.coverPhoto },
                { name: "Mobile Uploads", count: 34, cover: mockPhotos[4].url },
              ].map((album) => (
                <div key={album.name} className="cursor-pointer group">
                  <div className="aspect-square rounded-xl overflow-hidden bg-gray-200 mb-2">
                    <img
                      src={album.cover}
                      alt={album.name}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                    />
                  </div>
                  <p className="text-sm font-semibold text-[#050505]">{album.name}</p>
                  <p className="text-xs text-[#65676B]">{album.count} photos</p>
                </div>
              ))}
            </div>
          </div>

          {/* All Photos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-[#050505] text-lg">All Photos</h2>
              <span className="text-sm text-[#65676B]">{mockPhotos.length} photos</span>
            </div>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {mockPhotos.map((photo, index) => (
                  <div
                    key={photo.id}
                    className="aspect-square rounded-xl overflow-hidden bg-gray-200 cursor-pointer group relative"
                    onClick={() => openPhoto(photo, index)}
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption || "Photo"}
                      className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end p-2 opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-3 text-white text-xs">
                        <span className="flex items-center gap-1"><ThumbsUp size={12} /> {photo.likes}</span>
                        <span className="flex items-center gap-1"><MessageCircle size={12} /> {photo.comments}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {mockPhotos.map((photo, index) => (
                  <div key={photo.id} className="flex gap-4 p-3 rounded-xl hover:bg-[#F0F2F5] transition-colors cursor-pointer" onClick={() => openPhoto(photo, index)}>
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                      <img src={photo.url} alt={photo.caption || "Photo"} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-[#050505] text-sm">{photo.caption || "Untitled photo"}</p>
                      <p className="text-xs text-[#65676B] mt-1">{photo.timestamp}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleLike(photo.id); }}
                          className={"flex items-center gap-1.5 text-xs font-medium " + (likedPhotos.has(photo.id) ? "text-[#1877F2]" : "text-[#65676B]")}
                        >
                          <ThumbsUp size={14} className={likedPhotos.has(photo.id) ? "fill-[#1877F2]" : ""} />
                          {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)} Likes
                        </button>
                        <span className="flex items-center gap-1.5 text-xs text-[#65676B]">
                          <MessageCircle size={14} /> {photo.comments} Comments
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={closePhoto}>
          <button className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10">
            <X size={20} className="text-white" />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
          >
            <ChevronRight size={24} className="text-white" />
          </button>

          <div className="flex flex-col lg:flex-row max-w-5xl w-full mx-4 gap-0" onClick={(e) => e.stopPropagation()}>
            <div className="flex-1 flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption || "Photo"}
                className="max-h-[80vh] max-w-full object-contain rounded-l-xl"
              />
            </div>
            <div className="lg:w-80 bg-white rounded-r-xl p-4 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Avatar src={currentUser.avatar} alt={currentUser.name} size="md" />
                <div>
                  <p className="font-semibold text-[#050505] text-sm">{currentUser.name}</p>
                  <p className="text-xs text-[#65676B]">{selectedPhoto.timestamp}</p>
                </div>
              </div>
              {selectedPhoto.caption && (
                <p className="text-sm text-[#050505] mb-4">{selectedPhoto.caption}</p>
              )}
              <div className="flex items-center gap-4 py-3 border-t border-b border-gray-100 mb-4">
                <button
                  onClick={() => toggleLike(selectedPhoto.id)}
                  className={"flex items-center gap-1.5 text-sm font-semibold " + (likedPhotos.has(selectedPhoto.id) ? "text-[#1877F2]" : "text-[#65676B]")}
                >
                  <ThumbsUp size={18} className={likedPhotos.has(selectedPhoto.id) ? "fill-[#1877F2]" : ""} />
                  {selectedPhoto.likes + (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#65676B]">
                  <MessageCircle size={18} /> {selectedPhoto.comments}
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#65676B]">
                  <Share2 size={18} /> Share
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-[#65676B] ml-auto">
                  <Download size={18} />
                </button>
              </div>
              <p className="text-xs text-[#65676B] text-center">{selectedIndex + 1} of {mockPhotos.length}</p>
            </div>
          </div>
        </div>
      )}

      <MobileBottomNav />
    </div>
  );
}
