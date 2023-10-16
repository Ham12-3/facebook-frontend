"use client";
import React, { useState } from "react";
import { Logo } from "./Logo";
import { InputSearch } from "./InputSearch";
import { ProfilePicture } from "./ProfilePicture";
import { useAppSelector } from "@/redux/hooks";
import { UserInformation } from "./UserInformation";
export const NavBar = () => {
  const { user } = useAppSelector((state) => state.auth);
   const [showOptions, setShowOptions]= useState(false)


const handleToggle =( ) => {
  setShowOptions(!showOptions)
}

  return (
    <nav className="flex justify-between items-center h-[70px] bg-blue-600 dark:bg-black py-1 px-[5%] sticky top-0 z-50 transition-colors duration-300 ease-in ">
      <Logo />
      <InputSearch />
      <ProfilePicture image={user!.image} show={handleToggle} />
      <UserInformation image={user!.image} id={user!.id} 
      firstName ={user!.first_name}
      lastName= {user!.last_name}
      showOptions={showOptions}
      />
    </nav>
  );
};
