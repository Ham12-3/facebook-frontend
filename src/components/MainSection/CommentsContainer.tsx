import React, { useRef } from "react";

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
      </div>
    </>
  );
};
