import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'

import Sidebar from "@/components/sidebar";
import Player from "@/components/player";

import SupabaseProvider from "@/providers/supabaseProvider";
import UserProvider from "@/providers/userProvider";
import ModalProvider from "@/providers/modalProvider";
import ToastProvider from "@/providers/toastProvider";

import getSongsByUserId from "@/actions/getSongsByUserId";
import getActiveProductsWithPrices from "@/actions/getActiveProductsWithPrices";


const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sporify',
  description: 'Listen to music now!',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const userSongs = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToastProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider products={products}/>
              <Sidebar songs={userSongs}>
                {children}
              </Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
