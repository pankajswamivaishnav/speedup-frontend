// import { Card, CardContent } from '@/components/ui/card';
import { Card, CardContent } from '@mui/material';
import { Badge } from '@mui/material';
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
      name: 'Priya Sharma',
      company: 'National Transport Solutions',
      role: 'Operations Manager',
      content:
        'The route optimization feature alone saved us 25% on fuel costs. The mobile app for drivers is intuitive and the customer portal has improved our service quality tremendously.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
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
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="standard" className="mb-4">
            Success Stories
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Trusted by Leading
            <span className="block text-primary">Transport Companies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of transport companies that have transformed their operations and achieved remarkable results with our bilty
            management system.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden group hover:shadow-medium transition-all duration-300">
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/30 transition-colors duration-300">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-foreground mb-6 italic leading-relaxed">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    <div className="text-sm text-primary font-medium">{testimonial.company}</div>
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
