import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Admin', path: '/admin' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border/50 shadow-elite-sm">
      <div className="container mx-auto px-4">

        {/* Top bar */}
        <div className="hidden md:flex items-center justify-end gap-6 py-2 text-sm border-b border-border/30">
          <a
            href="tel:0665974905"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <Phone className="w-3 h-3" />
            0665974905
          </a>

          <a
            href="mailto:osigadi5@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <Mail className="w-3 h-3" />
            osigadi5@gmail.com
          </a>
        </div>

        {/* Main navbar */}
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-20 h-20 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Elite Store Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <span className="font-display text-xl font-bold text-gradient">
              Elite Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/30 animate-slide-up">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-secondary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-border/30 flex flex-col gap-2 text-sm">

              <a
                href="tel:0665974905"
                className="flex items-center gap-2 text-muted-foreground px-4 py-2"
              >
                <Phone className="w-4 h-4" />
                0665974905
              </a>

              <a
                href="mailto:osigadi5@gmail.com"
                className="flex items-center gap-2 text-muted-foreground px-4 py-2"
              >
                <Mail className="w-4 h-4" />
                osigadi5@gmail.com
              </a>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;