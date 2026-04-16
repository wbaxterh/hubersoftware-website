import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://hubersoftware.com"),
  title: "HuberSoftware - Tech & Software Solutions",
  description: "Professional software development services including full-stack web development, mobile apps, and blockchain solutions. Founded by Wes Huber with 10+ years experience.",
  keywords: "software development, web development, mobile apps, blockchain, full-stack developer, tech solutions",
  authors: [{ name: "Wes Huber" }],
  creator: "HuberSoftware",
  publisher: "HuberSoftware",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "HuberSoftware - Tech & Software Solutions",
    description: "Professional software development services including full-stack web development, mobile apps, and blockchain solutions.",
    url: "https://hubersoftware.com",
    siteName: "HuberSoftware",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 472,
        height: 390,
        alt: "HuberSoftware logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HuberSoftware - Tech & Software Solutions",
    description: "Professional software development services including full-stack web development, mobile apps, and blockchain solutions.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
