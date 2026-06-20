import HomeHero from './HomeHero';
import HomeServices from './HomeServices';
import HomeWhyChoose from './HomeWhyChoose';
import HomeStatsBar from './HomeStatsBar';
import HomePortfolio from './HomePortfolio';
import HomeTestimonials from './HomeTestimonials';
import HomeProcess from './HomeProcess';
import HomeClientLogos from './HomeClientLogos';
import HomePricing from './HomePricing';
import HomeTeam from './HomeTeam';
import HomeFaq from './HomeFaq';
import HomeBlogPreview from './HomeBlogPreview';
import HomeCta from './HomeCta';

export default function HomePage() {
  return (
    <div className="home-page">
      <HomeHero />
      <HomeServices />
      <HomeWhyChoose />
      <HomeStatsBar />
      <HomeClientLogos />
      <HomePortfolio />
      <HomeTestimonials />
      <HomeProcess />
      <HomePricing />
      <HomeTeam />
      <HomeFaq />
      <HomeBlogPreview />
      <HomeCta />
    </div>
  );
}
