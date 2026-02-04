import PlansContent from '@/components/PlansContent';

export const metadata = {
  title: 'Pricing & Plans | Bissgro - Web, App & SEO Services',
  description: "Choose from Bissgro's affordable pricing plans for Web Development, App Development, and SEO services. Secure payment options available.",
  openGraph: { title: 'Pricing & Plans | Bissgro', url: 'https://www.bissgro.com/plans' },
};

export default function Plans() {
  return (
    <main>
      <PlansContent />
    </main>
  );
}
