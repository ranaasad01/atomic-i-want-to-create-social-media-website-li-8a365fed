"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Edit, Phone, Video, Info, MoreHorizontal, Send, Smile, Image, Paperclip } from 'lucide-react';
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import Avatar from "../../components/ui/Avatar";
import { mockConversations, currentUser } from "../../lib/mockData";
import { Conversation, Message } from "../../lib/types";

function ConversationItem({ conv, isActive, onClick }: { conv: Conversation; isActive: boolean; onClick: () => void }) {
  const otherUser = conv.participants.find((p) => p.id !== currentUser.id)!;
  const isOwn = conv.lastMessage.senderId === currentUser.id;

  return (
    <button
      onClick={onClick}
      className={"w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0F2F5] transition-colors text-left " + (isActive ? "bg-[#E7F3FF]" : "")}
    >
      <Avatar src={otherUser.avatar} alt={otherUser.name} size="lg" isOnline={conv.isOnline} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={"text-sm truncate " + (conv.unreadCount > 0 ? "font-bold text-[#050505]" : "font-semibold text-[#050505]")}>
            {otherUser.name}
          </span>
          <span className="text-xs text-[#65676B] flex-shrink-0 ml-2">{conv.lastMessage.timestamp}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <p className={"text-xs truncate " + (conv.unreadCount > 0 ? "font-semibold text-[#050505]" : "text-[#65676B]")}>
            {isOwn ? "You: " : ""}{conv.lastMessage.content}
          </p>
          {conv.unreadCount > 0 && (
            <span className="w-5 h-5 bg-[#1877F2] text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0 ml-2">
              {conv.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div className={"flex items-end gap-2 " + (isOwn ? "flex-row-reverse" : "flex-row")}>
      <div
        className={"max-w-xs lg:max-w-md px-4 py-2.5 text-sm leading-relaxed " + (isOwn ? "message-sent" : "message-received")}
      >
        {message.content}
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [activeConv, setActiveConv] = useState<Conversation>(mockConversations[0]);
  const [messageText, setMessageText] = useState("");
  const [conversations, setConversations] = useState(mockConversations);
  const [searchQuery, setSearchQuery] = useState("");

  const otherUser = activeConv.participants.find((p) => p.id !== currentUser.id)!;

  const handleSend = () => {
    if (!messageText.trim()) return;
    const newMsg: Message = {
      id: "msg-" + Date.now(),
      senderId: currentUser.id,
      content: messageText,
      timestamp: "Just now",
      read: false,
      type: "text",
    };
    const updatedConvs = conversations.map((c) =>
      c.id === activeConv.id
        ? { ...c, messages: [...c.messages, newMsg], lastMessage: newMsg }
        : c
    );
    setConversations(updatedConvs);
    setActiveConv({ ...activeConv, messages: [...activeConv.messages, newMsg], lastMessage: newMsg });
    setMessageText("");
  };

  const filteredConvs = conversations.filter((c) => {
    const other = c.participants.find((p) => p.id !== currentUser.id);
    return other?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-16 md:pb-0 h-screen flex">
        {/* Conversation List */}
        <div className="w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
          {/* Header */}
          <div className="px-4 py-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-[#050505]">Messages</h2>
              <button className="w-9 h-9 bg-[#E4E6EB] hover:bg-[#D8DADF] rounded-full flex items-center justify-center transition-colors">
                <Edit size={18} className="text-[#050505]" />
              </button>
            </div>
            <div className="flex items-center gap-2 bg-[#F0F2F5] rounded-full px-3 py-2">
              <Search size={16} className="text-[#65676B]" />
              <input
                type="text"
                placeholder="Search messages"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none"
              />
            </div>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConvs.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-[#65676B] text-sm">No conversations found</p>
              </div>
            ) : (
              filteredConvs.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  isActive={activeConv.id === conv.id}
                  onClick={() => setActiveConv(conv)}
                />
              ))
            )}
          </div>
        </div>

        {/* Chat Window */}
        <div className="hidden md:flex flex-1 flex-col bg-white">
          {/* Chat Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Avatar src={otherUser.avatar} alt={otherUser.name} size="md" isOnline={activeConv.isOnline} />
              <div>
                <p className="font-semibold text-[#050505] text-sm">{otherUser.name}</p>
                <p className="text-xs text-[#65676B]">{activeConv.isOnline ? "Active now" : "Active recently"}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors text-[#1877F2]">
                <Phone size={20} />
              </button>
              <button className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors text-[#1877F2]">
                <Video size={20} />
              </button>
              <button className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors text-[#1877F2]">
                <Info size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {/* Profile info at top */}
            <div className="flex flex-col items-center py-6">
              <Avatar src={otherUser.avatar} alt={otherUser.name} size="2xl" isOnline={activeConv.isOnline} />
              <h3 className="font-bold text-[#050505] text-lg mt-3">{otherUser.name}</h3>
              <p className="text-sm text-[#65676B]">{otherUser.bio}</p>
              <Link href={"/profile/" + otherUser.id} className="mt-3 bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                View Profile
              </Link>
            </div>

            {activeConv.messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isOwn={msg.senderId === currentUser.id} />
            ))}
          </div>

          {/* Message Input */}
          <div className="px-4 py-3 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors text-[#1877F2]">
                <Paperclip size={20} />
              </button>
              <button className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors text-[#1877F2]">
                <Image size={20} />
              </button>
              <div className="flex-1 flex items-center gap-2 bg-[#F0F2F5] rounded-full px-4 py-2.5">
                <input
                  type="text"
                  placeholder="Aa"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  className="flex-1 bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none"
                />
                <button className="text-[#65676B] hover:text-[#050505] transition-colors">
                  <Smile size={18} />
                </button>
              </div>
              <button
                onClick={handleSend}
                disabled={!messageText.trim()}
                className="w-9 h-9 rounded-full bg-[#1877F2] hover:bg-[#166FE5] disabled:bg-[#BCC0C4] flex items-center justify-center transition-colors"
              >
                <Send size={16} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}
