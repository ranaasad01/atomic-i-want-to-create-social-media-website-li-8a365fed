"use client";

import Link from "next/link";
import { Search, MoreHorizontal } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { mockUsers, mockConversations } from "../../lib/mockData";

export default function RightSidebar() {
  const onlineFriends = mockUsers.filter((u) => u.isOnline);

  return (
    <aside className="hidden xl:flex flex-col w-72 fixed right-0 top-14 h-[calc(100vh-56px)] overflow-y-auto py-4 px-2">
      {/* Sponsored */}
      <div className="mb-4">
        <p className="px-3 text-[#65676B] font-semibold text-sm mb-3">Sponsored</p>
        <div className="flex gap-3 px-3 py-2 rounded-xl hover:bg-[#E4E6EB] transition-colors cursor-pointer">
          <div className="w-28 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200">
            <img src="https://thumbs.dreamstime.com/b/sponsored-rubber-stamp-grunge-design-dust-scratches-effects-can-be-easily-removed-clean-crisp-look-color-easily-92303001.jpg" alt="Sponsored" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-sm font-medium text-[#050505]">TechGadgets Pro</p>
            <p className="text-xs text-[#65676B] mt-1">Discover the latest in tech innovation. Shop now and save 20%!</p>
            <p className="text-xs text-[#65676B] mt-1">techgadgets.com</p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 my-2" />

      {/* Contacts */}
      <div>
        <div className="flex items-center justify-between px-3 mb-2">
          <p className="text-[#65676B] font-semibold text-sm">Contacts</p>
          <div className="flex gap-1">
            <button className="w-8 h-8 rounded-full hover:bg-[#E4E6EB] flex items-center justify-center transition-colors">
              <Search size={16} className="text-[#65676B]" />
            </button>
            <button className="w-8 h-8 rounded-full hover:bg-[#E4E6EB] flex items-center justify-center transition-colors">
              <MoreHorizontal size={16} className="text-[#65676B]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-0.5">
          {mockUsers.map((user) => (
            <Link
              key={user.id}
              href={"/messages"}
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#E4E6EB] transition-colors"
            >
              <Avatar src={user.avatar} alt={user.name} size="md" isOnline={user.isOnline} />
              <span className="text-sm font-medium text-[#050505]">{user.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 my-4" />

      {/* Group Conversations */}
      <div>
        <p className="px-3 text-[#65676B] font-semibold text-sm mb-2">Group Conversations</p>
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#E4E6EB] transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">TG</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#050505]">Tech Geeks 🚀</p>
              <p className="text-xs text-[#65676B]">5 members</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#E4E6EB] transition-colors cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-teal-400 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">WE</span>
            </div>
            <div>
              <p className="text-sm font-medium text-[#050505]">Weekend Explorers</p>
              <p className="text-xs text-[#65676B]">8 members</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
