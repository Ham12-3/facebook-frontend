"use client";
import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Form } from "@/interface/interface";
import { BsFillImageFill } from "react-icons/bs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { login, register } from "@/services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { loginRedux } from "@/redux/reducers/auth.slice";

export const AuthForm = ({ process }: { process: string }) => {
  const [form, setForm] = useState<Form>({});
  const [image, setImage] = useState<File>();
  const [prevImage, setPrevImage] = useState();
  const imgRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (pathname === "/login") {
      try {
        const {message, user} = await login(form);
        toast.success(message, { duration: 1000 });
        console.log(user)
        dispatch(loginRedux(user));
        setTimeout(() => {
          toast.dismiss();
          router.push("/");
        }, 1500);
      } catch (error: any) {
        toast.error(error.response.data.message, { duration: 2500 });
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("email", form.email);
        formData.append("first_name", form.first_name || "");
        formData.append("last_name", form.last_name || "");
        formData.append("bio", form.bio || "");
        formData.append("image", image!);

        const { data, status } = await register(formData);
        if (status === 201) {
          const user = { username: data.username, password: form.password };
          const { user: loggedUser } = await login(user);
          dispatch(loginRedux(loggedUser));
          toast.success("Successfully registered", { duration: 1000 });

          setTimeout(() => {
            toast.dismiss();
            router.push("/");
          }, 1500);
        }
      } catch (error: any) {
        toast.error(error.response.data.message, { duration: 2500 });
      }
    }
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
        onSubmit={handleSubmit}
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
                  sizes='(max-width:80px) 100vw'
                  loading="lazy"
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
      <Toaster />
    </div>
  );
};
