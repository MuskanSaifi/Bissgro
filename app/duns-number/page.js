import DunsLandingPage from '@/components/duns/DunsLandingPage';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bissgro.com';

export const metadata = {
  title: 'Get Your DUNS Number in 48 Hours | Bissgro',
  description:
    'Get your DUNS Number fast for Amazon, Walmart, Google Play & global marketplaces. Simple process, expert support. Apply with Bissgro today.',
  keywords:
    'DUNS number, DUNS registration, get DUNS number, Amazon DUNS, Walmart DUNS, DUNS number India, Bissgro',
  openGraph: {
    title: 'Get Your DUNS Number in 48 Hours | Bissgro',
    description:
      'Fast, simple and reliable DUNS Number registration for global marketplaces and business growth.',
    url: `${BASE_URL}/duns-number`,
    siteName: 'Bissgro',
    type: 'website',
  },
  alternates: {
    canonical: `${BASE_URL}/duns-number`,
  },
};

export default function DunsNumberPage() {
  return <DunsLandingPage />;
}
