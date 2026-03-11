import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@/assets/sungur-logo.png";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Custom language change handler for mobile
  const handleMobileLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const langCode = e.target.value;
    if (!langCode) return;

    // Method 1: Try to trigger the desktop widget
    const googleCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleCombo) {
      googleCombo.value = langCode;
      googleCombo.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    // Method 2: Use Google Translate's cookie method
    const setCookie = (name: string, value: string, days: number) => {
      const expires = new Date(Date.now() + days * 864e5).toUTCString();
      document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    };

    // Set the Google Translate cookie and reload
    setCookie('googtrans', `/en/${langCode}`, 1);
    setCookie('googtrans', `/en/${langCode}`, 1); // Set twice for reliability
    window.location.reload();
  };

  useEffect(() => {
    // EXACT implementation from arassa-meydan.com
    window.googleTranslateElementInit = () => {
      // Desktop widget
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'ar,de,en,ru,tr,zh-CN,es,fr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        },
        'google_translate_element'
      );
    };

    // Load Google Translate script - EXACT same way as arassa-meydan.com
    if (!document.getElementById('google-translate-script')) {
      const script = document.createElement('script');
      script.id = 'google-translate-script';
      script.type = 'text/javascript';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    }

    // Minimal CSS - just to ensure body stays in place
    if (!document.getElementById('gt-style')) {
      const style = document.createElement('style');
      style.id = 'gt-style';
      style.textContent = `
        body { top: 0px !important; }
        .skiptranslate iframe { display: none !important; }

        /* Hide Google branding */
        .goog-te-gadget > span > a,
        .goog-te-gadget > span,
        .goog-logo-link,
        .goog-te-gadget img {
          display: none !important;
        }

        /* Style the dropdown */
        .goog-te-combo {
          padding: 6px 12px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 6px !important;
          background: white !important;
          font-size: 14px !important;
          cursor: pointer !important;
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/solutions", label: "Solutions" },
    { path: "/industries", label: "Industries" },
    { path: "/about", label: "About" },
    { path: "/contacts", label: "Contacts" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center">
            <img
              src={logoImage}
              alt="Sungur Electronics"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav links */}
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

          {/* Desktop right section */}
          <div className="hidden lg:flex items-center space-x-2">
            <a
              href="tel:+993129743-33"
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span>+993 12 97-43-33</span>
            </a>

            <a href="mailto:info@sungur-electronics.com">
              <Button variant="default" size="sm">
                <Mail className="h-4 w-4 mr-2" />
                Contact
              </Button>
            </a>

            {/* Google Translate - Desktop */}
            <div id="google_translate_element"></div>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
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
              <a
                href="tel:+993129743-33"
                className="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <Phone className="h-4 w-4" />
                <span>+993 12 97-43-33</span>
              </a>
              <a href="mailto:info@sungur-electronics.com">
                <Button variant="default" size="sm" className="w-full">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact
                </Button>
              </a>

              {/* Language Selector - Mobile */}
              <div className="pt-2 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2 mt-2">Language</p>
                <select
                  onChange={handleMobileLanguageChange}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  defaultValue=""
                >
                  <option value="">Select Language</option>
                  <option value="en">English</option>
                  <option value="ar">العربية (Arabic)</option>
                  <option value="de">Deutsch (German)</option>
                  <option value="ru">Русский (Russian)</option>
                  <option value="tr">Türkçe (Turkish)</option>
                  <option value="zh-CN">中文 (Chinese)</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
