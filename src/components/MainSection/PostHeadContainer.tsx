import { Post } from "@/interface/interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { parseISO, formatDistance } from "date-fns";
import { useRedux } from "@/hooks/useRedux";

interface Props {
  authorId: number;
  post: Post;
  authorUsername: string;
}

export const PostHeadContainer = ({
  authorId,
  authorUsername,
  post,
}: Props) => {
  const { userLogged, dispatch } = useRedux();

  const date = formatDistance(
    parseISO(post.updated_at.toString()),
    Date.now(),
    {
      addSuffix: true,
    }
  );
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center">
        <Link href={`/profile/${authorId}`}>
          <div className="w-[50px] h-[50px] aspect-square relative">
            <Image
              src={
                post.author_image === undefined
                  ? `${process.env.NEXT_PUBLIC_API_URL}${userLogged?.image}`
                  : `${process.env.NEXT_PUBLIC_API_URL}${post.author_image}`
              }
              alt="#"
              fill
              loading="lazy"
              sizes="(max-wdith: 50px) 100vw, 30px"
              className="rounded-full object-cover object-top"
            />
          </div>
        </Link>
        <div>
          <p>{authorUsername}</p>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
};
