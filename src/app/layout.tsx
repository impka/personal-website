import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "impkar",
  description: "Ethan's Personal Website :D",
  icons: {
    icon: "/xqcbleh.ico"
  }
};

// runs before paint so pages don't flash the wrong theme; dark unless the bulb was left on
const themeScript = `try{if(localStorage.getItem("light")!=="on")document.documentElement.classList.add("dark")}catch(e){document.documentElement.classList.add("dark")}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#E0E0E0] dark:bg-black text-black dark:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
