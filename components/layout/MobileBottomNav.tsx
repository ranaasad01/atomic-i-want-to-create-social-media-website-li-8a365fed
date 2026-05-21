"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Bell, MessageCircle, ShoppingBag } from 'lucide-react';

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/friends", icon: Users, label: "Friends" },
  { href: "/messages", icon: MessageCircle, label: "Messages" },
  { href: "/notifications", icon: Bell, label: "Notifications" },
  { href: "/marketplace", icon: ShoppingBag, label: "Marketplace" },
];

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 flex md:hidden">
      {navItems.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors ${
              isActive ? "text-[#1877F2]" : "text-[#65676B] hover:text-[#050505]"
            }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
