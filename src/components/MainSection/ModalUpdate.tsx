import { useRedux } from "@/hooks/useRedux";
import { Post } from "@/interface/interface";
import { updatePostRedux } from "@/redux/reducers/post.slice";
import { updatePost } from "@/services/post";
import Image from "next/image";
import React, { useState, ChangeEvent, useRef, FormEvent } from "react";
import toast from "react-hot-toast";
import { BsFillImageFill } from "react-icons/bs";

interface Props {
  image: File | undefined;
  description: string;
  setImage: (newImage: File | undefined) => void;
  setDescription: (description: string) => void;
  prevImage: string | undefined;
  setPrevImage: (newPrevImage: string | undefined) => void;
  handleCloseUpdateModal: any;
  post: Post;
}

export const ModalUpdate = ({
  image,
  description,
  prevImage,
  setImage,
  setDescription,
  setPrevImage,
  handleCloseUpdateModal,
  post,
}: Props) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useRedux();

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files![0]);

    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

  const handleSubmit = async (e: FormEvent, postId: number) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("description", description || "");
      formData.append("image", image || "");
      const { data: postUpdated, message } = await updatePost(formData, postId);
      toast.success(message, { duration: 2500 });
      dispatch(updatePostRedux(postUpdated));
      setDescription("");
      setImage(undefined);
      setPrevImage(undefined);
    } catch (error) {}
  };

  return (
    <div
      onClick={handleCloseUpdateModal}
      className="fixed top-0 right-0 w-full h-full bg-black/80 flex items-center justify-center z-[60]"
    >
      <div onClick={(e) => e.stopPropagation()} className="">
        <form
          className="form"
          action=""
          onSubmit={(e) => handleSubmit(e, post.id)}
        >
          <textarea
            name="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input resize-none"
            rows={5}
          />
          <input
            type="file"
            className="hidden"
            ref={imageRef}
            onChange={fileSelected}
          />

          {image === undefined && prevImage === undefined && (
            <BsFillImageFill
              className="inputImage"
              onClick={() => imageRef.current!.click()}
            />
          )}

          {prevImage && (
            <div className="w-[600px] max-w-[620px] h-[300px] mx-auto relative cursor-pointer">
              <Image
                src={prevImage}
                alt="#"
                fill
                loading="lazy"
                className="object-top object-cover"
                onClick={() => imageRef.current!.click()}
                sizes="(max-width: 620px) 100vw, 500px"
              />
            </div>
          )}
          <button className="formButton">Submit</button>
        </form>
      </div>
    </div>
  );
};
