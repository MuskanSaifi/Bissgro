import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  title: 'Bissgro - Web Development & Digital Marketing Company in India',
  description:
    'Bissgro provides website development, SEO, digital marketing, and app development services in India. Get modern and responsive business websites.',

  keywords: [
    'bissgro',
    'bissgro web development',
    'web development company',
    'website development services',
    'seo services india',
    'digital marketing company',
    'responsive web development',
  ],

  metadataBase: new URL('https://www.bissgro.com'),

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title: 'Bissgro - Web Development Company',
    description:
      'Bissgro offers professional website development, SEO, and digital marketing services for businesses.',
    url: 'https://www.bissgro.com',
    siteName: 'Bissgro',
    type: 'website',
  },

  icons: {
    icon: [
      '/assets/favicon.ico',
      { url: '/assets/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: '/assets/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L9Y4E8EWEJ"
          strategy="afterInteractive"
        />

        <Script id="ga-gtag" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-L9Y4E8EWEJ', {
            page_path: window.location.pathname,
          });
        `}
        </Script>

        {/* Organization Structured Data (SEO) */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Bissgro",
            "url": "https://www.bissgro.com",
            "logo": "https://www.bissgro.com/assets/logo.png",
            "sameAs": [
              "https://www.facebook.com/",
              "https://www.instagram.com/",
              "https://www.linkedin.com/"
            ]
          }
        `}
        </Script>

        <Header />

        <main>{children}</main>

        <Footer />

        <WhatsAppFloat />
        <Chatbot />

        {/* Bootstrap */}
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />

        {/* Font Awesome */}
        <Script
          src="https://kit.fontawesome.com/9918320fb5.js"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

      </body>
    </html>
  );
}