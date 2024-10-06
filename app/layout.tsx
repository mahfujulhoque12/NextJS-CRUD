import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-3xl mx-auto text-slate-800">
          <header className="bg-blue-500 py-6 px-4 justify-between flex rounded-lg border-b">
             <Link className="text-2xl font-bold text-white" href={"/"}>Software Inovations</Link>
             <Link className="bg-white px-2 py-2 rounded-lg font-bold shadow-md" href={"/create"}>Add New</Link>

          </header>
          <main className="p-4 text-lg">
           {children}
          </main>
        </div>
     
      </body>
    </html>
  );
}