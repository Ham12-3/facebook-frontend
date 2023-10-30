"use client";

import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { useModal } from "@/hooks/useModal";
import { useRedux } from "@/hooks/useRedux";
import { User } from "@/interface/interface";
import { getProfilePosts } from "@/redux/reducers/profilePosts.slice";
import { getUser } from "@/services/user";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function ProfilePage({ params }: { params: { id: string } }) {
  const { dispatch, profilePosts } = useRedux();

  const [user, setUser] = useState<User | null>(null);

  const [showProfileIndex, handleOpenProfile, handleCloseProfile] = useModal();

  useEffect(() => {
    async function fetchUser() {
      try {
        const userResponse = await getUser(params.id);
        setUser(userResponse);

        const posts = userResponse.posts.sort((a: any, b: any) => b.id - a.id);
        dispatch(getProfilePosts(posts));
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, [params.id]);

  return (
    <>
      <AnimatedWrapper>
        <>
          <div className="bg-gray-200 relative flex h-40 justify-end text-black/70">
            <div className="mr-20 flex flex-col mt-3">
              <h1 className="text-[70px] leading-[85px] font-bold text-black">
                {" "}
                {user?.username}{" "}
              </h1>
              <p className="text-sm self-end">{user?.email}</p>

              <span className="text-xs self-end">
                Posts writings:{" "}
                <strong className="text-black">{user?.posts_count}</strong>
              </span>
            </div>
            <div>
              <div
                onClick={() => handleOpenProfile(user?.id)}
                className="w-[200px] h-[200px] absolute left-28 top-0 cursor-pointer aspect-square"
              >
                {/* <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
                  alt="#"
                  fill
                  sizes="max-width: (200px) 100vh, 150px"
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/blur.svg"
                  className="object-cover object-top rounded-full
                  "
                /> */}
              </div>
            </div>

            <div
              onClick={handleCloseProfile}
              className="w-full h-full fixed top-0 left-0 z-50 px-20 bg-black/70 flex items-center justify-center"
            >
              <div className="relative w-[700px] h-[calc(100%-100px)] cursor-pointer aspect-video mx-auto bg-black">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${user?.image}`}
                  alt="#"
                  sizes="(max-width: 1000px) 100vw, 9000px, 600px"
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="/blur.svg"
                  className="object-contain cursor-pointer"
                />
              </div>
            </div>
          </div>
        </>
      </AnimatedWrapper>
    </>
  );
}

export default ProfilePage;
