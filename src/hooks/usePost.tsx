import React, { useEffect, useState } from "react";
import { getPosts } from "@/services/post";
export const usePost = () => {
  let PAGE_SIZE = 3;
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchPosts() {
      const response = await getPosts(page, PAGE_SIZE);
    }

    fetchPosts();
  }, [page]);

  return { setPage };
};
