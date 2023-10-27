import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const variants = {
  hidden: { opacity: 0, y: -100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const CommentsContainer = () => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      <div className="w-full">
        <form className="w-full flex flex-col gap-y-3" action="">
          <textarea
            placeholder="Add a comment"
            className="input resize-none textarea-transition placeholder:dark:text-gry-200  textarea-scrollbar text-gray-700 dark:text-gray-200 placeholder:text-gray-600 border-b-gray-400"
            name="text"
            ref={textareaRef}
            onFocus={() => (textareaRef.current!.style.height = "7rem")}
            onBlur={() => {
              if (textareaRef.current!.value === "") {
                textareaRef.current!.style.height = "3rem";
              }
            }}
          />
          <button className="bg-transparent self-end border-gray-500 border px-3 rounded-m py-[2px]">
            Submit
          </button>
        </form>

        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={variants}
          className="bg-gray-300/70 dark:bg-black/30 px-6 pt-[1px] pb-2 mt-4 rounded-lg h-fit"
        >
          <div className="my-6 flex items-center gap-x-4">
            <div className="w-[50px] h-[50px] aspect-square relative">
              <Image />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};
