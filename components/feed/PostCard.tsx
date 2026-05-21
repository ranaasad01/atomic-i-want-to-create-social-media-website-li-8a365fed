"use client";

import { useState } from "react";
import Link from "next/link";
import { ThumbsUp, MessageCircle, Share2, MoreHorizontal, Globe, Users, Lock, Send } from 'lucide-react';
import Avatar from "../ui/Avatar";
import { Post, Comment } from "../../lib/types";
import { currentUser } from "../../lib/mockData";

interface PostCardProps {
  post: Post;
}

function CommentItem({ comment }: { comment: Comment }) {
  const [liked, setLiked] = useState(comment.liked || false);
  const [likes, setLikes] = useState(comment.likes);

  return (
    <div className="flex gap-2 mt-2">
      <Avatar src={comment.author.avatar} alt={comment.author.name} size="sm" />
      <div className="flex-1">
        <div className="bg-[#F0F2F5] rounded-2xl px-3 py-2 inline-block max-w-full">
          <Link href={"/profile/" + comment.author.id} className="font-semibold text-xs text-[#050505] hover:underline">
            {comment.author.name}
          </Link>
          <p className="text-sm text-[#050505] mt-0.5">{comment.content}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 ml-3">
          <button
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            className={"text-xs font-semibold " + (liked ? "text-[#1877F2]" : "text-[#65676B] hover:text-[#050505]")}
          >
            Like {likes > 0 && "· " + likes}
          </button>
          <button className="text-xs font-semibold text-[#65676B] hover:text-[#050505]">Reply</button>
          <span className="text-xs text-[#65676B]">{comment.timestamp}</span>
        </div>
      </div>
    </div>
  );
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked || false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments);
  const [showMenu, setShowMenu] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: "new-" + Date.now(),
      author: currentUser,
      content: commentText,
      timestamp: "Just now",
      likes: 0,
      liked: false,
    };
    setComments([...comments, newComment]);
    setCommentText("");
  };

  const privacyIcon = post.privacy === "public" ? Globe : post.privacy === "friends" ? Users : Lock;
  const PrivacyIcon = privacyIcon;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden fade-in">
      {/* Header */}
      <div className="flex items-start justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <Link href={"/profile/" + post.author.id}>
            <Avatar src={post.author.avatar} alt={post.author.name} size="md" isOnline={post.author.isOnline} />
          </Link>
          <div>
            <Link href={"/profile/" + post.author.id} className="font-semibold text-[#050505] text-sm hover:underline">
              {post.author.name}
            </Link>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-xs text-[#65676B]">{post.timestamp}</span>
              <span className="text-[#65676B]">·</span>
              <PrivacyIcon size={12} className="text-[#65676B]" />
            </div>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="w-9 h-9 rounded-full hover:bg-[#F0F2F5] flex items-center justify-center transition-colors"
          >
            <MoreHorizontal size={20} className="text-[#65676B]" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-10">
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F0F2F5] transition-colors">Save post</button>
              <button className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#F0F2F5] transition-colors">Hide post</button>
              <button className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-[#F0F2F5] transition-colors">Report post</button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-3">
        <p className="text-[#050505] text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="w-full bg-gray-100">
          <img
            src={post.image}
            alt="Post image"
            className="w-full max-h-[500px] object-cover"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Stats */}
      <div className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {likeCount > 0 && (
            <>
              <div className="flex -space-x-1">
                <div className="w-5 h-5 bg-[#1877F2] rounded-full flex items-center justify-center">
                  <ThumbsUp size={10} className="text-white" />
                </div>
              </div>
              <span className="text-xs text-[#65676B] ml-1">{likeCount.toLocaleString()}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-3">
          {comments.length > 0 && (
            <button
              onClick={() => setShowComments(!showComments)}
              className="text-xs text-[#65676B] hover:underline"
            >
              {comments.length} comment{comments.length !== 1 ? "s" : ""}
            </button>
          )}
          {post.shares > 0 && (
            <span className="text-xs text-[#65676B]">{post.shares} shares</span>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-1 border-t border-gray-100 flex items-center gap-1">
        <button
          onClick={handleLike}
          className={"flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#F0F2F5] transition-colors text-sm font-semibold " + (liked ? "text-[#1877F2]" : "text-[#65676B]")}
        >
          <ThumbsUp size={18} className={liked ? "fill-[#1877F2]" : ""} />
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#F0F2F5] transition-colors text-sm font-semibold text-[#65676B]"
        >
          <MessageCircle size={18} />
          <span>Comment</span>
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg hover:bg-[#F0F2F5] transition-colors text-sm font-semibold text-[#65676B]">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          <div className="flex gap-2 mt-3">
            <Avatar src={currentUser.avatar} alt={currentUser.name} size="sm" />
            <div className="flex-1 flex items-center gap-2 bg-[#F0F2F5] rounded-full px-3 py-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleComment()}
                className="flex-1 bg-transparent text-sm text-[#050505] placeholder-[#65676B] outline-none"
              />
              <button onClick={handleComment} className="text-[#1877F2] hover:text-[#166FE5] transition-colors">
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
