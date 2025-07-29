import type { Metadata } from "next";
import "./globals.css";

import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Adams Performance Coaching | Transform Your Body With Expert Coaching",
  description: "Transform Your Body With Expert Coaching. Talk to our coach trained on knowledge from the top experts in athletic performance, health, and medical science. Get personalized fitness programs, nutrition guidance, and hormone optimization protocols.",
  keywords: "fitness coaching, bodybuilding, performance optimization, hormone optimization, TRT, nutrition, workout programs, personal trainer",
  authors: [{ name: "Adams Performance Coaching" }],
  openGraph: {
    title: "Transform Your Body With Expert Coaching",
    description: "Talk to our coach trained on knowledge from the top experts in athletic performance, health, and medical science. Get personalized fitness programs and advanced protocols.",
    url: "https://coach-app-roan.vercel.app",
    siteName: "Adams Performance Coaching",
    images: [
      {
        url: "/og-hero-image.png",
        width: 1200,
        height: 630,
        alt: "Adams Performance Coaching - Transform Your Body",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Transform Your Body With Expert Coaching",
    description: "Talk to our coach trained on knowledge from the top experts in athletic performance, health, and medical science.",
    images: ["/og-hero-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en">
        <body className="font-sans antialiased">
          <Navbar />

          {/* MUSCULAR BACKGROUND */}
          <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/80 to-background/90"></div>
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" 
              style={{
                backgroundImage: "url('/muscular-background.png')"
              }}
            ></div>
            <div className="absolute inset-0 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>
          </div>

          <main className="pt-24 flex-grow">{children}</main>
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
