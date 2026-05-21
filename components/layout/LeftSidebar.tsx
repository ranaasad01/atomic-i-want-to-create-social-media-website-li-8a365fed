"use client";

import Link from "next/link";
import { Home, Users, MessageCircle, Bell, Bookmark, Calendar, Settings, ShoppingBag } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { currentUser } from "../../lib/mockData";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { href: "/bookmarks", icon: Bookmark, label: "Bookmarks" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function LeftSidebar() {
  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 bg-[#F0F2F5] px-2 py-4 overflow-y-auto z-40">
      {/* Profile Link */}
      <Link
        href="/profile"
        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors mb-1"
      >
        <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
        <span className="font-semibold text-[#050505] text-sm">{currentUser.name}</span>
      </Link>

      {/* Nav Items */}
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#E4E6EB] transition-colors text-[#050505]"
          >
            <Icon size={22} className="text-[#1877F2] flex-shrink-0" />
            <span className="font-medium text-sm">{label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto px-3 pt-4 border-t border-gray-300">
        <p className="text-xs text-[#65676B]">
          © 2024 SocialConnect · Privacy · Terms
        </p>
      </div>
    </aside>
  );
}
