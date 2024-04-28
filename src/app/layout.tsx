import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import { ThemeProvider } from "@/providers/theme-provider";

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
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
