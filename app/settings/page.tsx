"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Lock, Bell, Eye, Palette, Shield, HelpCircle, LogOut, ChevronRight, Check, Moon, Sun, Globe, Smartphone, Key, Trash2 } from 'lucide-react';
import Navbar from "../../components/layout/Navbar";
import MobileBottomNav from "../../components/layout/MobileBottomNav";
import Avatar from "../../components/ui/Avatar";
import { currentUser } from "../../lib/mockData";

type SettingsSection = "account" | "privacy" | "notifications" | "appearance" | "security" | "help";

const sections = [
  { key: "account" as SettingsSection, icon: User, label: "Account", desc: "Manage your account info" },
  { key: "privacy" as SettingsSection, icon: Eye, label: "Privacy", desc: "Control who sees your content" },
  { key: "notifications" as SettingsSection, icon: Bell, label: "Notifications", desc: "Manage notification preferences" },
  { key: "appearance" as SettingsSection, icon: Palette, label: "Appearance", desc: "Customize your experience" },
  { key: "security" as SettingsSection, icon: Shield, label: "Security", desc: "Password and login settings" },
  { key: "help" as SettingsSection, icon: HelpCircle, label: "Help & Support", desc: "Get help and report issues" },
];

function ToggleSwitch({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={"relative w-11 h-6 rounded-full transition-colors " + (enabled ? "bg-[#1877F2]" : "bg-gray-300")}
    >
      <span className={"absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform " + (enabled ? "translate-x-5" : "translate-x-0")} />
    </button>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>("account");
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    friendRequestNotifs: true,
    likeNotifs: true,
    commentNotifs: true,
    messageNotifs: true,
    birthdayNotifs: true,
    darkMode: false,
    compactMode: false,
    autoPlayVideos: true,
    profileVisibility: "friends",
    postDefaultPrivacy: "friends",
    searchVisibility: true,
    twoFactorAuth: false,
    loginAlerts: true,
    dataDownload: false,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const [profileForm, setProfileForm] = useState({
    name: currentUser.name,
    email: currentUser.email,
    bio: currentUser.bio,
    location: currentUser.location,
    workplace: currentUser.workplace,
    education: currentUser.education,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5]">
      <Navbar />
      <div className="pt-14 pb-20 md:pb-6">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-[#050505] mb-6">Settings</h1>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Sidebar */}
            <div className="lg:w-72 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Profile Summary */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <Avatar src={currentUser.avatar} alt={currentUser.name} size="lg" />
                    <div>
                      <p className="font-semibold text-[#050505] text-sm">{currentUser.name}</p>
                      <p className="text-xs text-[#65676B]">{currentUser.email}</p>
                    </div>
                  </div>
                </div>

                {/* Nav Items */}
                <div className="py-2">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => setActiveSection(section.key)}
                      className={"w-full flex items-center gap-3 px-4 py-3 hover:bg-[#F0F2F5] transition-colors text-left " + (activeSection === section.key ? "bg-[#E7F3FF]" : "")}
                    >
                      <div className={"w-9 h-9 rounded-full flex items-center justify-center " + (activeSection === section.key ? "bg-[#1877F2]" : "bg-[#E4E6EB]")}>
                        <section.icon size={18} className={activeSection === section.key ? "text-white" : "text-[#050505]"} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={"text-sm font-semibold " + (activeSection === section.key ? "text-[#1877F2]" : "text-[#050505]")}>{section.label}</p>
                        <p className="text-xs text-[#65676B] truncate">{section.desc}</p>
                      </div>
                      <ChevronRight size={16} className="text-[#65676B] flex-shrink-0" />
                    </button>
                  ))}

                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link href="/login" className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#FFF0F0] transition-colors text-left">
                      <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                        <LogOut size={18} className="text-red-500" />
                      </div>
                      <span className="text-sm font-semibold text-red-500">Log Out</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Account Settings */}
              {activeSection === "account" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#050505] mb-6">Account Settings</h2>

                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4 pb-5 border-b border-gray-100">
                      <Avatar src={currentUser.avatar} alt={currentUser.name} size="xl" />
                      <div>
                        <p className="font-semibold text-[#050505]">{currentUser.name}</p>
                        <button className="text-sm text-[#1877F2] hover:underline mt-1">Change profile photo</button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">Full Name</label>
                        <input
                          value={profileForm.name}
                          onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                          className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-2.5 px-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">Email Address</label>
                        <input
                          type="email"
                          value={profileForm.email}
                          onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                          className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-2.5 px-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">Bio</label>
                        <textarea
                          value={profileForm.bio}
                          onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                          rows={3}
                          className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-2.5 px-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all resize-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">Location</label>
                        <input
                          value={profileForm.location}
                          onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                          className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-2.5 px-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#050505] mb-1.5">Workplace</label>
                        <input
                          value={profileForm.workplace}
                          onChange={(e) => setProfileForm({ ...profileForm, workplace: e.target.value })}
                          className="w-full bg-[#F0F2F5] border border-[#CED0D4] rounded-xl py-2.5 px-4 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={handleSave}
                        className={"flex items-center gap-2 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors " + (saved ? "bg-green-500 text-white" : "bg-[#1877F2] hover:bg-[#166FE5] text-white")}
                      >
                        {saved ? <><Check size={16} /> Saved!</> : "Save Changes"}
                      </button>
                      <button className="font-semibold px-6 py-2.5 rounded-xl text-sm bg-[#E4E6EB] hover:bg-[#D8DADF] text-[#050505] transition-colors">
                        Cancel
                      </button>
                    </div>

                    <div className="border-t border-gray-100 pt-5">
                      <h3 className="font-semibold text-[#050505] mb-3">Danger Zone</h3>
                      <button className="flex items-center gap-2 text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors border border-red-200">
                        <Trash2 size={16} />
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Settings */}
              {activeSection === "privacy" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#050505] mb-6">Privacy Settings</h2>
                  <div className="flex flex-col gap-5">
                    <div>
                      <h3 className="font-semibold text-[#050505] mb-3">Who can see your content?</h3>
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium text-[#050505]">Default post privacy</p>
                            <p className="text-xs text-[#65676B]">Who can see your future posts</p>
                          </div>
                          <select
                            value={settings.postDefaultPrivacy}
                            onChange={(e) => setSettings({ ...settings, postDefaultPrivacy: e.target.value })}
                            className="bg-[#F0F2F5] border border-[#CED0D4] rounded-lg px-3 py-2 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                          >
                            <option value="public">Public</option>
                            <option value="friends">Friends</option>
                            <option value="only-me">Only Me</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                          <div>
                            <p className="text-sm font-medium text-[#050505]">Profile visibility</p>
                            <p className="text-xs text-[#65676B]">Who can see your profile</p>
                          </div>
                          <select
                            value={settings.profileVisibility}
                            onChange={(e) => setSettings({ ...settings, profileVisibility: e.target.value })}
                            className="bg-[#F0F2F5] border border-[#CED0D4] rounded-lg px-3 py-2 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2]"
                          >
                            <option value="public">Everyone</option>
                            <option value="friends">Friends only</option>
                            <option value="only-me">Only Me</option>
                          </select>
                        </div>
                        <div className="flex items-center justify-between py-3">
                          <div>
                            <p className="text-sm font-medium text-[#050505]">Search visibility</p>
                            <p className="text-xs text-[#65676B]">Allow others to find you by name</p>
                          </div>
                          <ToggleSwitch enabled={settings.searchVisibility} onChange={() => toggle("searchVisibility")} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Settings */}
              {activeSection === "notifications" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#050505] mb-6">Notification Settings</h2>
                  <div className="flex flex-col gap-6">
                    <div>
                      <h3 className="font-semibold text-[#050505] mb-3 flex items-center gap-2">
                        <Mail size={18} className="text-[#65676B]" /> Email Notifications
                      </h3>
                      <div className="flex items-center justify-between py-3 border-b border-gray-100">
                        <div>
                          <p className="text-sm font-medium text-[#050505]">Email notifications</p>
                          <p className="text-xs text-[#65676B]">Receive updates via email</p>
                        </div>
                        <ToggleSwitch enabled={settings.emailNotifications} onChange={() => toggle("emailNotifications")} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#050505] mb-3 flex items-center gap-2">
                        <Smartphone size={18} className="text-[#65676B]" /> Push Notifications
                      </h3>
                      <div className="flex flex-col gap-0">
                        {[
                          { key: "pushNotifications" as keyof typeof settings, label: "Push notifications", desc: "Receive push notifications on your device" },
                          { key: "friendRequestNotifs" as keyof typeof settings, label: "Friend requests", desc: "When someone sends you a friend request" },
                          { key: "likeNotifs" as keyof typeof settings, label: "Likes", desc: "When someone likes your post" },
                          { key: "commentNotifs" as keyof typeof settings, label: "Comments", desc: "When someone comments on your post" },
                          { key: "messageNotifs" as keyof typeof settings, label: "Messages", desc: "When you receive a new message" },
                          { key: "birthdayNotifs" as keyof typeof settings, label: "Birthdays", desc: "When a friend has a birthday" },
                        ].map((item) => (
                          <div key={item.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                            <div>
                              <p className="text-sm font-medium text-[#050505]">{item.label}</p>
                              <p className="text-xs text-[#65676B]">{item.desc}</p>
                            </div>
                            <ToggleSwitch enabled={settings[item.key] as boolean} onChange={() => toggle(item.key)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeSection === "appearance" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#050505] mb-6">Appearance</h2>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        {settings.darkMode ? <Moon size={20} className="text-[#65676B]" /> : <Sun size={20} className="text-[#65676B]" />}
                        <div>
                          <p className="text-sm font-medium text-[#050505]">Dark Mode</p>
                          <p className="text-xs text-[#65676B]">Switch to dark theme</p>
                        </div>
                      </div>
                      <ToggleSwitch enabled={settings.darkMode} onChange={() => toggle("darkMode")} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div>
                        <p className="text-sm font-medium text-[#050505]">Compact Mode</p>
                        <p className="text-xs text-[#65676B]">Show more content with less spacing</p>
                      </div>
                      <ToggleSwitch enabled={settings.compactMode} onChange={() => toggle("compactMode")} />
                    </div>
                    <div className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-[#050505]">Auto-play Videos</p>
                        <p className="text-xs text-[#65676B]">Automatically play videos in feed</p>
                      </div>
                      <ToggleSwitch enabled={settings.autoPlayVideos} onChange={() => toggle("autoPlayVideos")} />
                    </div>
                    <div className="border-t border-gray-100 pt-4">
                      <h3 className="font-semibold text-[#050505] mb-3">Language</h3>
                      <div className="flex items-center gap-3">
                        <Globe size={20} className="text-[#65676B]" />
                        <select className="bg-[#F0F2F5] border border-[#CED0D4] rounded-lg px-3 py-2 text-sm text-[#050505] focus:outline-none focus:ring-2 focus:ring-[#1877F2]">
                          <option>English (US)</option>
                          <option>Spanish</option>
                          <option>French</option>
                          <option>German</option>
                          <option>Japanese</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeSection === "security" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#050505] mb-6">Security Settings</h2>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Key size={20} className="text-[#65676B]" />
                        <div>
                          <p className="text-sm font-medium text-[#050505]">Two-Factor Authentication</p>
                          <p className="text-xs text-[#65676B]">Add an extra layer of security</p>
                        </div>
                      </div>
                      <ToggleSwitch enabled={settings.twoFactorAuth} onChange={() => toggle("twoFactorAuth")} />
                    </div>
                    <div className="flex items-center justify-between py-3 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <Bell size={20} className="text-[#65676B]" />
                        <div>
                          <p className="text-sm font-medium text-[#050505]">Login Alerts</p>
                          <p className="text-xs text-[#65676B]">Get notified of new logins</p>
                        </div>
                      </div>
                      <ToggleSwitch enabled={settings.loginAlerts} onChange={() => toggle("loginAlerts")} />
                    </div>
                    <div className="pt-2">
                      <button className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-[#F0F2F5] transition-colors border border-gray-200">
                        <Lock size={20} className="text-[#65676B]" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#050505]">Change Password</p>
                          <p className="text-xs text-[#65676B]">Update your account password</p>
                        </div>
                        <ChevronRight size={16} className="text-[#65676B]" />
                      </button>
                    </div>
                    <div>
                      <h3 className="font-semibold text-[#050505] mb-3">Active Sessions</h3>
                      <div className="flex flex-col gap-2">
                        {[
                          { device: "Chrome on MacBook Pro", location: "San Francisco, CA", current: true },
                          { device: "Safari on iPhone 15", location: "San Francisco, CA", current: false },
                          { device: "Firefox on Windows", location: "New York, NY", current: false },
                        ].map((session) => (
                          <div key={session.device} className="flex items-center justify-between p-3 rounded-xl border border-gray-200">
                            <div>
                              <p className="text-sm font-medium text-[#050505]">{session.device}</p>
                              <p className="text-xs text-[#65676B]">{session.location}</p>
                              {session.current && <span className="text-xs text-green-500 font-medium">Current session</span>}
                            </div>
                            {!session.current && (
                              <button className="text-xs text-red-500 hover:underline font-medium">Log out</button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Help Settings */}
              {activeSection === "help" && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-[#050505] mb-6">Help & Support</h2>
                  <div className="flex flex-col gap-3">
                    {[
                      { icon: HelpCircle, title: "Help Center", desc: "Find answers to common questions" },
                      { icon: Shield, title: "Report a Problem", desc: "Let us know if something isn't working" },
                      { icon: Globe, title: "Privacy Policy", desc: "Read our privacy policy" },
                      { icon: FileText, title: "Terms of Service", desc: "Read our terms of service" },
                      { icon: Mail, title: "Contact Support", desc: "Get in touch with our support team" },
                    ].map((item) => (
                      <button key={item.title} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#F0F2F5] transition-colors text-left border border-gray-100">
                        <div className="w-10 h-10 bg-[#E4E6EB] rounded-full flex items-center justify-center flex-shrink-0">
                          <item.icon size={20} className="text-[#050505]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#050505]">{item.title}</p>
                          <p className="text-xs text-[#65676B]">{item.desc}</p>
                        </div>
                        <ChevronRight size={16} className="text-[#65676B]" />
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-[#F0F2F5] rounded-xl">
                    <p className="text-sm font-semibold text-[#050505] mb-1">SocialConnect v2.4.1</p>
                    <p className="text-xs text-[#65676B]">© 2024 SocialConnect, Inc. All rights reserved.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </div>
  );
}

function FileText({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function Mail({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
