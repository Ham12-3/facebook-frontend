import '../../public/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReduxProvider } from '@/redux/store/ReduxProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className= {`${inter.className} bg-gray-100 text-black dark:bg-dark-200 dark:text-white transition-colors ease-in duration-300`}>
        <main >
         <ReduxProvider>
          {children}
         </ReduxProvider>
        </main>
      </body>
    </html>
  )
}
