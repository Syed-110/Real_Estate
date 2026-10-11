import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { PropertyProvider } from "@/context/PropertyContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#05070A" },
    { media: "(prefers-color-scheme: dark)", color: "#05070A" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.aayatrealestate.in"),
  title: {
    default: "Aayat Real Estate | Ultra-Luxury Indian Mansions, Penthouses & Sea-Facing Villas",
    template: "%s | Aayat Real Estate",
  },
  description:
    "Explore peerless sea-facing penthouses in Mumbai, Lutyens' Delhi estates, and heritage Portuguese villas in Goa with Aayat Real Estate. RERA registered bespoke private advisory.",
  keywords: [
    "Aayat Real Estate",
    "Luxury Real Estate India",
    "Worli Sea Face penthouse",
    "Altamount Road luxury apartments",
    "Goa Portuguese villas for sale",
    "Lutyens Delhi bungalows",
    "MahaRERA luxury property",
    "Ultra HNW Real Estate Mumbai",
  ],
  authors: [{ name: "Aayat Real Estate Group Pvt. Ltd." }],
  creator: "Aayat Real Estate",
  publisher: "Aayat Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Aayat Real Estate | Ultra-Luxury Indian Mansions & Sea-Facing Villas",
    description:
      "Exclusive portfolio of high-net-worth architectural estates, sea-facing villas, and trophy penthouses across Mumbai, Delhi, Goa, and Bengaluru.",
    url: "https://www.aayatrealestate.in",
    siteName: "Aayat Real Estate",
    images: [
      {
        url: "/images/hero-villa.jpg",
        width: 1200,
        height: 675,
        alt: "Aayat Real Estate Exclusive Indian Estate Collection",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aayat Real Estate | Ultra-Luxury Indian Living",
    description:
      "Curating extraordinary sea-facing penthouses, heritage villas, and palatial estates across India.",
    images: ["/images/hero-villa.jpg"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Aayat Real Estate",
  },
  other: {
    "mobile-web-app-capable": "yes",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Aayat Real Estate",
    image: "https://www.aayatrealestate.in/images/logo.jpg",
    description:
      "Bespoke Indian luxury real estate agency providing acquisition, disposition, and wealth advisory services for premier sea-facing penthouses, heritage bungalows, and palatial estates.",
    url: "https://www.aayatrealestate.in",
    telephone: "+91-98200-12345",
    priceRange: "₹₹₹₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "RTGS, NEFT, Private Banking, Escrow",
    areaServed: ["Mumbai", "Delhi-NCR", "Goa", "Bengaluru", "Pune"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "One BKC, G Block, Bandra Kurla Complex",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400051",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "19.0657",
      longitude: "72.8687",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "21:00",
      },
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="icon" href="/images/logo.jpg" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-obsidian-950 text-slate-100 antialiased selection:bg-gold-500/30 selection:text-gold-200">
        <LanguageProvider>
          <PropertyProvider>
            <AdminAuthProvider>{children}</AdminAuthProvider>
          </PropertyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
