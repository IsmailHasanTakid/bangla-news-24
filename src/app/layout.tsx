import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import HideOnDetails from "@/components/HideOnDetails";
import Header from "@/components/header";
import Navbar from "@/components/Navbar";
import Marquie from "@/components/Marquie";
import ToastProvider from "@/components/ToastProvider";
import Footer from "@/components/Footer";
import PageBackground from "@/components/PageBackground";
import PageShell from "@/components/PageShell";

import ShowOnlyHomeMarquie from "@/components/ShowOnlyHomeMarquie";
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
      className={`${notoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full">
        <PageShell>
          <Header />

          <HideOnDetails>
            <Navbar />
          </HideOnDetails>

          <ShowOnlyHomeMarquie>
            <Marquie />
          </ShowOnlyHomeMarquie>

          <PageBackground>
            <main className="w-full min-h-screen pt-0">
              {children}
            </main>
          </PageBackground>

          <Footer />

        </PageShell>
        <ToastProvider />
      </body>
    </html>
  );
}