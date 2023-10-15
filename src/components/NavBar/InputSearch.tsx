import React, { FormEvent } from 'react'
import {BsSearch} from 'react-icons/bs'
export const InputSearch = () => {
const handleSubmit =(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

}

  return (
    <div className='bg-white dark:bg-dark-100 rounded-[20px] w-[750px] fleitems-center py-0 px-[15px] transition-colors duration-300 ease-in'>
        <label htmlFor="search">
            <BsSearch 
            className='text-blue-600 dark:text-white text-[20px]'
            />
        </label>
        <form className='w-full' action="" onSubmit={handleSubmit}>
            <input 
            className='w-full bg-transparent p-[10px] text-slate-700 dark:text-white/90 outline-none border-none' type="search" name="" id="search" />
        </form>
    </div>
  )
}
