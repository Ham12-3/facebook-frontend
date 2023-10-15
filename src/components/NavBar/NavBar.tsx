'use client'
import React from 'react'
import { Logo } from './Logo'
import { InputSearch } from './InputSearch'
import { ProfilePicture } from './ProfilePicture'
export const NavBar = () => {
  return (
<nav className='flex justify-between items-center h-[70px] bg-blue-600 dark:bg-black py-1 px-[5%] sticky top-0 z-50 transition-colors duration-300 ease-in '>
    <Logo/>
    <InputSearch/>
    <ProfilePicture/>
</nav>
  )
}
