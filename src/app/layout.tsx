import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import HideOnDetails from "@/components/HideOnDetails";
import Header from "@/components/header";
import Navbar from "@/components/Navbar";
import Marquie from "@/components/Marquie";
import Footer from "@/components/Footer";
import ShowOnlyHomeMarquie from "@/components/ShowOnlyHomeMarquie.tsx";

const notoSerifBengali = Noto_Serif_Bengali({
  variable: "--font-geist-sans",
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "Bangla News 24",
  description: "বাংলা সংবাদ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="bn"
      data-theme="light"
      className={`${notoSerifBengali.className} h-full antialiased bg-black`}
    >
      <body className="min-h-full flex flex-col bg-white mx-4 sm:mx-8 lg:mx-16 xl:mx-24">


        <Header />

        <HideOnDetails>
          <Navbar />
        </HideOnDetails>

        <ShowOnlyHomeMarquie>
          <Marquie />
        </ShowOnlyHomeMarquie>

        <main className="w-full flex-1 pt-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}