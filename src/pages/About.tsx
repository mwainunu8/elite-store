import { Shield, Users, Award, Heart, Target, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { value: '5000+', label: 'Happy Customers' },
    { value: '100+', label: 'Products' },
    { value: '24/7', label: 'Support' },
    { value: '99%', label: 'Satisfaction' },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'We only sell 100% genuine and authentic products with full manufacturer warranty.',
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority. We go above and beyond to serve you better.',
    },
    {
      icon: Award,
      title: 'Trusted Excellence',
      description: 'Years of experience in the electronics industry with a proven track record.',
    },
    {
      icon: Heart,
      title: 'Passion for Tech',
      description: 'We love technology and are excited to share the best devices with you.',
    },
    {
      icon: Target,
      title: 'Best Prices',
      description: 'Competitive pricing without compromising on quality or service.',
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'Quick and secure nationwide delivery to get your products to you faster.',
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-slide-up">
            About Elite Store
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Your trusted destination for premium mobile phones, smartwatches, and iPods in Tanzania
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`text-center animate-fade-in opacity-0 stagger-${index + 1}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <p className="font-display text-3xl md:text-4xl font-bold text-accent mb-1">
                  {stat.value}
                </p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-up">
                <h2 className="font-display text-3xl font-bold text-foreground">
                  Our Story
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Elite Store was founded with a simple mission: to provide Tanzanians with access to 
                  genuine, high-quality electronics at fair prices. What started as a small venture 
                  has grown into a trusted name in the electronics retail industry.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We understand that technology plays a crucial role in modern life. That's why we 
                  carefully curate our collection to include only the best smartphones, smartwatches, 
                  and audio devices from world-renowned brands.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment to customer satisfaction goes beyond just selling products. We provide 
                  comprehensive support, genuine warranties, and a seamless shopping experience that 
                  keeps our customers coming back.
                </p>
              </div>
              <div className="relative animate-scale-in">
                <div className="aspect-square rounded-2xl bg-hero-gradient p-8 shadow-elite-xl">
                  <div className="h-full w-full rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center text-primary-foreground">
                      <p className="font-display text-5xl font-bold mb-2">ES</p>
                      <p className="text-sm opacity-80">Est. 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              What sets Elite Store apart from the rest
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={`p-6 bg-card rounded-xl shadow-elite-sm hover:shadow-elite-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in opacity-0 stagger-${(index % 6) + 1}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              To be Tanzania's most trusted electronics retailer by providing authentic products, 
              exceptional customer service, and competitive prices. We strive to make premium 
              technology accessible to everyone while maintaining the highest standards of 
              quality and integrity.
            </p>
            <div className="p-8 bg-hero-gradient rounded-2xl text-primary-foreground">
              <p className="font-display text-2xl font-bold mb-2">
                "Quality Technology, Trusted Service"
              </p>
              <p className="opacity-80">— Elite Store Team</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
