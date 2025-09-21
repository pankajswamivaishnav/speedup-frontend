import CTA from 'components/landingPage/CTA';
import Features from 'components/landingPage/Features';
import Footer from 'components/landingPage/Footer';
import Hero from 'components/landingPage/Hero';
import Navigation from 'components/landingPage/Navigation';
import Testimonials from 'components/landingPage/Testimonials';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
