import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AppClientLayout from "./AppClientLayout";
// FIX: Import ReactNode to resolve type errors.
import type { ReactNode } from "react";


const inter = Inter({
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-thai',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "DDHOUSE - Modern Home Designs",
  description: "A modern web application to showcase beautiful home designs, complete with an integrated admin panel for easy management of property listings and images.",
  openGraph: {
    title: "DDHOUSE - Modern Home Designs",
    description: "Explore our exclusive collection of modern designs.",
    images: ["https://picsum.photos/seed/banner1/1200/630"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  // FIX: Use the imported ReactNode type.
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${notoSansThai.variable} font-sans bg-gray-50 text-gray-800`}>
        <AppProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}