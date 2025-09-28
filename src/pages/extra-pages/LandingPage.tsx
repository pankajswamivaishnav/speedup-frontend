import CTA from 'components/landingPage/CTA';
import Features from 'components/landingPage/Features';
import Footer from 'components/landingPage/Footer';
import Hero from 'components/landingPage/Hero';
import Navigation from 'components/landingPage/Navigation';
import Testimonials from 'components/landingPage/Testimonials';

const LandingPage = () => {
  return (
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
  );
};

export default LandingPage;
