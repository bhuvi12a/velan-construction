import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import logo from '../../public/logo.png'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://velanconstructions.com'),
  title: {
    default: "Best Civil Contractors & Builders in Hosur, Krishnagiri | Velan Constructions",
    template: "%s | Velan Constructions"
  },
  description: "Award-winning builders & civil contractors in Hosur, Krishnagiri. Premium residential home building, commercial construction, structural renovations, and turnkey contracting. Build your dream with Velan Constructions.",
  keywords: ["civil contractors hosur", "home builders hosur", "construction company hosur", "commercial builders", "residential contractors", "building renovation", "architectural planning", "luxury villas construction", "best builders in hosur", "civil engineering company hosur"],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Best Civil Contractors & Builders in Hosur, Krishnagiri | Velan Constructions",
    description: "Build your dream space with Hosur's premium civil construction services. Residential villas, commercial structures, modern renovations, and turnkey contracting by expert engineers.",
    siteName: "Velan Constructions",
    images: [
      {
        url: logo.src,
        width: 1200,
        height: 630,
        alt: "Velan Constructions - Premium Civil Construction Services",
      },
    ],
    locale: "en_IN",
    type: "website",
    url: 'https://velanconstructions.com',
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Civil Contractors & Builders in Hosur, Krishnagiri | Velan Constructions",
    description: "Build your dream space with Hosur's premium civil construction services. Expert builders for homes & offices.",
    images: ["/hero.jpg"],
    creator: "@velanconstructions",
    site: "@velanconstructions",
  },
  verification: {
    google: "YOUR-GOOGLE-VERIFICATION-ID", // Add your Google Search Console verification ID
  },
  icons: {
    icon: logo.src,
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Velan Constructions",
              "@id": "https://velanconstructions.com",
              "url": "https://velanconstructions.com",
              "logo": "https://velanconstructions.com/logo.png",
              "image": "https://velanconstructions.com/hero.jpg",
              "description": "Premium civil construction and contracting services in Hosur, Krishnagiri. Specializing in residential homes, commercial building, structural planning, and civil works.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "YOUR_STREET_ADDRESS",
                "addressLocality": "Hosur",
                "addressRegion": "Krishnagiri",
                "postalCode": "635109",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "YOUR_LATITUDE",
                "longitude": "YOUR_LONGITUDE"
              },
              "telephone": "+91-9047309009",
              "priceRange": "₹₹₹",
              "openingHours": "Mo-Sa 09:00-18:00",
              "sameAs": [
                "https://facebook.com/velanconstructions",
                "https://instagram.com/velanconstructions",
                "https://linkedin.com/company/velanconstructions"
              ]
            })
          }}
        />
        {/* Explicit favicon links to improve browser compatibility and avoid caching issues */}
        {/* small tab icon */}
        <link rel="icon" href="/logo.png" sizes="32x32" />
        {/* android / large icons */}
        <link rel="icon" href="/bright.png" sizes="192x192" />
        {/* fallback / any-size */}
        <link rel="icon" href="/logo.png" sizes="any" />
        <link rel="shortcut icon" href="/logo.png" />
        {/* apple touch (home screen) */}
        <link rel="apple-touch-icon" href="/logo.png" sizes="180x180" />
        <meta name="theme-color" content="#ffffff" />
        {/* Additional SEO meta tags */}
        <meta name="author" content="Velan Constructions" />
        <meta name="geo.region" content="IN-TN" />
        <meta name="geo.placename" content="Hosur, Krishnagiri" />
        <meta name="geo.position" content="YOUR_LATITUDE;YOUR_LONGITUDE" />
        <meta name="ICBM" content="YOUR_LATITUDE, YOUR_LONGITUDE" />
        <meta name="revisit-after" content="7 days" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
