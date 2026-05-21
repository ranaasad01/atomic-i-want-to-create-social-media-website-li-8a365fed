"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../../components/layout/Navbar";
import LeftSidebar from "../../../components/layout/LeftSidebar";
import RightSidebar from "../../../components/layout/RightSidebar";
import MobileBottomNav from "../../../components/layout/MobileBottomNav";
import { Tag, Upload, CheckCircle } from 'lucide-react';

export default function SellOnMarketplacePage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [photoCount, setPhotoCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full bg-[#F0F2F5] rounded-lg px-3 py-2.5 text-sm text-[#050505] placeholder-[#65676B] outline-none focus:ring-2 focus:ring-[#1877F2] border border-transparent focus:border-[#1877F2]";

  const handlePublish = () => {
    if (title && price && category) {
      setSubmitted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="flex pt-14">
        <LeftSidebar />
        <main className="flex-1 lg:ml-72 xl:mr-72 max-w-2xl mx-auto px-4 py-6 pb-20 md:pb-6">
          {/* Back link */}
          <Link
            href="/marketplace"
            className="text-sm text-[#1877F2] hover:underline mb-2 inline-block"
          >
            ← Back to Marketplace
          </Link>

          {/* Header */}
          <div className="mb-5">
            <h1 className="text-2xl font-bold text-[#050505]">Create a Listing</h1>
            <p className="text-sm text-[#65676B] mt-0.5">
              Sell something to people in your community
            </p>
          </div>

          {submitted ? (
            /* Success Card */
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex flex-col items-center text-center gap-4">
              <CheckCircle size={48} className="text-green-500" />
              <h2 className="text-xl font-bold text-[#050505]">Listing Published!</h2>
              <p className="text-sm text-[#65676B]">
                Your listing{" "}
                <span className="font-semibold text-[#050505]">&ldquo;{title}&rdquo;</span>{" "}
                has been published for{" "}
                <span className="font-semibold text-[#050505]">${price}</span>.
              </p>
              <Link
                href="/marketplace"
                className="mt-2 inline-block bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold rounded-xl py-2.5 px-6 text-sm transition-colors"
              >
                View Marketplace
              </Link>
            </div>
          ) : (
            <>
              {/* Photo Upload Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Tag size={18} className="text-[#1877F2]" />
                  <span className="font-semibold text-[#050505] text-sm">Photos</span>
                </div>
                <label className="cursor-pointer block">
                  <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-10 gap-2 hover:border-[#1877F2] transition-colors">
                    <Upload size={32} className="text-gray-400" />
                    <span className="font-medium text-[#050505] text-sm">Add photos</span>
                    <span className="text-sm text-[#65676B]">or drag and drop</span>
                    {photoCount > 0 && (
                      <span className="mt-1 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                        {photoCount} photo(s) added
                      </span>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => setPhotoCount(e.target.files?.length ?? 0)}
                  />
                </label>
              </div>

              {/* Details Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-4 flex flex-col gap-4">
                <div className="flex items-center gap-2 mb-1">
                  <Tag size={18} className="text-[#1877F2]" />
                  <span className="font-semibold text-[#050505] text-sm">Listing Details</span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-semibold text-[#65676B] mb-1">Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. iPhone 14 Pro Max"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-semibold text-[#65676B] mb-1">Price *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#65676B] text-sm">$</span>
                    <input
                      type="number"
                      placeholder="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className={inputClass + " pl-7"}
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-semibold text-[#65676B] mb-1">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select a category</option>
                    <option value="Vehicles">Vehicles</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Garden">Garden</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-xs font-semibold text-[#65676B] mb-1">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select condition</option>
                    <option value="New">New</option>
                    <option value="Like New">Like New</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-xs font-semibold text-[#65676B] mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className={inputClass}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-[#65676B] mb-1">Description</label>
                  <textarea
                    placeholder="Describe your item..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className={inputClass + " resize-none"}
                  />
                </div>
              </div>

              {/* Publish Button */}
              <button
                onClick={handlePublish}
                disabled={!title || !price || !category}
                className="w-full bg-[#1877F2] hover:bg-[#166FE5] disabled:bg-[#BCC0C4] disabled:cursor-not-allowed text-white font-semibold rounded-xl py-3 text-sm transition-colors"
              >
                Publish Listing
              </button>
            </>
          )}
        </main>
        <RightSidebar />
      </div>
      <MobileBottomNav />
    </div>
  );
}
