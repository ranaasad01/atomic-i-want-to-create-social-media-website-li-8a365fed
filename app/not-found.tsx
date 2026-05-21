import Link from "next/link";
import { Home, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1877F2] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">S</span>
          </div>
          <span className="text-[#1877F2] font-bold text-xl">SocialConnect</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-lg">
          {/* Illustration */}
          <div className="relative mx-auto w-48 h-48 mb-8">
            <div className="w-48 h-48 bg-[#E7F3FF] rounded-full flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-[#1877F2] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-5xl">?</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">!</span>
                </div>
              </div>
            </div>
            {/* Floating elements */}
            <div className="absolute top-4 left-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center animate-bounce">
              <span className="text-lg">😕</span>
            </div>
            <div className="absolute bottom-4 right-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center animate-bounce" style={{ animationDelay: "0.3s" }}>
              <span className="text-lg">🔍</span>
            </div>
          </div>

          {/* Error Code */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-16 bg-gray-300" />
            <span className="text-6xl font-black text-[#1877F2]">404</span>
            <div className="h-px w-16 bg-gray-300" />
          </div>

          <h1 className="text-2xl font-bold text-[#050505] mb-3">
            This page isn&apos;t available
          </h1>
          <p className="text-[#65676B] text-base leading-relaxed mb-8">
            The link you followed may be broken, or the page may have been removed. 
            Don&apos;t worry — let&apos;s get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-6 py-3 rounded-xl text-base transition-colors w-full sm:w-auto justify-center"
            >
              <Home size={20} />
              Go to Home Feed
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 bg-white hover:bg-[#F0F2F5] text-[#050505] font-semibold px-6 py-3 rounded-xl text-base transition-colors border border-gray-200 w-full sm:w-auto justify-center"
            >
              <Search size={20} />
              Search SocialConnect
            </Link>
          </div>

          {/* Quick Links */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-[#65676B] mb-4">Or visit one of these pages:</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { href: "/friends", label: "Friends" },
                { href: "/messages", label: "Messages" },
                { href: "/notifications", label: "Notifications" },
                { href: "/photos", label: "Photos" },
                { href: "/settings", label: "Settings" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 bg-white hover:bg-[#E7F3FF] text-[#1877F2] font-medium rounded-full text-sm transition-colors border border-gray-200 hover:border-[#1877F2]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {["Privacy", "Terms", "Advertising", "Cookies", "More"].map((item) => (
            <button key={item} className="text-xs text-[#65676B] hover:underline">{item}</button>
          ))}
          <span className="text-xs text-[#65676B]">SocialConnect © 2024</span>
        </div>
      </footer>
    </div>
  );
}
