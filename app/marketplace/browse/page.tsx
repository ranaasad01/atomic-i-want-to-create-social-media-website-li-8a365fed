"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/layout/Navbar";
import LeftSidebar from "../../../components/layout/LeftSidebar";
import RightSidebar from "../../../components/layout/RightSidebar";
import MobileBottomNav from "../../../components/layout/MobileBottomNav";
import { Tag, ArrowLeft, Star, MapPin, Clock } from 'lucide-react';

const browseItems = [
  { id: 1, title: "Sony PlayStation 5", price: "$420", originalPrice: "$500", location: "San Francisco, CA", seller: "Kevin Park", category: "Electronics", emoji: "🎮", rating: 4.8, postedAgo: "2 hours ago" },
  { id: 2, title: "Trek Road Bike 2022", price: "$650", originalPrice: "$900", location: "Oakland, CA", seller: "Nina Torres", category: "Vehicles", emoji: "🚴", rating: 4.9, postedAgo: "5 hours ago" },
  { id: 3, title: "Dining Table Set (6 chairs)", price: "$380", originalPrice: "$550", location: "Berkeley, CA", seller: "Liam Chen", category: "Furniture", emoji: "🪑", rating: 4.7, postedAgo: "1 day ago" },
  { id: 4, title: "Canon EOS R50 Camera", price: "$620", originalPrice: "$750", location: "San Jose, CA", seller: "Mia Patel", category: "Electronics", emoji: "📷", rating: 5.0, postedAgo: "3 hours ago" },
  { id: 5, title: "Winter Parka Jacket (L)", price: "$85", originalPrice: "$200", location: "Palo Alto, CA", seller: "Jake Williams", category: "Clothing", emoji: "🧥", rating: 4.6, postedAgo: "2 days ago" },
  { id: 6, title: "Garden Tool Set", price: "$55", originalPrice: "$90", location: "Fremont, CA", seller: "Rosa Martinez", category: "Garden", emoji: "🌿", rating: 4.5, postedAgo: "6 hours ago" },
  { id: 7, title: "Apple Watch Series 8", price: "$290", originalPrice: "$400", location: "Walnut Creek, CA", seller: "Chris Nguyen", category: "Electronics", emoji: "⌚", rating: 4.9, postedAgo: "1 hour ago" },
  { id: 8, title: "Queen Bed Frame + Mattress", price: "$500", originalPrice: "$800", location: "Hayward, CA", seller: "Zoe Adams", category: "Furniture", emoji: "🛏️", rating: 4.7, postedAgo: "3 days ago" },
  { id: 9, title: "2020 Toyota Corolla", price: "$18,000", originalPrice: "$21,000", location: "Sunnyvale, CA", seller: "Ben Foster", category: "Vehicles", emoji: "🚗", rating: 4.8, postedAgo: "4 hours ago" },
  { id: 10, title: "Nike Air Jordan 1 (Size 10)", price: "$180", originalPrice: "$220", location: "Daly City, CA", seller: "Tara Singh", category: "Clothing", emoji: "👟", rating: 4.9, postedAgo: "12 hours ago" },
];

const categories = ["All", "Electronics", "Vehicles", "Furniture", "Clothing", "Garden"];

const categoryColors: Record<string, string> = {
  Electronics: "bg-purple-100 text-purple-700",
  Vehicles: "bg-blue-100 text-blue-700",
  Furniture: "bg-yellow-100 text-yellow-700",
  Clothing: "bg-pink-100 text-pink-700",
  Garden: "bg-green-100 text-green-700",
};

const categoryBg: Record<string, string> = {
  Electronics: "bg-purple-100",
  Vehicles: "bg-blue-100",
  Furniture: "bg-yellow-100",
  Clothing: "bg-pink-100",
  Garden: "bg-green-100",
};

function parsePrice(price: string): number {
  return parseFloat(price.replace(/[$,]/g, ""));
}

export default function MarketplaceBrowsePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const filtered = browseItems.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return parsePrice(a.price) - parsePrice(b.price);
    if (sortBy === "price-high") return parsePrice(b.price) - parsePrice(a.price);
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="flex pt-14">
        <LeftSidebar />
        <main className="flex-1 lg:ml-72 xl:mr-72 max-w-2xl mx-auto px-4 py-6 pb-20 md:pb-6">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Link href="/marketplace" className="p-2 rounded-full hover:bg-gray-200 transition">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Browse Listings</h1>
              <p className="text-sm text-gray-500">{sorted.length} items available near you</p>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 gap-4">
            {sorted.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 p-4">
                  {/* Emoji Thumbnail */}
                  <div className={`w-20 h-20 rounded-xl flex items-center justify-center text-4xl flex-shrink-0 ${categoryBg[item.category] || "bg-gray-100"}`}>
                    {item.emoji}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 text-base leading-tight truncate">{item.title}</h3>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${categoryColors[item.category] || "bg-gray-100 text-gray-600"}`}>
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-lg font-bold text-blue-600">{item.price}</span>
                      <span className="text-sm text-gray-400 line-through">{item.originalPrice}</span>
                    </div>

                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {item.rating}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.postedAgo}
                      </span>
                      <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 transition font-medium">
                        View Deal
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {sorted.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No listings found</p>
              <p className="text-sm">Try a different category</p>
            </div>
          )}
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
