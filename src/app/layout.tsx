import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avatar & AI Bot Creator",
  description: "Create game-style avatars and conversational AI bots - Fast Track Academy",
  keywords: "avatar creator, AI bot, chatbot, personality, game avatar, Fast Track Academy",
  authors: [{ name: "Fast Track Academy" }],
  creator: "Fast Track Academy",
  publisher: "Fast Track Academy",
  openGraph: {
    title: "Avatar & AI Bot Creator",
    description: "Create game-style avatars and conversational AI bots",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
