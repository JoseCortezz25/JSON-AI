import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import "./globals.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from 'next-intl/server';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JSON AI",
  description: "Create AI-generated JSON mocks.",
  openGraph: {
    title: "JSON AI",
    description: "Create AI-generated JSON mocks.",
    type: "website"
  },
  metadataBase: new URL("https://json-ai-app.vercel.app/")
};

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode,
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          enableSystem
          defaultTheme="system"
        >
          <NextIntlClientProvider messages={messages}>
            <Header />
            {children}
            <Footer />
          </NextIntlClientProvider>
        </ThemeProvider>
        <Toaster richColors />
      </body>
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID as string} />
    </html>
  );
}
