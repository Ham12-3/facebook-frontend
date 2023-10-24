import { Post } from "@/interface/interface";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { parseISO, formatDistance } from "date-fns";
import { useRedux } from "@/hooks/useRedux";
import { BsThreeDots } from "react-icons/bs";
import { ModalUpdate } from "./ModalUpdate";

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

  //    CRUD Ref
  const showOptionsRef = useRef<HTMLDivElement>(null);

  // Updated at

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
        <div className="ml-4">
          <p className="text-black/70 dark:text-white font-bold capitalize">
            {authorUsername}
          </p>
          <span className="text-[13px] text-gray-500">{date}</span>
        </div>
      </div>

      {userLogged?.username === authorUsername && (
        <button
          onClick={() => showOptionsRef.current?.classList.toggle("hidden")}
        >
          <BsThreeDots className="text-black/70 dark:text-white text-[22px]" />

          <div ref={showOptionsRef} className="relative hidden">
            <div className="absolute top-0 text-white right-1 bg-blue-500 dark:bg-gray-950 px-2 pt-1 pb-2">
              <span className="cursor-pointer block mb-1">Update</span>
              <span className="cursor-pointer block">Delete</span>
            </div>
          </div>
        </button>
      )}

      <ModalUpdate />
    </div>
  );
};
