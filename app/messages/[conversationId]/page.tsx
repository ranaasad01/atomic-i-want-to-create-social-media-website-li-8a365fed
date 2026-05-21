"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Phone, Video, Info, Send, Smile, Image, Paperclip } from 'lucide-react';
import Navbar from "../../../components/layout/Navbar";
import MobileBottomNav from "../../../components/layout/MobileBottomNav";
import Avatar from "../../../components/ui/Avatar";
import { mockConversations, currentUser } from "../../../lib/mockData";
import { Message } from "../../../lib/types";

export default function ConversationPage({ params }: { params: { conversationId: string } }) {
  const conversation = mockConversations.find((c) => c.id === params.conversationId) || mockConversations[0];
  const otherUser = conversation.participants.find((p) => p.id !== currentUser.id)!;

  const [messages, setMessages] = useState(conversation.messages);
  const [messageText, setMessageText] = useState("");

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
    setMessages([...messages, newMsg]);
    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-16 md:pb-0 h-screen flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
          <div className="flex items-center gap-3">
            <Link href="/messages" className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors md:hidden">
              <ArrowLeft size={20} className="text-[#050505]" />
            </Link>
            <Avatar src={otherUser.avatar} alt={otherUser.name} size="md" isOnline={conversation.isOnline} />
            <div>
              <p className="font-semibold text-[#050505] text-sm">{otherUser.name}</p>
              <p className="text-xs text-[#65676B]">{conversation.isOnline ? "Active now" : "Active recently"}</p>
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

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
          {/* Profile info */}
          <div className="flex flex-col items-center py-8">
            <Avatar src={otherUser.avatar} alt={otherUser.name} size="2xl" isOnline={conversation.isOnline} />
            <h3 className="font-bold text-[#050505] text-xl mt-3">{otherUser.name}</h3>
            <p className="text-sm text-[#65676B] mt-1 text-center max-w-xs">{otherUser.bio}</p>
            <div className="flex gap-3 mt-4">
              <Link href={"/profile/" + otherUser.id} className="bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                View Profile
              </Link>
              <button className="bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] font-semibold px-4 py-2 rounded-lg text-sm transition-colors">
                Mute
              </button>
            </div>
          </div>

          {/* Message Bubbles */}
          {messages.map((msg) => {
            const isOwn = msg.senderId === currentUser.id;
            return (
              <div key={msg.id} className={"flex items-end gap-2 " + (isOwn ? "flex-row-reverse" : "flex-row")}>
                {!isOwn && (
                  <Avatar src={otherUser.avatar} alt={otherUser.name} size="sm" />
                )}
                <div className="flex flex-col gap-1 max-w-xs lg:max-w-md">
                  <div className={"px-4 py-2.5 text-sm leading-relaxed " + (isOwn ? "message-sent" : "message-received")}>
                    {msg.content}
                  </div>
                  <span className={"text-xs text-[#65676B] " + (isOwn ? "text-right" : "text-left")}>{msg.timestamp}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="px-4 py-3 border-t border-gray-200 bg-white">
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
      <MobileBottomNav />
    </div>
  );
}
