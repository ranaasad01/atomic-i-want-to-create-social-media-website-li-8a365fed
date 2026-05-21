"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import LeftSidebar from "../../components/layout/LeftSidebar";
import RightSidebar from "../../components/layout/RightSidebar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import { Search, Plus } from 'lucide-react';

const categories = ["All", "Vehicles", "Electronics", "Clothing", "Garden", "Furniture"];

const listings = [
  { id: 1, title: "2018 Honda Civic", price: "$14,500", location: "San Francisco, CA", seller: "James Carter", category: "Vehicles", emoji: "🚗" },
  { id: 2, title: "iPhone 14 Pro Max", price: "$750", location: "Oakland, CA", seller: "Priya Sharma", category: "Electronics", emoji: "📱" },
  { id: 3, title: "Vintage Denim Jacket", price: "$45", location: "Berkeley, CA", seller: "Sofia Reyes", category: "Clothing", emoji: "🧥" },
  { id: 4, title: "Outdoor Patio Set", price: "$320", location: "San Jose, CA", seller: "Marcus Lee", category: "Garden", emoji: "🪑" },
  { id: 5, title: "IKEA Bookshelf", price: "$60", location: "Palo Alto, CA", seller: "Emma Wilson", category: "Furniture", emoji: "📚" },
  { id: 6, title: "MacBook Pro 2021", price: "$1,100", location: "Fremont, CA", seller: "David Kim", category: "Electronics", emoji: "💻" },
  { id: 7, title: "Mountain Bike", price: "$280", location: "Walnut Creek, CA", seller: "Aisha Johnson", category: "Vehicles", emoji: "🚲" },
  { id: 8, title: "Leather Sofa", price: "$450", location: "Hayward, CA", seller: "Tom Rivera", category: "Furniture", emoji: "🛋️" },
];

const categoryColors: Record<string, string> = {
  Vehicles: "bg-blue-100",
  Electronics: "bg-purple-100",
  Clothing: "bg-pink-100",
  Garden: "bg-green-100",
  Furniture: "bg-yellow-100",
};

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = listings.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="flex pt-14">
        <LeftSidebar />
        <main className="flex-1 lg:ml-72 xl:mr-72 max-w-2xl mx-auto px-4 py-6 pb-20 md:pb-6">
          {/* Header */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-[#050505]">Marketplace</h1>
            <p className="text-sm text-[#65676B] mt-0.5">Buy and sell items in your community</p>
            <Link
              href="/marketplace/sell"
              className="inline-flex items-center gap-1.5 mt-3 bg-[#1877F2] hover:bg-[#166FE5] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <Plus size={16} />
              Sell Something
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex items-center bg-white rounded-xl px-4 py-2.5 gap-2 shadow-sm border border-gray-100 mb-4">
            <Search size={18} className="text-[#65676B] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Marketplace"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none w-full"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#1877F2] text-white"
                    : "bg-white text-[#050505] hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Listings Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-[#65676B] text-sm">
              No listings found.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {filtered.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  {/* Emoji thumbnail */}
                  <div
                    className={`w-full h-32 flex items-center justify-center text-5xl ${
                      categoryColors[item.category] ?? "bg-gray-100"
                    }`}
                  >
                    {item.emoji}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-[#050505] text-sm leading-tight truncate">{item.title}</p>
                    <p className="text-[#1877F2] font-semibold text-sm mt-0.5">{item.price}</p>
                    <p className="text-xs text-[#65676B] mt-0.5 truncate">{item.location}</p>
                    <p className="text-xs text-[#65676B] truncate">by {item.seller}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
