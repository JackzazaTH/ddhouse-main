
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AppClientLayout from "./AppClientLayout";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

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
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}
