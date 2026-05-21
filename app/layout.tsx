import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SocialConnect - Connect with Friends",
  description: "A modern social media platform to connect with friends, share moments, and stay updated.",
  keywords: "social media, connect, friends, posts, photos, messaging",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F0F2F5] text-[#050505] font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
