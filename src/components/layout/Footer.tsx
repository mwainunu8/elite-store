import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, MapPin, ShoppingBag } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold">Elite Store</span>
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted destination for premium mobile phones, watches, and iPods. Quality electronics at competitive prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'Products', path: '/products' },
                { name: 'About Us', path: '/about' },
                { name: 'Contacts', path: '/contacts' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Categories</h3>
            <ul className="space-y-2">
              {[
                { name: 'Mobile Phones', path: '/products?category=phones' },
                { name: 'Smart Watches', path: '/products?category=watches' },
                { name: 'iPods', path: '/products?category=ipods' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3">
              <li>
              <a
                  href="https://wa.me/255665974905"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: 0665974905
                </a>
              </li>
              <li>
                <a
                  href="tel:0665974905"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Call: 0665974905
                </a>
              </li>
              <li>
                <a
                  href="mailto:osigadi5@gmail.com"
                  className="flex items-center gap-3 text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  osigadi5@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Tanzania</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © {currentYear} Elite Store. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/255665974905"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-[hsl(142,70%,45%)] flex items-center justify-center hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="w-5 h-5 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
