const LOGOS = [
  { icon: 'fas fa-building', name: 'TechCorp' },
  { icon: 'fas fa-store', name: 'ShopEase' },
  { icon: 'fas fa-utensils', name: 'FoodHub' },
  { icon: 'fas fa-heartbeat', name: 'HealthPlus' },
  { icon: 'fas fa-graduation-cap', name: 'EduLearn' },
  { icon: 'fas fa-car', name: 'AutoDrive' },
  { icon: 'fas fa-home', name: 'HomeStyle' },
  { icon: 'fas fa-plane', name: 'TravelGo' },
];

export default function HomeClientLogos() {
  const doubled = [...LOGOS, ...LOGOS];

  return (
    <section className="home-logos-slider" aria-label="Trusted by clients">
      <div className="home-container" style={{ overflow: 'hidden' }}>
        <div className="home-logos-track">
          {doubled.map((logo, i) => (
            <div key={`${logo.name}-${i}`} className="home-logo-item">
              <i className={logo.icon} />
              {logo.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
