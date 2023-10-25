import React, { useState } from "react";
import { Button } from "./Button";
import { useRedux } from "@/hooks/useRedux";

interface Props {
  likesCount: number;
  likes: string[];
  postId: number;
}

export const Likes = ({ likesCount, likes, postId }: Props) => {
  const { userLogged } = useRedux();

  const [liked, setLiked] = useState(() => {
    if (likes.includes(userLogged!.username)) return true;
    return false;
  });

  const [likes_Count, setLikes_Count] = useState(likesCount);
  4;

  const handleLike = () => {
    try {
    } catch (error) {}
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <Button liked={liked} likesCount={likes_Count} />
      </div>
    </div>
  );
};
