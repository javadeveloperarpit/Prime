import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from 'next/script';

export const metadata = {
  title: 'Prime Bharat News | Sabse Tez, Sabse Sahi Khabar',
  description: 'Bharat ka trending news portal. Breaking news, Politics, aur Entertainment ki har khabar sabse pehle.',
  keywords: 'Hindi News, Breaking News Bharat, Prime Bharat News, Latest News',
  openGraph: {
    title: 'Prime Bharat News',
    description: 'Bharat ka trending news portal.',
    url: 'https://primebharatnews.com', 
    siteName: 'Prime Bharat News',
    images: [
      {
        url: '/https://yielding-silver-7lbswgmn7e.edgeone.app/p.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'hi_IN',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: "#cc0000", // Aapka brand red color
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi">
      <head>
      
        <link rel="icon" href="https://yielding-silver-7lbswgmn7e.edgeone.app/p.jpg" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4065768781392485"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
        
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}