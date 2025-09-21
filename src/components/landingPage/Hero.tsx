import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import heroImage from '../../assets/hero-transport.jpg';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Transport Management System" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Streamline Your
            <span className="block bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">Transport Operations</span>
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
            Complete bilty management system for modern transport companies. Track shipments, manage routes, and optimize deliveries in one
            powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="contained" size="large" className="text-lg px-8 py-6" onClick={() => navigate('/login')}>
              Start Free Trial
            </Button>
            <Button variant="outlined" size="large" className="text-lg px-8 py-6" onClick={() => navigate('/login')}>
              Login
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-white/80">
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">500+</div>
              <div className="text-sm">Transport Companies</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">1M+</div>
              <div className="text-sm">Shipments Tracked</div>
            </div>
            <div className="w-px h-12 bg-white/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">99.9%</div>
              <div className="text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards for visual interest */}
      <div className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white hidden lg:block">
        <div className="text-sm opacity-80">Live Tracking</div>
        <div className="text-lg font-semibold">Delhi → Mumbai</div>
        <div className="text-sm text-accent">In Transit</div>
      </div>

      <div className="absolute bottom-20 right-10 bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white hidden lg:block">
        <div className="text-sm opacity-80">Route Optimization</div>
        <div className="text-lg font-semibold">25% Faster</div>
        <div className="text-sm text-accent">Delivery Time</div>
      </div>
    </section>
  );
};

export default Hero;
