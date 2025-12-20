import CTA from 'components/landingPage/CTA';
import Features from 'components/landingPage/Features';
import Footer from 'components/landingPage/Footer';
import Hero from 'components/landingPage/Hero';
import Navigation from 'components/landingPage/Navigation';
import Testimonials from 'components/landingPage/Testimonials';
import { Helmet } from 'react-helmet-async';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>Speedupora TMS | Transport Management System for Logistics</title>
        <meta
          name="description"
          content="Speedupora TMS helps transporters manage vehicles, trips, drivers, billing and tracking in one platform."
        />
        <link rel="canonical" href="https://www.speedup.com/" />
      </Helmet>
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
