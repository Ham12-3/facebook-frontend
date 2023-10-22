"use client";

import React, { ChangeEvent, useState, useRef } from "react";
import { Head } from "./Head";
import { Multimedia } from "./Multimedia";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import { BsFillImageFill } from "react-icons/bs";
export const CreatePost = () => {
  const [image, setImage] = useState<File>();
  const [prevImage, setPrevImage] = useState();
  const [description, setDescription] = useState('')
  const imageRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files![0]);

    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

  return (
    <div>
      <Head id={user!.id} image={user!.image} author={user!.username} />
      <div className="px-[15px] pt-[20px]">
        <button className="w-full border-b-2 block text-slate-900/70 dark:text-white/80 border-slate-700/50 dark:border-gray-300 pb-3 text-[15px] cursor-pointer text-start my-3">
          What's on your mind
        </button>
        <Multimedia />
      </div>
      {/* <dialog> */}
      <form className="form" action="">
       
        <textarea
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e)=> setDescription(e.target.value)}
        className="input resize-none" rows={5} />
        <input
          type="file"
          className="hidden"
          ref={imageRef}
          onChange={fileSelected}
          id=""
        />

        {image === undefined && (
          <BsFillImageFill
            className="inputImage"
            onClick={() => imageRef.current!.click()}
          />
        )}

        {prevImage && (
          <div className="w-[600px] max-w-[620px] h-[300px] mx-auto relative">
            <Image
              src={prevImage}
              alt="#"
              fill
              loading="lazy"
              className="object-top object-cover"
              onClick={() => imageRef.current!.click()}
            />
          </div>
        )}
      </form>
      {/* </dialog> */}
    </div>
  );
};
