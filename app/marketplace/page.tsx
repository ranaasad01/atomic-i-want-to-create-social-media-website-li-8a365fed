"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, ShoppingBag, MapPin, Heart, Plus } from 'lucide-react';
import Image from "next/image";

const categories = [
  { id: "all", label: "All" },
  { id: "vehicles", label: "Vehicles" },
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "furniture", label: "Furniture" },
  { id: "garden", label: "Garden" },
  { id: "toys", label: "Toys" },
  { id: "sports", label: "Sports" },
  { id: "books", label: "Books" },
];

const listings = [
  {
    id: 1,
    title: "iPhone 14 Pro – 256GB Space Black",
    price: 799,
    location: "San Francisco, CA",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&q=80",
    liked: false,
    condition: "Like New",
  },
  {
    id: 2,
    title: "Vintage Leather Sofa",
    price: 350,
    location: "Oakland, CA",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    liked: false,
    condition: "Good",
  },
  {
    id: 3,
    title: "Trek Mountain Bike 2022",
    price: 620,
    location: "Berkeley, CA",
    category: "sports",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    liked: true,
    condition: "Good",
  },
  {
    id: 4,
    title: "MacBook Pro 14-inch M2",
    price: 1499,
    location: "Palo Alto, CA",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    liked: false,
    condition: "Like New",
  },
  {
    id: 5,
    title: "Dining Table – Solid Oak",
    price: 280,
    location: "San Jose, CA",
    category: "furniture",
    image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?w=400&q=80",
    liked: false,
    condition: "Fair",
  },
  {
    id: 6,
    title: "Nike Air Jordan 1 Retro – Size 10",
    price: 180,
    location: "Fremont, CA",
    category: "clothing",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    liked: false,
    condition: "New",
  },
  {
    id: 7,
    title: "Sony PlayStation 5",
    price: 450,
    location: "San Francisco, CA",
    category: "electronics",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&q=80",
    liked: true,
    condition: "Good",
  },
  {
    id: 8,
    title: "Harry Potter Complete Book Set",
    price: 45,
    location: "Daly City, CA",
    category: "books",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80",
    liked: false,
    condition: "Good",
  },
];

export default function MarketplacePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedItems, setLikedItems] = useState<Set<number>>(
    new Set(listings.filter((l) => l.liked).map((l) => l.id))
  );

  const toggleLike = (id: number) => {
    setLikedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = listings.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5] pt-14">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
              <ShoppingBag size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#050505]">Marketplace</h1>
              <p className="text-sm text-[#65676B]">Buy and sell in your community</p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
            <Plus size={16} />
            <span className="hidden sm:inline">Create Listing</span>
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-3 mb-6">
          <div className="flex-1 flex items-center bg-white rounded-xl px-4 py-2.5 gap-2 shadow-sm border border-gray-200">
            <Search size={18} className="text-[#65676B] flex-shrink-0" />
            <input
              type="text"
              placeholder="Search Marketplace"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none w-full"
            />
          </div>
          <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-[#050505] hover:bg-[#F0F2F5] transition-colors shadow-sm">
            <SlidersHorizontal size={16} className="text-[#65676B]" />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-[#1877F2] text-white"
                  : "bg-white text-[#050505] hover:bg-[#E4E6EB] border border-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <ShoppingBag size={48} className="text-[#BCC0C4] mb-4" />
            <h3 className="text-lg font-semibold text-[#050505] mb-1">No listings found</h3>
            <p className="text-sm text-[#65676B]">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-[#F0F2F5]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />
                  {/* Like Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(item.id);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                  >
                    <Heart
                      size={16}
                      className={likedItems.has(item.id) ? "fill-red-500 text-red-500" : "text-[#65676B]"}
                    />
                  </button>
                  {/* Condition Badge */}
                  <span className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.condition}
                  </span>
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="font-bold text-[#050505] text-sm mb-0.5">${item.price.toLocaleString()}</p>
                  <p className="text-sm text-[#050505] line-clamp-2 leading-snug mb-1">{item.title}</p>
                  <div className="flex items-center gap-1 text-xs text-[#65676B]">
                    <MapPin size={11} />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
