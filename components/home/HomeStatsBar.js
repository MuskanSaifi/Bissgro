const STATS = [
  { icon: 'fas fa-smile', value: '100+', label: 'Happy Clients' },
  { icon: 'fas fa-briefcase', value: '250+', label: 'Projects Completed' },
  { icon: 'fas fa-calendar-alt', value: '5+', label: 'Years Experience' },
  { icon: 'fas fa-star', value: '4.9★', label: 'Google Rating' },
  { icon: 'fas fa-heart', value: '98%', label: 'Client Satisfaction' },
  { icon: 'fas fa-headset', value: '24/7', label: 'Support' },
];

export default function HomeStatsBar() {
  return (
    <section className="home-stats-bar" aria-label="Key statistics">
      <div className="home-container">
        <div className="home-stats-grid">
          {STATS.map((s) => (
            <div key={s.label} className="home-stat-item">
              <i className={s.icon} />
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
