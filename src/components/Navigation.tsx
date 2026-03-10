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

  // Load Google Translate once and suppress the injected banner
  useEffect(() => {
    if (!document.getElementById("gt-suppress-style")) {
      const style = document.createElement("style");
      style.id = "gt-suppress-style";
      style.textContent = `
        /* Completely hide Google Translate banner and notification bar */
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          opacity: 0 !important;
        }

        /* Prevent body from being pushed down */
        body {
          top: 0 !important;
          position: static !important;
        }

        /* Hide the "Powered by" text */
        .goog-te-gadget {
          font-size: 0 !important;
          color: transparent !important;
        }
        .goog-te-gadget > span {
          display: none !important;
        }
        .goog-te-gadget img {
          display: none !important;
        }

        /* Style the dropdown select */
        #google_translate_element select {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          width: 100%;
          background: white;
          color: #1f2937;
          transition: all 0.2s ease;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        #google_translate_element select:hover {
          border-color: #3b82f6;
          box-shadow: 0 2px 4px rgba(59, 130, 246, 0.1);
        }

        #google_translate_element select:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        /* Additional overrides for notification bar */
        body > .skiptranslate,
        #goog-gt-tt,
        .goog-te-spinner-pos {
          display: none !important;
        }

        iframe.skiptranslate {
          visibility: hidden !important;
          height: 0 !important;
        }
      `;
      document.head.appendChild(style);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    if (!document.getElementById("gt-script")) {
      const script = document.createElement("script");
      script.id = "gt-script";
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!translateOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDropdown = dropdownRef.current?.contains(target);
      const insideDesktop = desktopBtnRef.current?.contains(target);
      const insideMobile = mobileBtnRef.current?.contains(target);
      if (!insideDropdown && !insideDesktop && !insideMobile) {
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
      {/* Fixed translate dropdown — always in DOM so the widget can initialize */}
      <div
        ref={dropdownRef}
        className={`fixed z-[200] bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700
          rounded-xl shadow-2xl p-5
          top-[72px] right-4 left-4 mx-auto max-w-[320px]
          sm:left-auto sm:max-w-none sm:min-w-[280px]
          lg:top-[68px] lg:right-6 lg:min-w-[260px]
          transition-all duration-200 ease-in-out
          ${translateOpen ? "block opacity-100 scale-100" : "hidden opacity-0 scale-95"}`}
      >
        <div className="flex items-center gap-2 mb-3">
          <Globe className="h-5 w-5 text-primary" />
          <p className="text-base text-foreground font-semibold">Select Language</p>
        </div>
        <div id="google_translate_element" className="min-h-[44px]" />
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
