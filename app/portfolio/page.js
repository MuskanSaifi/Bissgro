import PortfolioContent from '@/components/PortfolioContent';

export const metadata = {
  title: 'Portfolio | Our Projects - Bissgro',
  description:
    'Explore our app and web development projects. See what we build for our clients.',

  alternates: {
    canonical: 'https://www.bissgro.com/portfolio',
  },

  openGraph: {
    title: 'Portfolio | Our Projects - Bissgro',
    description:
      'Explore our app and web development projects. See what we build for our clients.',
    url: 'https://www.bissgro.com/portfolio',
    siteName: 'Bissgro',
    type: 'website',
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
