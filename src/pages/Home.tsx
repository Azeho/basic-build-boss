import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Network, Video, Volume2, Wifi, Cog, Shield, Camera, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Home = () => {
  const services = [
    {
      icon: Phone,
      title: "Телефонизация предприятий",
      description: "Современные системы телефонной связи и АТС для бизнеса",
      color: "text-primary",
    },
    {
      icon: Network,
      title: "Диспетчерская связь",
      description: "Надежные системы диспетчерских коммуникаций",
      color: "text-secondary",
    },
    {
      icon: Video,
      title: "Конференцсвязь",
      description: "Аудио и видео конференц-системы высокого качества",
      color: "text-primary",
    },
    {
      icon: Volume2,
      title: "Звуковое оповещение",
      description: "Профессиональные системы PA и оповещения",
      color: "text-secondary",
    },
    {
      icon: Wifi,
      title: "IT инфраструктура",
      description: "Локальные сети и информационные технологии",
      color: "text-primary",
    },
    {
      icon: Cog,
      title: "Автоматизация",
      description: "Промышленная автоматизация и SCADA системы",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Информационная безопасность",
      description: "Комплексная защита информационных систем",
      color: "text-primary",
    },
    {
      icon: Camera,
      title: "Видеонаблюдение",
      description: "CCTV системы и контроль доступа",
      color: "text-secondary",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 to-foreground/40" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6">
              Комплексные телекоммуникационные решения
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Профессиональное проектирование, установка и обслуживание систем связи и IT инфраструктуры для вашего бизнеса
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/solutions">
                <Button size="lg" variant="default" className="w-full sm:w-auto">
                  Наши решения
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Связаться с нами
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Наши решения и услуги
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Предоставляем полный спектр услуг по внедрению современных телекоммуникационных систем
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-border">
              <CardHeader>
                <service.icon className={`h-12 w-12 ${service.color} mb-4`} />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/solutions">
            <Button size="lg" variant="outline">
              Все решения
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-muted py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-muted-foreground">Лет опыта</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Реализованных проектов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Техническая поддержка</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Готовы начать сотрудничество?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Свяжитесь с нами для консультации и получения коммерческого предложения
          </p>
          <Link to="/contacts">
            <Button size="lg">
              Связаться с нами
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
