import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          nav: {
            home: "Home",
            solutions: "Solutions",
            industries: "Industries",
            about: "About",
            contacts: "Contacts",
            contact: "Contact",
            language: "Language",
            selectLanguage: "Select Language"
          }
        }
      },
      ar: {
        translation: {
          nav: {
            home: "الرئيسية",
            solutions: "الحلول",
            industries: "الصناعات",
            about: "معلومات عنا",
            contacts: "جهات الاتصال",
            contact: "اتصل بنا",
            language: "اللغة",
            selectLanguage: "اختر اللغة"
          }
        }
      },
      ru: {
        translation: {
          nav: {
            home: "Главная",
            solutions: "Решения",
            industries: "Отрасли",
            about: "О нас",
            contacts: "Контакты",
            contact: "Связаться",
            language: "Язык",
            selectLanguage: "Выберите язык"
          }
        }
      },
      tr: {
        translation: {
          nav: {
            home: "Ana Sayfa",
            solutions: "Çözümler",
            industries: "Endüstriler",
            about: "Hakkında",
            contacts: "İletişim",
            contact: "İletişim",
            language: "Dil",
            selectLanguage: "Dil Seçin"
          }
        }
      },
      zh: {
        translation: {
          nav: {
            home: "首页",
            solutions: "解决方案",
            industries: "行业",
            about: "关于",
            contacts: "联系方式",
            contact: "联系",
            language: "语言",
            selectLanguage: "选择语言"
          }
        }
      },
      es: {
        translation: {
          nav: {
            home: "Inicio",
            solutions: "Soluciones",
            industries: "Industrias",
            about: "Acerca de",
            contacts: "Contactos",
            contact: "Contacto",
            language: "Idioma",
            selectLanguage: "Seleccionar idioma"
          }
        }
      },
      fr: {
        translation: {
          nav: {
            home: "Accueil",
            solutions: "Solutions",
            industries: "Industries",
            about: "À propos",
            contacts: "Contacts",
            contact: "Contact",
            language: "Langue",
            selectLanguage: "Sélectionner la langue"
          }
        }
      },
      de: {
        translation: {
          nav: {
            home: "Startseite",
            solutions: "Lösungen",
            industries: "Branchen",
            about: "Über uns",
            contacts: "Kontakte",
            contact: "Kontakt",
            language: "Sprache",
            selectLanguage: "Sprache wählen"
          }
        }
      }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
