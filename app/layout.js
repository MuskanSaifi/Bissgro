import './globals.css';
import Script from 'next/script';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Chatbot from '@/components/Chatbot';
import WhatsAppFloat from '@/components/WhatsAppFloat';

export const metadata = {
  title: 'Professional Web Development Services | Bissgro',
  description: 'We provide professional web development services with responsive design, SEO-friendly code, and modern technology to grow your online presence.',
  keywords: 'web development services, website design, responsive web development, SEO friendly websites, custom web solutions',
  openGraph: {
    title: 'Professional Web Development Services',
    description: 'Get modern, responsive, and SEO-friendly websites tailored to your business needs.',
    url: 'https://www.bissgro.com/',
    type: 'website',
  },
  icons: {
    icon: ['/assets/favicon.ico', { url: '/assets/favicon-32x32.png', sizes: '32x32' }, { url: '/assets/favicon-16x16.png', sizes: '16x16' }],
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
        <Script
          id="ga-gtag"
          strategy="afterInteractive"
        >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-L9Y4E8EWEJ', {
            page_path: window.location.pathname,
          });
        `}</Script>

        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <Chatbot />
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/js/bootstrap.bundle.min.js" strategy="afterInteractive" crossOrigin="anonymous" />
        <Script src="https://kit.fontawesome.com/9918320fb5.js" crossOrigin="anonymous" strategy="afterInteractive" />
      </body>
    </html>
  );
}
