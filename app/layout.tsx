import type { Metadata } from "next";
import localFont from "next/font/local";
import "./../styles/globals.css";
import BillContextProvider from "./contexts/BillContext";
import DataContextProvider from "./contexts/redisContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Bill Distributor",
  description: "Bill Distributor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Bill Distributor</title>
        <link rel="icon" href="./../public/assets/images/favicon.ico" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased p-4 lg:p-8 h-[100vh]`}
      >
        <DataContextProvider>
          <BillContextProvider>{children}</BillContextProvider>
        </DataContextProvider>
      </body>
    </html>
  );
}
