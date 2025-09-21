import { Card, CardContent, Button } from '@mui/material';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';

const CTA = () => {
  const benefits = ['30-day free trial', 'No setup fees', '24/7 support', 'Easy migration', 'Training included'];

  return (
    <section className="py-20 bg-gradient-hero relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Ready to Transform Your
            <span className="block">Transport Operations?</span>
          </h2>

          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the leading transport companies that trust our bilty management system to streamline their operations and boost efficiency.
          </p>

          {/* Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-white/90">
                <CheckCircle className="w-5 h-5 text-accent" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="contained" size="large" className="text-lg px-8 py-6 group">
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button variant="outlined" size="large" className="text-lg px-8 py-6">
              Schedule Demo
            </Button>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                <p className="text-white/80 mb-3">Speak with our transport experts</p>
                <a href="tel:+91-9876543210" className="text-accent hover:text-accent-light transition-colors duration-300 font-semibold">
                  +91-9876543210
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                <p className="text-white/80 mb-3">Get detailed information</p>
                <a
                  href="mailto:info@biltymanagement.com"
                  className="text-accent hover:text-accent-light transition-colors duration-300 font-semibold"
                >
                  info@biltymanagement.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
