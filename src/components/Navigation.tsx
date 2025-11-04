import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Главная" },
    { path: "/solutions", label: "Решения и услуги" },
    { path: "/industries", label: "Сферы деятельности" },
    { path: "/about", label: "О компании" },
    { path: "/contacts", label: "Контакты" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
              <div className="text-primary-foreground font-bold text-xl">SE</div>
            </div>
            <div className="hidden md:block">
              <div className="font-bold text-lg text-foreground">Sungur Electronics</div>
              <div className="text-xs text-muted-foreground">Технологии для бизнеса</div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-md transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <a href="tel:+99312000000" className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              <span>+993 (12) 00-00-00</span>
            </a>
            <a href="mailto:info@sungur-electronics.com">
              <Button variant="default" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Связаться
              </Button>
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2 rounded-md transition-all ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 pt-4 space-y-3 border-t border-border mt-4">
              <a href="tel:+99312000000" className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+993 (12) 00-00-00</span>
              </a>
              <a href="mailto:info@sungur-electronics.com">
                <Button variant="default" size="sm" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Связаться
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
