

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AppClientLayout from "./AppClientLayout";
// FIX: Import React to resolve type errors with children props.
import React from "react";


const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-poppins" 
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
}: {
  // FIX: Use React.ReactNode type for consistency.
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gray-50 text-gray-800`}>
        <AppProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}