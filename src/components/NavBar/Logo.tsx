import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const Logo = () => {
  return (
   <Link href={'/'}>
    <div className='flex items-center py-1 cursor-pointer'>
        <div className='max-w-[50px] h-[50px] w-[40px] relative aspect-auto'>
            <Image
            src={'/ivelogowhite.png'}
            alt='iveLogo'
            fill
            sizes={'40px'}
            loading='lazy'
            />
        </div>
        <h2 className='font-bold text-white/90 text-[28px]'>Ivebook</h2>
    </div>
    
     </Link>
  )
}
