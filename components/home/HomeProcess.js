const STEPS = [
  { num: '01', icon: 'fas fa-comments', title: 'Discuss', desc: 'We understand your goals, audience, and business needs.' },
  { num: '02', icon: 'fas fa-file-alt', title: 'Plan', desc: 'We create a tailored strategy and project roadmap.' },
  { num: '03', icon: 'fas fa-pencil-ruler', title: 'Design & Develop', desc: 'Our team builds your solution with precision and care.' },
  { num: '04', icon: 'fas fa-rocket', title: 'Launch', desc: 'We deploy your project and ensure everything runs smoothly.' },
  { num: '05', icon: 'fas fa-chart-line', title: 'Grow', desc: 'Ongoing support and optimization to scale your success.' },
];

export default function HomeProcess() {
  return (
    <section className="home-section home-section-alt" aria-labelledby="home-process-title">
      <div className="home-container home-center">
        <span className="home-tag">Our Process</span>
        <h2 id="home-process-title" className="home-heading">
          How We <span className="highlight">Work</span>
        </h2>
        <p className="home-subtitle">
          A simple, transparent process designed to deliver exceptional results every time.
        </p>
        <div className="home-process-steps">
          {STEPS.map((step) => (
            <div key={step.num} className="home-process-step">
              <div className="home-process-num">{step.num}</div>
              <div className="home-process-icon">
                <i className={step.icon} />
              </div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
