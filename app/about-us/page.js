export const metadata = {
  title: 'About Us | Bissgro - Professional Web Development Company',
  description: 'Learn more about Bissgro, a professional web development company delivering responsive, SEO-friendly, and modern websites for business growth.',
  openGraph: { title: 'About Bissgro', url: 'https://www.bissgro.com/about' },
};

export default function AboutUs() {
  return (
    <main>
      <section className="about-us py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4">
              <img src="/assets/about.png" className="img-fluid" alt="About Bissgro" />
            </div>
            <div className="col-lg-6">
              <h1 className="mb-3">About Us</h1>
              <p>
                At <strong>Bissgro</strong>, we specialize in crafting modern, responsive, and SEO-friendly websites
                that help businesses establish a strong digital presence. Our mission is to empower
                entrepreneurs and organizations with innovative web solutions tailored to their unique needs.
              </p>
              <p>
                With a team of passionate developers, designers, and strategists, we combine technology
                and creativity to deliver websites that not only look great but also perform seamlessly
                across all devices. From startups to established enterprises, we partner with clients
                to turn their vision into reality.
              </p>
              <p>
                Whether you need a corporate website, an e-commerce store, or a custom web solution,
                Bissgro ensures high-quality results that drive growth, engagement, and success.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
