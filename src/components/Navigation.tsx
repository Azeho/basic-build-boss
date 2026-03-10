import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
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
  const [translateOpen, setTranslateOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const desktopBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  // Load Google Translate with minimal styling
  useEffect(() => {
    if (!document.getElementById("gt-minimal-style")) {
      const style = document.createElement("style");
      style.id = "gt-minimal-style";
      style.textContent = `
        /* Hide ALL Google Translate injected UI elements */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        body > .skiptranslate,
        iframe.goog-te-banner-frame,
        iframe.skiptranslate {
          display: none !important;
        }

        body {
          top: 0 !important;
          position: static !important;
        }

        /* Styling for translate widget */
        #google_translate_element {
          width: 100%;
        }

        #google_translate_element select {
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.375rem;
          border: 1px solid #d1d5db;
          background-color: white;
        }

        .dark #google_translate_element select {
          background-color: #1f2937;
          border-color: #4b5563;
          color: white;
        }
      `;
      document.head.appendChild(style);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "ar,ru,tr,zh-CN,es,fr,de,ja,ko,pt,hi,it,nl,pl,sv,th,vi",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
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

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!translateOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const insideDropdown = dropdownRef.current?.contains(target);
      const insideDesktopBtn = desktopBtnRef.current?.contains(target);
      const insideMobileBtn = mobileBtnRef.current?.contains(target);

      if (!insideDropdown && !insideDesktopBtn && !insideMobileBtn) {
        setTranslateOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [translateOpen]);

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
      {/* Single translate dropdown - always in DOM, positioned absolutely */}
      <div
        ref={dropdownRef}
        className={`fixed z-[100] bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
          rounded-lg shadow-lg p-3 min-w-[280px]
          transition-opacity duration-200
          ${translateOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}
          top-[70px] right-4
          lg:top-[65px] lg:right-6`}
      >
        <div id="google_translate_element" />
      </div>

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
            <Button
              ref={desktopBtnRef}
              variant="ghost"
              size="icon"
              onClick={() => setTranslateOpen((o) => !o)}
              title="Translate page"
              aria-label="Translate page"
            >
              <Globe className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center space-x-1">
            <Button
              ref={mobileBtnRef}
              variant="ghost"
              size="icon"
              onClick={() => setTranslateOpen((o) => !o)}
              title="Translate page"
              aria-label="Translate page"
            >
              <Globe className="h-5 w-5" />
            </Button>
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
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
