import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4 text-foreground">Sungur Electronics</h3>
            <p className="text-muted-foreground text-sm">
              Комплексные телекоммуникационные и информационные решения для вашего бизнеса
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Навигация</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/solutions" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Решения и услуги
                </Link>
              </li>
              <li>
                <Link to="/industries" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Сферы деятельности
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  О компании
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Контакты</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-sm">
                <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a href="tel:+99312000000" className="text-muted-foreground hover:text-primary transition-colors">
                  +993 (12) 00-00-00
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <Mail className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <a href="mailto:info@sungur-electronics.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                  info@sungur-electronics.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  Ашхабад, Туркменистан
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sungur Electronics. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
