import React from "react";

import { motion } from "framer-motion";
import Image from "next/image";
import { Post } from "@/interface/interface";

const variants = {
  hidden: { x: 100 },
  visible: { x: 0, transition: { duration: 0.3 } },
};

interface Props {
  post: Post;
}

export const ImageModal = ({ post }: Props) => {
  return (
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
      </motion.section>
    </div>
  );
};
