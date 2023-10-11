"use client";
import { ChangeEvent, useRef, useState } from "react";
import { Form } from "@/interface/interface";
import { BsFillImageFill } from "react-icons/bs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const AuthForm = ({ process }: { process: string }) => {
  const [form, setForm] = useState<Form>({});
  const [image, setImage] = useState<File>();
  const [prevImage, setPrevImage] = useState();
  const imgRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    setImage(e.target.files![0]);
    const reader: any = new FileReader();
    reader.readAsDataURL(e.target.files![0]);
    reader.onloadend = () => {
      setPrevImage(reader.result);
    };
  };
  return (
    <div
      className="h-screen w-screen flex items-center justify-center"
      style={{ background: "url(https://i.stack.imgur.com/vzbuQ.jpg)" }}
    >
      <form
        className="relative flex-col flex w-[580px] justify-center gap-y-5 bg-white/[.03] py-10 px-12 backdrop-blur-[3px]"
        action=""
      >
        <h1 className="text-5xl font-bold text-white"> {process} </h1>
        <input
          type="text"
          placeholder="Username"
          name="username"
          className="input"
          required
          autoFocus
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="input"
          required
          onChange={handleChange}
        />
        {pathname === "/register" && (
          <>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="input"
              required
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="First Name"
              name="first_name"
              className="input"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="last_name"
              className="input"
              onChange={handleChange}
            />
            <textarea
              placeholder="Bio ..."
              name="bio"
              rows={5}
              className="input resize-none"
              onChange={handleChange}
            />
            <input
              className="hidden"
              type="file"
              name="image"
              required
              onChange={fileSelected}
              ref={imgRef}
            />
            {image === undefined && (
              <BsFillImageFill
                className="inputImage"
                onClick={() => imgRef.current?.click()}
              />
            )}

            {prevImage && (
              <div className="w-full max-w-[80px] h-[80px] self-end mr-5 top-8 absolute">
                <Image
                  src={prevImage}
                  alt="prevImage"
                  fill
                  placeholder="blur"
                  blurDataURL="/blur.svg"
                  className="rounded-full object-cover cursor-pointer"
                />
              </div>
            )}
          </>
        )}
        {pathname === "/login" ? (
          <Link
            href={"/register"}
            className="text-[13px] font-semibold text-blue-600 self-end"
          >
            No account? Register here
          </Link>
        ) : (
          <Link
            className="text-[13px] font-semibold text-blue-600 self-end"
            href={"/login"}
          >
            Already have an account? Login here
          </Link>
        )}
        <button className="p-4 rounded-lg bg-blue-600"> {process}</button>
      </form>
    </div>
  );
};
