import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/styles/index.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.placeholder-domain.com"),
  title: {
    default: "Placeholder Brand",
    template: "%s | Placeholder Brand",
  },
  description: "Placeholder default description for the migrated site.",
  keywords: ["placeholder-keyword-1", "placeholder-keyword-2"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Placeholder Brand",
    description: "Placeholder default description for the migrated site.",
    siteName: "Placeholder Brand",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Placeholder Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Placeholder Brand",
    description: "Placeholder default description for the migrated site.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable}`}
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
