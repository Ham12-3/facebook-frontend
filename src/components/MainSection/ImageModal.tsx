import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { Post } from "@/interface/interface";
import { PostHeadContainer } from "./PostHeadContainer";
import { useRedux } from "@/hooks/useRedux";
import { Likes } from "./Likes";
import { CommentsContainer } from "./CommentsContainer";

const variants = {
  hidden: { x: 100 },
  visible: { x: 0, transition: { duration: 0.3 } },
};

interface Props {
  post: Post;
  posts: Post[];
  showModal: boolean;
}

export const ImageModal = ({ post, posts, showModal }: Props) => {
  const { userLogged } = useRedux();

  return (
    <>
      {showModal && (
        <div className="fixed top-0 h-full bg-black/80 flex items-center justify-center z-50">
          <motion.section
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            className="flex w-[1200px] h-[calc(100vh-100px)] bg-gray-200 dark:bg-dark-200"
          >
            <div className="relative w-full max-w-[700px] h-[calc(100vh-100px)] bg-black aspect-video">
              <Image
                alt="#"
                loading="lazy"
                fill
                placeholder="blur"
                blurDataURL="/blur.svg"
                sizes="(max-width: 920px) 100vw, 700px, 500px, 300px"
                src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                className="object-contain"
              />
            </div>
            <div className="w-full px-6 overflow-y-auto modal">
              <div className="mb-6">
                <PostHeadContainer
                  authorId={post.author_id ?? userLogged!.id}
                  post={post}
                  posts={posts}
                  authorUsername={
                    typeof post.author === "number"
                      ? userLogged!.username
                      : post.author
                  }
                />
              </div>
              <Likes
                likes={post.likes}
                likesCount={post.likes.length}
                postId={post.id}
              />
              <CommentsContainer />
            </div>
          </motion.section>
        </div>
      )}
    </>
  );
};
