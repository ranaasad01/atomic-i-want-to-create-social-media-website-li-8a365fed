"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, ThumbsUp, MessageCircle, UserPlus, Share2, Gift, AtSign, Check, Settings } from 'lucide-react';
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import Avatar from "../../components/ui/Avatar";
import { mockNotifications } from "../../lib/mockData";
import { Notification } from "../../lib/types";

function NotificationIcon({ type }: { type: Notification["type"] }) {
  const configs: Record<string, { icon: React.ReactNode; bg: string }> = {
    like: { icon: <ThumbsUp size={14} className="text-white" />, bg: "bg-[#1877F2]" },
    comment: { icon: <MessageCircle size={14} className="text-white" />, bg: "bg-[#45BD62]" },
    friend_request: { icon: <UserPlus size={14} className="text-white" />, bg: "bg-[#1877F2]" },
    share: { icon: <Share2 size={14} className="text-white" />, bg: "bg-[#F7B928]" },
    mention: { icon: <AtSign size={14} className="text-white" />, bg: "bg-purple-500" },
    birthday: { icon: <Gift size={14} className="text-white" />, bg: "bg-red-500" },
  };
  const config = configs[type] || configs.like;
  return (
    <div className={"w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 " + config.bg}>
      {config.icon}
    </div>
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications(notifications.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const displayed = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  const todayNotifs = displayed.filter((n) => ["2 minutes ago", "15 minutes ago", "1 hour ago", "2 hours ago", "3 hours ago", "Today"].includes(n.timestamp));
  const earlierNotifs = displayed.filter((n) => !["2 minutes ago", "15 minutes ago", "1 hour ago", "2 hours ago", "3 hours ago", "Today"].includes(n.timestamp));

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-20 md:pb-6">
        <div className="max-w-2xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[#050505]">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-[#65676B] mt-0.5">{unreadCount} new notification{unreadCount !== 1 ? "s" : ""}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="flex items-center gap-1.5 text-sm text-[#1877F2] hover:bg-[#E7F3FF] px-3 py-2 rounded-lg font-medium transition-colors"
                >
                  <Check size={16} />
                  Mark all read
                </button>
              )}
              <button className="w-9 h-9 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-full flex items-center justify-center transition-colors">
                <Settings size={18} className="text-[#050505]" />
              </button>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={"px-4 py-2 rounded-full text-sm font-semibold transition-colors " + (filter === "all" ? "bg-[#E7F3FF] text-[#1877F2]" : "bg-white text-[#65676B] hover:bg-[#F0F2F5] border border-gray-200")}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={"px-4 py-2 rounded-full text-sm font-semibold transition-colors flex items-center gap-1.5 " + (filter === "unread" ? "bg-[#E7F3FF] text-[#1877F2]" : "bg-white text-[#65676B] hover:bg-[#F0F2F5] border border-gray-200")}
            >
              Unread
              {unreadCount > 0 && (
                <span className="w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Notifications List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {displayed.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-[#E4E6EB] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={28} className="text-[#65676B]" />
                </div>
                <h3 className="font-semibold text-[#050505] text-lg mb-2">No notifications</h3>
                <p className="text-[#65676B] text-sm">You&apos;re all caught up! Check back later for new activity.</p>
              </div>
            ) : (
              <>
                {todayNotifs.length > 0 && (
                  <div>
                    <div className="px-4 py-3 border-b border-gray-100">
                      <h3 className="font-bold text-[#050505] text-base">New</h3>
                    </div>
                    {todayNotifs.map((notif) => (
                      <NotificationItem key={notif.id} notification={notif} onRead={markRead} />
                    ))}
                  </div>
                )}
                {earlierNotifs.length > 0 && (
                  <div>
                    <div className="px-4 py-3 border-t border-gray-100">
                      <h3 className="font-bold text-[#050505] text-base">Earlier</h3>
                    </div>
                    {earlierNotifs.map((notif) => (
                      <NotificationItem key={notif.id} notification={notif} onRead={markRead} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}

function NotificationItem({ notification, onRead }: { notification: Notification; onRead: (id: string) => void }) {
  return (
    <div
      className={"flex items-start gap-3 px-4 py-3 hover:bg-[#F0F2F5] transition-colors cursor-pointer border-b border-gray-50 last:border-0 " + (!notification.read ? "bg-[#E7F3FF]/40" : "")}
      onClick={() => onRead(notification.id)}
    >
      <div className="relative flex-shrink-0">
        <Avatar src={notification.actor.avatar} alt={notification.actor.name} size="lg" />
        <div className="absolute -bottom-1 -right-1">
          <NotificationIcon type={notification.type} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-[#050505] leading-snug">
          <Link href={"/profile/" + notification.actor.id} className="font-semibold hover:underline">
            {notification.actor.name}
          </Link>{" "}
          {notification.message.replace(notification.actor.name, "").trim()}
        </p>
        {notification.postPreview && (
          <p className="text-xs text-[#65676B] mt-0.5 truncate">&ldquo;{notification.postPreview}&rdquo;</p>
        )}
        <p className={"text-xs mt-1 font-medium " + (!notification.read ? "text-[#1877F2]" : "text-[#65676B]")}>
          {notification.timestamp}
        </p>
      </div>
      {!notification.read && (
        <div className="w-3 h-3 bg-[#1877F2] rounded-full flex-shrink-0 mt-1" />
      )}
      {notification.type === "friend_request" && !notification.read && (
        <div className="flex gap-2 ml-2">
          <button className="bg-[#1877F2] hover:bg-[#166FE5] text-white font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
            Confirm
          </button>
          <button className="bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors">
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
