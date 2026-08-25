import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Contacts = () => {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      value: '0665974905',
      description: 'Chat with us instantly',
      action: {
        label: 'Chat Now',
        href: 'https://wa.me/255665974905',
        variant: 'whatsapp' as const,
      },
    },
    {
      icon: Phone,
      title: 'Phone Call',
      value: '0665974905',
      description: 'Call us directly',
      action: {
        label: 'Call Now',
        href: 'tel:0665974905',
        variant: 'elite' as const,
      },
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'osigadi5@gmail.com',
      description: 'Send us an email',
      action: {
        label: 'Send Email',
        href: 'mailto:osigadi5@gmail.com',
        variant: 'outline' as const,
      },
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 bg-background">
      {/* Hero Section */}
      <section className="py-16 bg-hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-primary-foreground mb-6 animate-slide-up">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            We're here to help! Reach out to us through any of the channels below
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className={`p-8 bg-card rounded-2xl shadow-elite-md text-center hover:shadow-elite-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in opacity-0 stagger-${index + 1}`}
                style={{ animationFillMode: 'forwards' }}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-accent/10 flex items-center justify-center">
                  <method.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                  {method.title}
                </h3>
                <p className="text-accent font-medium text-lg mb-1">{method.value}</p>
                <p className="text-muted-foreground text-sm mb-6">{method.description}</p>
                <a href={method.action.href} target="_blank" rel="noopener noreferrer">
                  <Button variant={method.action.variant} className="w-full">
                    {method.action.label}
                  </Button>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Location */}
              <div className="p-8 bg-card rounded-2xl shadow-elite-sm animate-slide-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      Our Location
                    </h3>
                    <p className="text-muted-foreground text-sm">Where to find us</p>
                  </div>
                </div>
                <p className="text-foreground leading-relaxed">
                  Tanzania<br />
                  We deliver nationwide!
                </p>
              </div>

              {/* Business Hours */}
              <div className="p-8 bg-card rounded-2xl shadow-elite-sm animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">
                      Business Hours
                    </h3>
                    <p className="text-muted-foreground text-sm">When we're available</p>
                  </div>
                </div>
                <div className="space-y-2 text-foreground">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">8:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-muted-foreground">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Need Quick Assistance?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Our WhatsApp support is the fastest way to get help. We typically respond within minutes!
          </p>
          <a
            href="https://wa.me/255665974905?text=Hello%20Elite%20Store!%20I%20need%20assistance."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="whatsapp" size="xl" className="gap-2">
              <MessageCircle className="w-5 h-5" />
              Start WhatsApp Chat
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
