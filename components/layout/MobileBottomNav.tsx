"use client";

import Link from "next/link";
import { Home, Users, MessageCircle, Bell, User } from 'lucide-react';
import { currentUser } from "../../lib/mockData";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/messages", icon: MessageCircle, label: "Messages", badge: 4 },
  { href: "/notifications", icon: Bell, label: "Notifications", badge: 3 },
  { href: "/profile/" + currentUser.id, icon: User, label: "Profile" },
];

export default function MobileBottomNav() {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 mobile-nav-safe">
      <div className="flex items-center justify-around h-14">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="relative flex flex-col items-center justify-center flex-1 h-full text-[#65676B] hover:text-[#1877F2] transition-colors"
          >
            <div className="relative">
              <item.icon size={24} />
              {item.badge && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
