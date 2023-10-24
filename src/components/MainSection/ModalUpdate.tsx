import Image from "next/image";
import React, { useState, ChangeEvent, useRef } from "react";
import { BsFillImageFill } from "react-icons/bs";

export const ModalUpdate = () => {
  const [description, setDescription] = useState("");

  const [image, setImage] = useState<File>();

  const [prevImage, setPrevImage] = useState();

  const imageRef = useRef<HTMLInputElement>(null);

  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);

    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files![0]);

    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };

  return (
    <div className="fixed top-0 right-0 w-full h-full bg-black/80 flex items-center">
      <div className="">
        <form className="form" action="">
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
          <button className="formButton">Submit</button>
        </form>
      </div>
    </div>
  );
};
