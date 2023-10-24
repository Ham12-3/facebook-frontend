import React from "react";
import { CreatePost } from "./CreatePost";
import { PostContainer } from "./PostContainer";
export const MainSection = () => {
  return (
    <div className="basis-[47%]">
      <CreatePost />
      <PostContainer />
    </div>
  );
};
