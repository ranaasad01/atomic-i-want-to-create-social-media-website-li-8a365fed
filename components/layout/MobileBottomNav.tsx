"use client";

import Link from "next/link";
import { Home, Users, MessageCircle, Bell, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex md:hidden">
      <Link
        href="/"
        className="flex flex-col items-center justify-center flex-1 py-2 text-[#1877F2] hover:bg-[#F0F2F5] transition-colors"
      >
        <Home size={22} />
        <span className="text-xs mt-0.5">Home</span>
      </Link>
      <Link
        href="/friends"
        className="flex flex-col items-center justify-center flex-1 py-2 text-[#65676B] hover:bg-[#F0F2F5] transition-colors"
      >
        <Users size={22} />
        <span className="text-xs mt-0.5">Friends</span>
      </Link>
      <Link
        href="/messages"
        className="relative flex flex-col items-center justify-center flex-1 py-2 text-[#65676B] hover:bg-[#F0F2F5] transition-colors"
      >
        <MessageCircle size={22} />
        <span className="text-xs mt-0.5">Messages</span>
      </Link>
      <Link
        href="/notifications"
        className="relative flex flex-col items-center justify-center flex-1 py-2 text-[#65676B] hover:bg-[#F0F2F5] transition-colors"
      >
        <Bell size={22} />
        <span className="text-xs mt-0.5">Alerts</span>
      </Link>
      <Link
        href="/marketplace"
        className="flex flex-col items-center justify-center flex-1 py-2 text-[#65676B] hover:bg-[#F0F2F5] transition-colors"
      >
        <ShoppingBag size={22} />
        <span className="text-xs mt-0.5">Market</span>
      </Link>
    </nav>
  );
}
