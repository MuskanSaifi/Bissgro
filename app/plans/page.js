import PlansContent from '@/components/PlansContent';

export const metadata = {
  title: 'Pricing & Plans | Bissgro - Web, App & SEO Services',
  description:
    "Choose from Bissgro's affordable pricing plans for Web Development, App Development, and SEO services. Secure payment options available.",

  alternates: {
    canonical: 'https://bissgro.com/plans',
  },

  openGraph: {
    title: 'Pricing & Plans | Bissgro',
    url: 'https://bissgro.com/plans',
    siteName: 'Bissgro',
    type: 'website',
  },
};
export default function Plans() {
  return (
    <main>
      <PlansContent />
    </main>
  );
}
