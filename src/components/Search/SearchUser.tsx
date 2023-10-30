import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  id: number;
  image: string | undefined;
}

export const SearchUser = ({ id, image }: Props) => {
  return (
    <div className="flex items-center gap-x-10 my-8 ml-20">
      <Link href={`/profile/${id}`}>
        <div className="relative w-[130px] max-w-[140px] h-[130px] aspect-square">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}${image}`}
            alt="#"
            fill
            priority
            sizes="(max-width: 130px) 100vw , 100px, 70px"
            className="rounded-full object-cover"
          />
        </div>
      </Link>
    </div>
  );
};
