"use client";

import SmoodleProvider from "@/provider/smoodleProvider";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SmoodleProvider>{children}</SmoodleProvider>
        <ToastContainer position="top-right" autoClose={5000} />
      </body>
    </html>
  );
}
