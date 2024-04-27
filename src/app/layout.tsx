import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/common/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON AI",
  description: "Create AI-generated JSON mocks."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
