import { Avatar, Card, CardContent, Chip } from '@mui/material';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      company: 'Express Logistics Pvt Ltd',
      role: 'Managing Director',
      content:
        'This bilty management system transformed our operations completely. We reduced paperwork by 90% and improved delivery tracking significantly. Our customers love the real-time updates.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Deepak Vaishnav',
      company: 'Shree Krishna Transport Service',
      role: 'Operations Manager',
      content:
        'The route optimization feature alone saved us 25% on fuel costs. The mobile app for drivers is intuitive and the customer portal has improved our service quality tremendously.',
      rating: 5,
      image: 'http://res.cloudinary.com/dd8tchl1d/image/upload/v1758555620/speedup/nzrehsuauvesickwzgsn.jpg'
    },
    {
      name: 'Amit Patel',
      company: 'Gujarat Freight Services',
      role: 'CEO',
      content:
        "We've been using this system for 2 years now. The compliance management and automated reporting have made our audit processes seamless. Highly recommended for any transport business.",
      rating: 5,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
  ];

  const stats = [
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '45%', label: 'Cost Reduction' },
    { number: '60%', label: 'Faster Processing' },
    { number: '99.9%', label: 'System Uptime' }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Success Stories Header */}
        <div className="text-center mb-16">
          <Chip
            label="Success Stories"
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
            Trusted by Leading
            <span className="block text-primary-600">Transport Companies</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds of transport companies that have transformed their operations and achieved remarkable results with our bilty
            management system.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials Header */}
        <div className="text-center mb-16">
          <Chip
            label="Testimonials"
            sx={{
              backgroundColor: '#f3f4f6',
              color: '#374151',
              fontWeight: 500,
              borderRadius: '20px',
              padding: '4px 12px',
              marginBottom: '24px'
            }}
          />
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
              sx={{
                borderRadius: '12px',
                '&:hover': {
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary-200">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent-500 text-accent-500" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <Avatar
                    src={testimonial.image}
                    alt={testimonial.name}
                    sx={{
                      width: 80,
                      height: 80,
                      border: '3px solid white',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      bgcolor: 'hsl(var(--primary))',
                      fontSize: '2rem',
                      fontWeight: 600,
                      // backgroundColor: theme.palette.primary.main,
                      '& img': {
                        objectFit: 'cover', // keep full cover
                        objectPosition: 'center top' // move image slightly down (face shows better)
                      }
                    }}
                  ></Avatar>
                  {/* <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" /> */}
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial?.role}</div>
                    <div className="text-sm text-primary-600 font-medium">{testimonial.company}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
