"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, MessageCircle, Bell, Bookmark, Calendar, ShoppingBag, Settings } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { currentUser } from "../../lib/mockData";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
  { href: "/saved", icon: Bookmark, label: "Saved" },
  { href: "/events", icon: Calendar, label: "Events" },
  { href: "/settings", icon: Settings, label: "Settings" },
];

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-72 bg-[#F0F2F5] px-3 py-4 overflow-y-auto z-40">
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
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                isActive
                  ? "bg-[#E7F3FF] text-[#1877F2]"
                  : "text-[#050505] hover:bg-[#E4E6EB]"
              }`}
            >
              <Icon size={22} className={isActive ? "text-[#1877F2]" : "text-[#050505]"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <p className="text-xs text-[#65676B] px-3">
          © 2024 SocialConnect · Privacy · Terms
        </p>
      </div>
    </aside>
  );
}
