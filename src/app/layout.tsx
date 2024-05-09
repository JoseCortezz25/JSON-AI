import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import "./globals.scss";

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
        <Toaster richColors />
      </body>
    </html>
  );
}
