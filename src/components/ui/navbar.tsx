import React from "react";
import AddPost from "@/components/post/add-post";

export default function Navbar() {
  return (
    <nav className="sticky top-0 flex w-full flex-row items-center justify-between border-b bg-white px-8 py-4">
      <h1 className="text-2xl font-semibold">All Posts</h1>
      <AddPost />
    </nav>
  );
}
