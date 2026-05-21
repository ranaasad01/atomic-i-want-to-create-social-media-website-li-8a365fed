"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import PostComposer from "./PostComposer";
import StoryBar from "./StoryBar";
import { mockPosts, currentUser } from "../../lib/mockData";
import { Post } from "../../lib/types";

export default function FeedList() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);

  const handleNewPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: "new-" + Date.now(),
      author: currentUser,
      content,
      image,
      timestamp: "Just now",
      likes: 0,
      liked: false,
      comments: [],
      shares: 0,
      privacy: "public",
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="flex flex-col gap-4">
      <StoryBar />
      <PostComposer onPost={handleNewPost} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
