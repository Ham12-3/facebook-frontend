import React from "react";
import { Head } from "./Head";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
export const CreatePost = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div>
      <Head id={user!.id} image={user!.image} author={user!.username} />
    </div>
  );
};
