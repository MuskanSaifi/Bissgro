const TEAM = [
  { name: 'Rajesh Kumar', role: 'CEO & Founder', icon: 'fas fa-user-tie', img: '' },
  { name: 'Sneha Patel', role: 'Lead Developer', icon: 'fas fa-code', img: '' },
  { name: 'Amit Singh', role: 'SEO Specialist', icon: 'fas fa-search', img: '' },
  { name: 'Neha Gupta', role: 'UI/UX Designer', icon: 'fas fa-palette', img: '' },
];

export default function HomeTeam() {
  return (
    <section className="home-section home-section-alt" aria-labelledby="home-team-title">
      <div className="home-container home-center">
        <span className="home-tag">Our Team</span>
        <h2 id="home-team-title" className="home-heading">
          Meet The <span className="highlight">Experts</span>
        </h2>
        <p className="home-subtitle">
          A passionate team dedicated to delivering exceptional digital experiences.
        </p>
      </div>
      <div className="home-container">
        <div className="home-team-grid">
          {TEAM.map((member) => (
            <div key={member.name} className="home-team-card">
              <div className="home-team-avatar">
                {member.img ? (
                  <img src={member.img} alt={member.name} />
                ) : (
                  <i className={member.icon} />
                )}
              </div>
              <h4>{member.name}</h4>
              <div className="role">{member.role}</div>
              <div className="home-team-socials">
                <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
                <a href="#" aria-label="Twitter"><i className="fab fa-twitter" /></a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
