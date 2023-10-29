"use client";
import React from "react";
import { useAppSelector } from "@/redux/hooks";
import { AnimatedWrapper } from "@/components/AnimatedWrapper";
import { LeftBar } from "@/components/LeftBar/LeftBar";
import { RightBar } from "@/components/RightBar/RightBar";

import { SearchUser } from "@/components/Search/SearchUser";

function SearchPage() {
  const { users } = useAppSelector((state) => state.user);
  return (
    <>
      <AnimatedWrapper>
        <div className="flex justify-between relative py-[13px] px-[3%]">
          <LeftBar />
          <div className="basis-[47%]">
            {users.map((user, index) => {
              return (
                <div key={index}>
                  <SearchUser />
                </div>
              );
            })}
          </div>
          <RightBar />
        </div>
      </AnimatedWrapper>
    </>
  );
}

export default SearchPage;
