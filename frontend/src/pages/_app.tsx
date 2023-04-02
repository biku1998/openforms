import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-pjs",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${inter.variable} ${plusJakartaSans.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  );
}
