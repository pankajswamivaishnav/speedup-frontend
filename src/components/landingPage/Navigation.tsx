import { Button, Typography } from '@mui/material';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const navigation = [
    { name: 'Features', href: '#features' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              color: '#2563eb',
              fontSize: '1.5rem'
            }}
          >
            SpeedUp
          </Typography>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-900 hover:text-primary-600 transition-colors duration-300 font-semibold"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="text"
              sx={{
                color: '#374151',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: 'transparent',
                  color: '#2563eb'
                }
              }}
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#2563eb',
                color: 'white',
                fontWeight: 600,
                borderRadius: '8px',
                padding: '8px 24px',
                '&:hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
              onClick={() => navigate('/login')}
            >
              Start Free Trial
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="text" size="small" onClick={() => setIsOpen(!isOpen)} sx={{ color: '#374151' }}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-gray-200/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-900 hover:text-primary-600 transition-colors duration-300 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2 space-y-2">
                <Button
                  variant="text"
                  className="w-full justify-start font-medium"
                  sx={{ color: '#374151' }}
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  className="w-full justify-start font-medium"
                  sx={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    '&:hover': {
                      backgroundColor: '#1d4ed8'
                    }
                  }}
                  onClick={() => navigate('/login')}
                >
                  Start Free Trial
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
