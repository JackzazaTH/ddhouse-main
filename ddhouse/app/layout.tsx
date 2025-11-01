
import type { Metadata } from "next";
import { Kanit } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import AppClientLayout from "./AppClientLayout";


const kanit = Kanit({ 
  subsets: ["latin", "thai"],
  weight: ['300', '400', '500', '600', '700'],
  variable: "--font-kanit" 
});

export const metadata: Metadata = {
  title: "DDHOUSE - แบบบ้านสวย ทันสมัย",
  description: "เว็บแอปพลิเคชันสำหรับนำเสนอแบบบ้านสวยงาม พร้อมระบบจัดการหลังบ้านที่ใช้งานง่าย",
  openGraph: {
    title: "DDHOUSE - แบบบ้านสวย ทันสมัย",
    description: "เลือกชมคอลเลกชันแบบบ้านสวยงามทันสมัยของเรา",
    images: ["https://picsum.photos/seed/banner1/1200/630"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={kanit.className}>
        <AppProvider>
          <AppClientLayout>{children}</AppClientLayout>
        </AppProvider>
      </body>
    </html>
  );
}