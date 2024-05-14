import "@/styles/globals.css";
import { Inter } from 'next/font/google'
import type { AppProps } from "next/app";
import { Provider as AppContextProvider } from "@/contexts/app";
import { Provider as AuthContextProvider } from "@/contexts/app";

const inter = Inter({ subsets: ['latin'] })
export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </AppContextProvider>
    </AuthContextProvider>
  )
}