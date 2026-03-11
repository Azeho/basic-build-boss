import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@/assets/sungur-logo.png";

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Yandex Translate Widget Configuration
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      function YandexTranslateInit() {
        if (typeof Ya !== 'undefined' && Ya.Translate) {
          Ya.Translate.init({
            lang: 'en-ar,en-ru,en-tr,en-zh,en-es,en-fr,en-de',
            embedded: false,
            autoMode: false
          });
        }
      }
    `;
    document.head.appendChild(script);

    // Load Yandex Translate script
    const yandexScript = document.createElement('script');
    yandexScript.src = 'https://translate.yandex.net/website-widget/v1/widget.js?widgetId=ytWidget&pageLang=en&widgetTheme=light&autoMode=false';
    yandexScript.async = true;
    yandexScript.onload = () => {
      // Initialize after script loads
      if (typeof (window as any).YandexTranslateInit === 'function') {
        (window as any).YandexTranslateInit();
      }
    };
    document.body.appendChild(yandexScript);

    // Style the Yandex widget
    const style = document.createElement('style');
    style.textContent = `
      /* Style Yandex Translate widget */
      .ya-page-js-inited .ya-translate-widget {
        display: inline-block !important;
      }

      .ya-translate-widget select {
        padding: 6px 12px !important;
        border: 1px solid #e2e8f0 !important;
        border-radius: 6px !important;
        background: white !important;
        color: #1e293b !important;
        font-size: 14px !important;
        cursor: pointer !important;
        font-family: inherit !important;
      }

      .ya-translate-widget select:hover {
        border-color: #3b82f6 !important;
      }

      /* Hide Yandex branding */
      .ya-translate-widget .ya-brand {
        display: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (document.body.contains(yandexScript)) {
        document.body.removeChild(yandexScript);
      }
    };
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

            {/* Yandex Translate Widget - Desktop */}
            <div id="ytWidget" className="notranslate"></div>
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

              {/* Yandex Translate Widget - Mobile */}
              <div className="pt-2 notranslate">
                <div id="ytWidget"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
