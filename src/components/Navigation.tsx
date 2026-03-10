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
  const desktopBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

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

        /* Basic styling only */
        #google_translate_element {
          width: 100%;
        }
      `;
      document.head.appendChild(style);
    }

    window.googleTranslateElementInit = () => {
      // Initialize for desktop
      if (document.getElementById("google_translate_element")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,ru,tr,zh-CN,es,fr,de,ja,ko,pt,hi,it,nl,pl,sv,th,vi",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
      // Initialize for mobile
      if (document.getElementById("google_translate_element_mobile")) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "ar,ru,tr,zh-CN,es,fr,de,ja,ko,pt,hi,it,nl,pl,sv,th,vi",
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

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!translateOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const insideDropdown = dropdownRef.current?.contains(target);
      const insideMobileDropdown = mobileDropdownRef.current?.contains(target);
      const insideDesktop = desktopBtnRef.current?.contains(target);
      const insideMobile = mobileBtnRef.current?.contains(target);

      if (!insideDropdown && !insideMobileDropdown && !insideDesktop && !insideMobile) {
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
            {/* Desktop translate button with dropdown */}
            <div className="relative">
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
              {/* Desktop dropdown - positioned below button */}
              <div
                ref={dropdownRef}
                className={`absolute top-full right-0 mt-2 z-[100] bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-3
                  min-w-[250px] ${translateOpen ? "block" : "hidden"}`}
              >
                <div id="google_translate_element" />
              </div>
            </div>
          </div>

          {/* Mobile controls */}
          <div className="flex lg:hidden items-center space-x-1">
            {/* Mobile translate button with dropdown */}
            <div className="relative">
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
              {/* Mobile dropdown - positioned below button */}
              <div
                ref={mobileDropdownRef}
                className={`lg:hidden absolute top-full right-0 mt-2 z-[100] bg-white dark:bg-gray-800
                  border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg p-3
                  min-w-[250px] ${translateOpen ? "block" : "hidden"}`}
              >
                <div id="google_translate_element_mobile" />
              </div>
            </div>
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
