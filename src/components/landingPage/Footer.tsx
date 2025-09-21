import { Divider } from '@mui/material';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const solutions = ['Bilty Management', 'Fleet Tracking', 'Route Optimization', 'Driver Management', 'Compliance Tools'];

  const company = ['About Us', 'Careers', 'Press', 'Partners', 'Contact'];

  const resources = ['Documentation', 'Help Center', 'API Reference', 'System Status', 'Blog'];

  const legal = ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Data Processing', 'Security'];

  return (
    <footer className="bg-foreground text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Truck className="w-8 h-8 text-accent" />
              <span className="text-2xl font-bold">BiltyManager</span>
            </div>
            <p className="text-white/80 mb-6 max-w-md">
              The complete transport management solution for modern logistics companies. Streamline your operations, track shipments, and
              grow your business.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <Phone className="w-4 h-4 text-accent" />
                <span>+91-9876543210</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail className="w-4 h-4 text-accent" />
                <span>info@biltymanager.com</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <MapPin className="w-4 h-4 text-accent" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutions.map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-accent transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="my-12 bg-white/20" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-white/60 text-sm">© 2024 BiltyManager. All rights reserved.</div>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="text-white/60 hover:text-accent transition-colors duration-300">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors duration-300">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors duration-300">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-accent transition-colors duration-300">
              <Instagram className="w-5 h-5" />
            </a>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-sm">
            {legal.map((item) => (
              <a key={item} href="#" className="text-white/60 hover:text-accent transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
