import { Card, CardContent, Button } from '@mui/material';
import UniversalDialog from 'components/popup/UniversalDialog';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';
import { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import Contact from 'pages/contact/Contact';
import { useNavigate } from 'react-router';

const CTA = () => {
  const navigate = useNavigate();
  const benefits = ['30-day free trial', 'No setup fees', '24/7 support', 'Easy migration', 'Training included'];
  const [schdeDemoFormPopup, setScheduleFormPopup] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'md'
    },
    title: 'Fill Information',
    data: { existingData: {}, isEditMode: false }
  });

  const handleTogglePopup = async () => {
    setScheduleFormPopup((prev: any) => {
      return {
        ...prev,
        data: { isEditMode: false, existingData: {} },
        action: { ...prev.action, open: !prev.action.open },
        title: <FormattedMessage id="Fill Information" defaultMessage="Fill Information" />
      };
    });
  };

  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #2563eb 0%, #f97316 100%)'
      }}
    >
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
                <CheckCircle className="w-5 h-5 text-accent-500" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#f97316',
                color: 'white',
                fontSize: '1.125rem',
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#ea580c'
                }
              }}
              className="group"
              onClick={() => navigate('/login')}
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#f3f4f6',
                color: '#374151',
                fontSize: '1.125rem',
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#e5e7eb'
                }
              }}
              onClick={handleTogglePopup}
            >
              Schedule Demo
            </Button>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Card
              className="bg-white/20 backdrop-blur-sm border-white/20"
              sx={{
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CardContent className="p-6 text-center">
                <Phone className="w-8 h-8 text-accent-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Call Us</h3>
                <p className="text-white/80 mb-3">Speak with our transport experts</p>
                <a href="tel:+91-9876543210" className="text-accent-500 hover:text-accent-400 transition-colors duration-300 font-semibold">
                  +91-9876543210
                </a>
              </CardContent>
            </Card>

            <Card
              className="bg-white/20 backdrop-blur-sm border-white/20"
              sx={{
                borderRadius: '16px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <CardContent className="p-6 text-center">
                <Mail className="w-8 h-8 text-accent-500 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Email Us</h3>
                <p className="text-white/80 mb-3">Get detailed information</p>
                <a
                  href="mailto:info@biltymanagement.com"
                  className="text-accent-500 hover:text-accent-400 transition-colors duration-300 font-semibold"
                >
                  info@biltymanagement.com
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* ----------- Schedule a demo modal ----------  */}
      <UniversalDialog
        action={{ ...schdeDemoFormPopup.action }}
        onClose={handleTogglePopup}
        title={schdeDemoFormPopup.title}
        hasPrimaryButton={false}
      >
        <Contact handleTogglePopup={handleTogglePopup} />
      </UniversalDialog>
    </section>
  );
};

export default CTA;
