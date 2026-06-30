import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "@/styles/globals.css";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";
import Script from "next/script";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://galvinj.com")
  ),
  alternates: {
    canonical: "/",
  },
  title: "Galvin J | Freelance Frontend Developer",
  description: "Portfolio of Galvin J, a freelance frontend developer based in Chennai, Tamil Nadu. Building modern, responsive, and high-performance websites for businesses using HTML, Tailwind CSS, and JavaScript.",
  keywords: [
    "Frontend Developer",
    "Freelance Developer",
    "Web Designer",
    "Galvin J",
    "Chennai",
    "Tamil Nadu",
    "Portfolio",
    "Tailwind CSS",
    "JavaScript",
    "HTML5",
    "Responsive Web Design"
  ],
  openGraph: {
    type: "website",
    title: "Galvin J | Freelance Frontend Developer",
    description: "I help businesses create responsive, user-friendly, and visually engaging websites using modern frontend technologies.",
    images: [{ url: "/assets/profile.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Galvin J | Freelance Frontend Developer",
    description: "I help businesses create responsive, user-friendly, and visually engaging websites using modern frontend technologies.",
    images: ["/assets/profile.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        {/* JSON-LD Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Galvin J",
              "jobTitle": "Freelance Frontend Developer",
              "url": "https://galvinj.com",
              "sameAs": [
                "https://github.com/Galvinmariaalversa",
                "https://www.linkedin.com/in/galvin-frontend"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressRegion": "Tamil Nadu",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body className="bg-darkBg text-gray-100 overflow-x-hidden antialiased font-sans">
        <CustomCursor />
        <ScrollProgress />
        {children}
        <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
      </body>
    </html>
  );
}
