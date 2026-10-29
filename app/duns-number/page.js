import DunsLandingPage from '@/components/duns/DunsLandingPage';

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || 'https://www.bissgro.com';

const TITLE = 'DUNS Number Registration in India | Fee & Documents | Bissgro';
const DESCRIPTION =
  'Apply for a D-U-N-S number for Apple Developer, Google Play, vendor and export registration. Fee from ₹5,000, 2–7 working days, documents checklist. Bissgro, Noida.';

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'DUNS number, DUNS number registration India, D-U-N-S number, DUNS number fee, DUNS number documents, DUNS for Apple Developer, DUNS for Google Play, DUNS number Noida, Bissgro',
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
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
