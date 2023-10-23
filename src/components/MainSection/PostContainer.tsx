"use client";
import React, { useEffect } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { useRedux } from "@/hooks/useRedux";
import { usePost } from "@/hooks/usePost";
import { PostHeadContainer } from "./PostHeadContainer";

const variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
};

export const PostContainer = () => {
  const { posts } = useRedux();
  const { setPage } = usePost();

  useEffect(() => {}, []);

  return (
    <>
      <AnimatePresence>
        {posts.map((post, index) => {
          return (
            <motion.div
              key={post.id}
              variants={variants}
              initial="hidden"
              animate={"visible"}
              exit={"hidden"}
            >
              <PostHeadContainer
                authorId={post.author_id}
                post={post}
                authorUsername={post.author}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
};
