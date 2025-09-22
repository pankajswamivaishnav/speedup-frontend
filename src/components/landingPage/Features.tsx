import { Card, CardContent, Chip } from '@mui/material';
import { Truck, MapPin, BarChart3, Shield, Clock, Users, FileText, Smartphone } from 'lucide-react';
import dashboardImageTrack from '../../assets/live-dashboard.jpeg';
const Features = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Digital Bilty Management',
      description: 'Create, manage, and track digital bilty documents with automated compliance and real-time updates.'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fleet Management',
      description: 'Monitor your entire fleet in real-time with GPS tracking, maintenance scheduling, and driver management.'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Route Optimization',
      description: 'AI-powered route planning to reduce fuel costs, delivery time, and improve customer satisfaction.'
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics & Reports',
      description: 'Comprehensive dashboards and reports to track performance, costs, and operational efficiency.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Compliance Management',
      description: 'Stay compliant with transport regulations, automatic document generation, and audit trails.'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Real-time Tracking',
      description: 'Live shipment tracking with automated customer notifications and delivery confirmations.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Customer Portal',
      description: 'Self-service portal for customers to track shipments, request quotes, and manage bookings.'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile App',
      description: 'Native mobile apps for drivers and managers with offline capabilities and instant updates.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Chip
            label="Features"
            sx={{
              backgroundColor: '#f3f4f6',
              color: '#374151',
              fontWeight: 500,
              borderRadius: '20px',
              padding: '4px 12px',
              marginBottom: '24px'
            }}
          />
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Everything You Need to Manage
            <span className="block text-primary-600">Your Transport Business</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From bilty creation to delivery confirmation, our comprehensive platform handles every aspect of your transport operations with
            precision and efficiency.
          </p>
        </div>

        {/* Main Feature Showcase */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20 p-5">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Complete Bilty Lifecycle Management</h3>
            <p className="text-lg text-gray-600 mb-8">
              Handle every stage of your bilty process digitally - from initial booking to final delivery confirmation. Automated workflows
              ensure accuracy and compliance at every step.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-gray-900">Automated bilty generation and printing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-gray-900">Real-time status updates and notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-gray-900">Digital proof of delivery with signatures</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                <span className="text-gray-900">Integrated payment and invoice management</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl shadow-2xl overflow-hidden">
              <img src={dashboardImageTrack} alt="Live Dashboard Preview" className="w-full h-auto rounded-2xl" />
            </div>
            <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
              Live Dashboard
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-sm"
              sx={{
                borderRadius: '12px',
                '&:hover': {
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <CardContent className="p-6">
                <div className="text-primary-600 mb-4 group-hover:text-accent-500 transition-colors duration-300">{feature.icon}</div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">{feature.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
