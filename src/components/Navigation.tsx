import { Link, useLocation } from "react-router-dom";
import { Phone, Mail, Menu, X, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import logoImage from "@/assets/sungur-logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: { translate: { TranslateElement: any } };
  }
}

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "zh-CN", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
];

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");
  const [translateReady, setTranslateReady] = useState(false);

  // Function to change language with retry mechanism
  const changeLanguage = (langCode: string) => {
    const tryChange = (attempts = 0) => {
      const selectElement = document.querySelector(
        ".goog-te-combo"
      ) as HTMLSelectElement;

      if (selectElement) {
        // Set the value
        selectElement.value = langCode;

        // Trigger change event with bubbles
        const changeEvent = new Event("change", { bubbles: true, cancelable: true });
        selectElement.dispatchEvent(changeEvent);

        // Also trigger input event
        const inputEvent = new Event("input", { bubbles: true, cancelable: true });
        selectElement.dispatchEvent(inputEvent);

        // Trigger click as backup
        selectElement.click();

        setCurrentLang(langCode);
        console.log("Language changed to:", langCode);
      } else if (attempts < 15) {
        // Retry up to 15 times with 500ms delay
        console.log("Waiting for Google Translate... attempt", attempts + 1);
        setTimeout(() => tryChange(attempts + 1), 500);
      } else {
        console.error("Google Translate not ready after 15 attempts");
        alert("Translation widget is loading. Please try again in a moment.");
      }
    };

    tryChange();
  };

  // Load Google Translate
  useEffect(() => {
    if (!document.getElementById("gt-style")) {
      const style = document.createElement("style");
      style.id = "gt-style";
      style.textContent = `
        /* Hide Google Translate banner */
        .goog-te-banner-frame {
          display: none !important;
        }

        body {
          top: 0 !important;
          position: static !important;
        }

        /* Hide the Google Translate widget visually but keep it in DOM */
        #google_translate_element,
        #google_translate_element_mobile {
          position: absolute !important;
          top: -9999px !important;
          left: -9999px !important;
          width: 1px !important;
          height: 1px !important;
          opacity: 0 !important;
          overflow: hidden !important;
        }

        /* Hide visual elements but keep select functional */
        .goog-te-gadget span {
          display: none !important;
        }

        .goog-te-gadget {
          font-size: 0 !important;
          color: transparent !important;
        }

        /* Hide Google logo */
        .goog-logo-link {
          display: none !important;
        }

        .goog-te-gadget img {
          display: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    window.googleTranslateElementInit = () => {
      console.log("Google Translate initializing...");
      if (document.getElementById("google_translate_element")) {
        try {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "ar,ru,tr,zh-CN,es,fr,de",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false,
            },
            "google_translate_element"
          );
          console.log("Google Translate element created");

          // Check when Google Translate is ready
          const checkReady = setInterval(() => {
            const combo = document.querySelector(".goog-te-combo");
            if (combo) {
              setTranslateReady(true);
              clearInterval(checkReady);
              console.log("Google Translate is READY!", combo);
            }
          }, 100);

          // Clear interval after 10 seconds if not ready
          setTimeout(() => {
            clearInterval(checkReady);
            const combo = document.querySelector(".goog-te-combo");
            if (!combo) {
              console.error("Google Translate failed to load after 10 seconds");
            }
          }, 10000);
        } catch (error) {
          console.error("Error initializing Google Translate:", error);
        }
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

            {/* Custom Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  {languages.find((l) => l.code === currentLang)?.flag || "🌐"}
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="cursor-pointer flex items-center gap-2"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Hidden Google Translate widget (hidden via CSS, not inline style) */}
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

              {/* Mobile Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full gap-2">
                    <Globe className="h-4 w-4" />
                    {languages.find((l) => l.code === currentLang)?.name || "Language"}
                    <ChevronDown className="h-3 w-3 ml-auto" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
