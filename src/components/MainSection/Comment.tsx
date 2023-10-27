import React from "react";

import { LiaCommentsSolid } from "react-icons/lia";

export const Comment = () => {
  return (
    <div className="inlline-flex gap-x-2 ml-6 items-center mt-2">
      <LiaCommentsSolid className="text-[24px] text-gray-500" /> Comment
    </div>
  );
};
