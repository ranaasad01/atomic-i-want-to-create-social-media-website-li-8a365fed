export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverPhoto: string;
  bio: string;
  location: string;
  workplace: string;
  education: string;
  friendCount: number;
  mutualFriends?: number;
  isOnline?: boolean;
  joinedDate: string;
  relationship?: string;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  liked?: boolean;
  comments: Comment[];
  shares: number;
  privacy: "public" | "friends" | "only-me";
  sharedFrom?: Post;
}

export interface Story {
  id: string;
  author: User;
  image: string;
  timestamp: string;
  viewed?: boolean;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "friend_request" | "share" | "mention" | "birthday";
  actor: User;
  postId?: string;
  postPreview?: string;
  timestamp: string;
  read: boolean;
  message: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: "text" | "image" | "emoji";
  imageUrl?: string;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  unreadCount: number;
  isOnline?: boolean;
  messages: Message[];
}

export interface FriendRequest {
  id: string;
  from: User;
  timestamp: string;
  mutualFriends: number;
}

export interface Photo {
  id: string;
  url: string;
  caption?: string;
  timestamp: string;
  likes: number;
  comments: number;
}
