import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ToastProvider from "@/components/Providers/toasterProvider";
import { ConfettiProvider } from "@/components/Providers/confettiProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SkillSync",
  description: "SkillSync is a LMS platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider/>
          <ToastProvider/>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
