import { useAppDispatch } from "@/redux/hooks";
import React, { useState } from "react";
import { logoutRedux } from "@/redux/reducers/auth.slice";
import Image from "next/image";
import Link from "next/link";
import {RiFeedbackFill} from 'react-icons/ri'
interface Props {
    image: string,
    id:number,
    firstName:string,
    lastName:string
}
export const UserInformation = ({image, id, firstName, lastName}: Props) => {
    const dispatch = useAppDispatch()
  const [toggle, setToggle] = useState(false);
  return (
    <div className="absolute w-[90%] max-w-[350px] bg-blue-500 dark:bg-gray-950 overflow-hidden shadow-md rounded-[4px] transition-all duration-500 ease-in right-[5%] top-[100%]">
      <div className="flex absolute items-center top-[20px] right-[20px] cursor-pointer bg-gray-400 w-[45px] px-[3px] rounded-[15px] py-[2px]">
        <span
          className={`w-[18px] h-[18px] bg-blue-500 dark:bg-gray-950 rounded-full inline-block ${
            toggle ? "ml-0 bg-black" : "ml-[20px] bg-white"
          } ease-in duration-300`}
        ></span>
      </div>
      <div>
        <div>
            <div className="relative max-w-[50px] w-[45px] h-[45px] mr-[12px]">
              <Image 
              src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
              alt='#'
              fill
              loading="lazy"
              sizes="(max-width: 45px) 100vw, 40px"
              className="rounded-full object-cover object-center"
              />  
            </div>
            <div>
                <p className="font-bold text-white text-[18px] -mb-[5px]"> {firstName} {lastName}</p>
              <Link className="text-[13px] text-sky-100/80 dark:text-blue-500" href={`/profile/${id}`}>See your profile</Link>
            </div>
        </div>
        <hr className="border-0 h-[1px] my-[15px] mx-0 bg-gray-200/50"  />
        <div className="flex items-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full mr-[16px] flex justify-center items-center">
<RiFeedbackFill className = 'text-blue-600 text-[32px] dark:text-black'/>

            </div>
            <div>
                <p className="text-white font-semibold"> Give Feedback</p>
                <Link className="text-white font-semibold " href={'#'}>Help us improve our services</Link>
            </div>
        </div>
        <hr  className="border-0 h-[1px] my-15px mx-0 bg-gray-200/50" />
        <button onClick={()=> dispatch(logoutRedux())} className="bg-red-500 hover:bg-red-400 py-1 px-2 text-white cursor-pointer rounded-md">Logout</button>

      </div>
    </div>
  );
};
