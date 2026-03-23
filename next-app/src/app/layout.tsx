import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "@/styles/index.css";

const siteUrl = getSiteUrl();
/** Bump when replacing public/favicon.ico so browsers refetch (favicon is cached aggressively). */
const FAVICON_CACHE_BUST = "1";

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
  metadataBase: siteUrl,
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
    icon: `/favicon.ico?v=${FAVICON_CACHE_BUST}`,
    shortcut: `/favicon.ico?v=${FAVICON_CACHE_BUST}`,
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
