import CTA from 'components/landingPage/CTA';
import Features from 'components/landingPage/Features';
import Footer from 'components/landingPage/Footer';
import Hero from 'components/landingPage/Hero';
import Navigation from 'components/landingPage/Navigation';
import Testimonials from 'components/landingPage/Testimonials';
import SEO from 'components/SEO';

const LandingPage = () => {
  return (
    <>
      <SEO
        title="Speedupora TMS | Transport Management System for Logistics"
        description="Speedupora TMS helps transporters manage vehicles, trips, drivers, billing and tracking in one platform."
        canonicalUrl="https://www.speedupora.com"
        noIndex
      />

      <div className="min-h-screen">
        <div className="min-h-screen">
          <Navigation />

          <section id="hero">
            <Hero />
          </section>

          <section id="features">
            <Features />
          </section>

          <section id="testimonials">
            <Testimonials />
          </section>

          <section id="contact">
            <CTA />
          </section>

          <section id="pricing">
            <Footer />
          </section>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
