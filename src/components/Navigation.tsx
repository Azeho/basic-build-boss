import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, Languages } from "lucide-react";
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

  useEffect(() => {
    // Set cookie to prevent banner BEFORE Google Translate loads
    document.cookie = "googtrans=/en/en; path=/; domain=.sungur-electronics.com";
    document.cookie = "googtrans=/en/en; path=/";

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,ru,tr,zh-CN,es,fr,de,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true,
        },
        "google_translate_element"
      );

      // Mobile widget
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,ru,tr,zh-CN,es,fr,de,en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
          multilanguagePage: true,
        },
        "google_translate_mobile"
      );
    };

    // Load Google Translate script
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.head.appendChild(script);
    }

    // AGGRESSIVE banner removal using MutationObserver
    const observer = new MutationObserver(() => {
      // Force body position
      document.body.style.top = "0px";
      document.body.style.position = "static";

      // Find and hide ALL banner variations
      const banners = document.querySelectorAll(
        '.goog-te-banner-frame, .goog-te-banner-frame.skiptranslate, iframe.goog-te-banner-frame'
      );

      banners.forEach((banner) => {
        (banner as HTMLElement).style.display = "none";
        (banner as HTMLElement).style.visibility = "hidden";
        banner.remove(); // Completely remove it from DOM
      });

      // Also check for the banner container
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        if (iframe.className.includes('goog-te-banner')) {
          iframe.style.display = 'none';
          iframe.remove();
        }
      });
    });

    // Observe the entire document
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Also run removal every 100ms as backup
    const interval = setInterval(() => {
      document.body.style.top = "0px";
      document.body.style.position = "static";

      const banners = document.querySelectorAll('.goog-te-banner-frame, iframe.goog-te-banner-frame');
      banners.forEach(b => b.remove());
    }, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
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
      <style>{`
        /* FORCE HIDE BANNER */
        body { top: 0px !important; position: static !important; }
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame,
        .goog-te-banner {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          position: absolute !important;
          top: -9999px !important;
        }
        body.translated-ltr, body.translated-rtl { top: 0px !important; }

        /* Style the widget */
        .goog-te-gadget { font-family: inherit !important; }
        .goog-te-gadget > span > a, .goog-te-gadget > span,
        .goog-logo-link, .goog-te-gadget img { display: none !important; }

        .goog-te-combo {
          padding: 6px 12px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 6px !important;
          background: white !important;
          font-size: 14px !important;
          cursor: pointer !important;
        }
      `}</style>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center notranslate">
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
              className="flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors notranslate"
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

            {/* Google Translate Widget */}
            <div id="google_translate_element" className="notranslate"></div>
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
                className="flex items-center space-x-2 text-sm text-muted-foreground notranslate"
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

              {/* Mobile Google Translate */}
              <div id="google_translate_mobile" className="notranslate"></div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
