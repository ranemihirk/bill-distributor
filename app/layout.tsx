import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./../styles/globals.css";
import BillContextProvider from "@/contexts/BillContext";
import AuthContextProvider from "@/contexts/AuthContext";
import ToastContextProvider from "@/contexts/ToastContext";
import Header from "@/components/Home/Header";
import { ToastContainer } from "react-toastify";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Bill Distributor",
  description: "Bill Distributor",
  icons: {
    icon: "./assets/images/favicon.ico",
  },
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
        <link rel="icon" href="./assets/images/favicon.ico" sizes="any" />
      </head>
      <body className=" antialiased p-4 lg:p-8 h-[100vh]">
        <AuthContextProvider>
          <BillContextProvider>
            <ToastContextProvider>
              <Header />
              <main>{children}</main>
              <ToastContainer />
            </ToastContextProvider>
          </BillContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
