"use client";

import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { useRedux } from "@/hooks/useRedux";
import { User } from "@/interface/interface";
import { getProfilePosts } from "@/redux/reducers/profilePosts.slice";
import { getUser } from "@/services/user";
import React, { useEffect, useState } from "react";

function ProfilePage({ params }: { params: { id: string } }) {
  const { dispatch, profilePosts } = useRedux();

  const [user, setUser] = useState<User | null>(null);

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
            <div>
              <h1> {user?.username} </h1>
              <p></p>

              <span></span>
            </div>
          </div>
        </>
      </AnimatedWrapper>
    </>
  );
}

export default ProfilePage;
