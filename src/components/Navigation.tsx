import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@/assets/sungur-logo.png";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: { translate: { TranslateElement: any } };
  }
}

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Load Google Translate
  useEffect(() => {
    if (!document.getElementById("gt-style")) {
      const style = document.createElement("style");
      style.id = "gt-style";
      style.textContent = `
        /* Hide Google Translate banner that pushes content down */
        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
          position: static !important;
        }

        /* Hide "Powered by" text but keep the select */
        .goog-te-gadget span {
          display: none !important;
        }

        .goog-te-gadget {
          font-family: inherit !important;
          color: inherit !important;
        }

        /* Style the select dropdown */
        .goog-te-combo {
          padding: 4px 8px !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 4px !important;
          background: white !important;
          color: #1e293b !important;
          font-size: 14px !important;
          cursor: pointer !important;
          outline: none !important;
        }

        .goog-te-combo:hover {
          border-color: #cbd5e1 !important;
        }

        .goog-te-combo:focus {
          border-color: #3b82f6 !important;
        }

        /* Hide the Google logo */
        .goog-logo-link {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    window.googleTranslateElementInit = () => {
      // Desktop translate element
      if (document.getElementById("google_translate_element")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,ru,tr,zh-CN,es,fr,de",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }

      // Mobile translate element
      if (document.getElementById("google_translate_element_mobile")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,ru,tr,zh-CN,es,fr,de",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element_mobile"
        );
      }
    };

    if (!document.getElementById("gt-script")) {
      const script = document.createElement("script");
      script.id = "gt-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
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

            {/* Google Translate with Globe Icon */}
            <div className="flex items-center gap-1">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <div id="google_translate_element"></div>
            </div>
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

              {/* Mobile Google Translate */}
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <div id="google_translate_element_mobile"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
