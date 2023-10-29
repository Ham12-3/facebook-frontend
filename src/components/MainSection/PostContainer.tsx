"use client";
import React, { Suspense, useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRedux } from "@/hooks/useRedux";
import { usePost } from "@/hooks/usePost";
import { PostHeadContainer } from "./PostHeadContainer";
import { PostDescription } from "./PostDescription";
import Loading from "@/app/loading";
import Image from "next/image";
import { Likes } from "./Likes";
import { ImageModal } from "./ImageModal";
import { useModal } from "@/hooks/useModal";
import { getPost } from "@/services/post";
import { Post } from "@/interface/interface";
import {
  getCommentsRedux,
  removeCommentsRedux,
} from "@/redux/reducers/comment.slice";
import { Toaster } from "react-hot-toast";

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

export const PostContainer = () => {
  const { posts, userLogged, dispatch } = useRedux();
  // console.log(posts);
  const { setPage } = usePost();

  const [showImageModalIndex, handleOpenImageModal, handleCloseImageModal] =
    useModal();

  const handleOpenImage = async (id: number) => {
    handleOpenImageModal(id);

    const response: Post = await getPost(id);
    console.log(response);
    const sortComments = [...response.comments].sort((a, b) => b.id - a.id);
    // console.log(sortComments);
    dispatch(getCommentsRedux(sortComments));
  };

  const handleCloseImage = () => {
    handleCloseImageModal();
    dispatch(removeCommentsRedux());
  };

  // useEffect(() => {}, []);

  return (
    <AnimatePresence>
      {posts.map((post, index) => {
        return (
          <motion.div
            key={post.id}
            variants={variants}
            initial="hidden"
            animate={"visible"}
            exit={"hidden"}
            className="w-full bg-gray-200/30 dark:bg-black p-[20px] shadow-md text-gray-400 rounded-[6px] my-5 transition-colors duration-300 ease-in"
          >
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
            <PostDescription description={post.description} />

            {/* Image  */}

            <Suspense fallback={<Loading />}>
              {post.image !== null && (
                <div
                  className="relative w-full max-w-[800px] h-[330px] mb-[5px]"
                  onClick={() => handleOpenImage(post.id)}
                >
                  <Image
                    alt="#"
                    fill
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="/blur.svg"
                    sizes="(max-width: 800px) 100vw, 700px, 500px, 300px"
                    src={`${process.env.NEXT_PUBLIC_API_URL}${post.image}`}
                    className="object-cover object-top cursor-pointer rounded-[5px]"
                  />
                </div>
              )}
            </Suspense>
            <Likes
              likes={post.likes}
              likesCount={post.likes.length}
              postId={post.id}
            />
            <ImageModal
              post={post}
              posts={posts}
              showModal={showImageModalIndex === post.id}
              handleCloseImage={handleCloseImage}
            />
          </motion.div>
        );
      })}
      <Toaster />
    </AnimatePresence>
  );
};
