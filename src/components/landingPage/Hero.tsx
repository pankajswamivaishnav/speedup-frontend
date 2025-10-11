import { Button } from '@mui/material';
import heroImage from '../../assets/hero-transport.jpg';
import UniversalDialog from 'components/popup/UniversalDialog';
import { useState } from 'react';
import { TUniversalDialogProps } from 'types/types.UniversalDialog';
import { FormattedMessage } from 'react-intl';

const Hero = () => {
  // -------------- Show transporter details page pop up --------------
  const [demoModal, setDemoModal] = useState<TUniversalDialogProps>({
    action: {
      open: false,
      maxWidth: 'xl'
    },
    title: 'Driver Detail',
    data: { existingData: {}, isEditMode: false }
  });
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden mt-16 xl:mt-0 ">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Transport Management System" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-primary-600/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white ">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl sm:text-2xl xl:text-6xl font-bold mb-3 md:mb-8 mt-5 xl:mt-0  leading-tight">
            <span className="block text-white ">Streamline Your</span>
            <span className="block text-accent-500">Transport Operations</span>
          </h1>

          <p className="text-sm md:text-2xl mb-5 md:mb-10 text-white/90 max-w-3xl mx-auto leading-relaxed">
            Complete bilty management system for modern transport companies. Track shipments, manage routes, and optimize deliveries in one
            powerful platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
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
              onClick={() =>
                setDemoModal((prev: any) => {
                  return {
                    ...prev,
                    data: { isEditMode: false, existingData: {} },
                    action: { ...prev.action, open: !prev.action.open },
                    title: <FormattedMessage id="Driver Detail" />
                  };
                })
              }
            >
              Start Free Trial
            </Button>
            <Button
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '1.125rem',
                padding: '12px 32px',
                borderRadius: '8px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#1d4ed8'
                }
              }}
              onClick={() =>
                setDemoModal((prev: any) => {
                  return {
                    ...prev,
                    data: { isEditMode: false, existingData: {} },
                    action: { ...prev.action, open: !prev.action.open },
                    title: <FormattedMessage id="Driver Detail" />
                  };
                })
              }
            >
              Watch Demo
            </Button>
          </div>
          <div>
            {/* Floating cards - for small screens (below buttons, above statistics) */}
            <div className="md:hidden w-full mt-6 mb-6 flex flex-col gap-4 justify-center items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20 w-[90%]">
                <div className="text-sm text-white/80 mb-1">Live Tracking</div>
                <div className="text-lg font-bold mb-1">Delhi → Mumbai</div>
                <div className="text-sm text-accent-400 font-medium">In Transit</div>
              </div>

              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-white border border-white/20 w-[90%]">
                <div className="text-sm text-white/80 mb-1">Route Optimization</div>
                <div className="text-lg font-bold mb-1">25% Faster</div>
                <div className="text-sm text-accent-400 font-medium">Delivery Time</div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="flex items-center justify-center xl:gap-12 gap-3 text-white/90 mb-5 md:mb-0">
            <div className="text-center">
              <div className="xl:text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/80">Transport Companies</div>
            </div>
            <div className="w-px h-16 bg-white/30"></div>
            <div className="text-center">
              <div className="xl:text-3xl font-bold text-white">1M+</div>
              <div className="text-sm text-white/80">Shipments Tracked</div>
            </div>
            <div className="w-px h-16 bg-white/30"></div>
            <div className="text-center">
              <div className="xl:text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-white/80">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating cards */}
      {/* Floating cards - for large & medium screens (absolute) */}
      <div className="hidden md:block">
        <div className="absolute bottom-16 left-16 bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20">
          <div className="text-sm text-white/80 mb-1">Live Tracking</div>
          <div className="text-xl font-bold mb-1">Delhi → Mumbai</div>
          <div className="text-sm text-accent-400 font-medium">In Transit</div>
        </div>

        <div className="absolute bottom-24 right-16 bg-white/20 backdrop-blur-sm rounded-xl p-6 text-white border border-white/20">
          <div className="text-sm text-white/80 mb-1">Route Optimization</div>
          <div className="text-xl font-bold mb-1">25% Faster</div>
          <div className="text-sm text-accent-400 font-medium">Delivery Time</div>
        </div>
      </div>

      {demoModal && (
        <UniversalDialog
          action={{ ...demoModal.action }}
          onClose={() =>
            setDemoModal((prev: any) => {
              return {
                ...prev,
                data: { isEditMode: false, existingData: {} },
                action: { ...prev.action, open: !prev.action.open },
                title: <FormattedMessage id="Driver Detail" />
              };
            })
          }
          title="How to use SpeedUp"
          hasPrimaryButton={false}
        >
          <iframe
            src="https://www.loom.com/embed/af500895729d4fc2b4f01b60b1cdbd07"
            className="w-full md:w-full lg:w-[600px] xl:w-[600px] h-[315px]"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Demo Video"
          />
        </UniversalDialog>
      )}
    </section>
  );
};

export default Hero;
