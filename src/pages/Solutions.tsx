import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Network, Video, Volume2, Wifi, Cog, Shield, Camera, CheckCircle } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Phone,
      title: "Телефонизация предприятий",
      subtitle: "Telephonization & PABX systems",
      description: "Проектирование, установка и настройка современных систем телефонной связи и офисных АТС",
      features: [
        "IP-телефония",
        "Аналоговые и цифровые АТС",
        "Call-центры",
        "Интеграция с CRM",
      ],
    },
    {
      icon: Network,
      title: "Диспетчерская связь",
      subtitle: "Dispatcher communications systems",
      description: "Надежные системы диспетчерской связи для оперативного управления",
      features: [
        "Радиосвязь",
        "Диспетчерские консоли",
        "Системы оповещения",
        "Запись переговоров",
      ],
    },
    {
      icon: Video,
      title: "Аудио и видеоконференцсвязь",
      subtitle: "Audio and video conference systems",
      description: "Профессиональные решения для проведения конференций любого масштаба",
      features: [
        "HD видеоконференции",
        "Системы совместной работы",
        "Беспроводное подключение",
        "Запись конференций",
      ],
    },
    {
      icon: Volume2,
      title: "Системы звукового оповещения",
      subtitle: "Voice announcement and PA systems",
      description: "Системы оповещения и трансляции для любых объектов",
      features: [
        "Эвакуационное оповещение",
        "Фоновая музыка",
        "Зональное вещание",
        "IP-трансляция",
      ],
    },
    {
      icon: Wifi,
      title: "Локальные сети и IT инфраструктура",
      subtitle: "Network and IT solution",
      description: "Проектирование и внедрение сетевой инфраструктуры предприятия",
      features: [
        "СКС и волоконная оптика",
        "Активное сетевое оборудование",
        "Wi-Fi сети",
        "Серверные решения",
      ],
    },
    {
      icon: Cog,
      title: "Промышленная автоматизация",
      subtitle: "Industrial automation & SCADA systems",
      description: "АСУТП и системы диспетчеризации технологических процессов",
      features: [
        "SCADA системы",
        "ПЛК и контроллеры",
        "Операторские панели",
        "Промышленные сети",
      ],
    },
    {
      icon: Shield,
      title: "Информационная безопасность",
      subtitle: "Cybersecurity",
      description: "Комплексная защита информационных систем и данных",
      features: [
        "Межсетевые экраны",
        "Системы обнаружения вторжений",
        "Шифрование данных",
        "Аудит безопасности",
      ],
    },
    {
      icon: Camera,
      title: "Видеонаблюдение и контроль доступа",
      subtitle: "CCTV and access control systems",
      description: "Современные системы безопасности и контроля",
      features: [
        "IP и аналоговые камеры",
        "Видеоаналитика",
        "Системы СКУД",
        "Интеграция систем",
      ],
    },
  ];

  const services = [
    "Проектирование и консультирование",
    "Установка и пусконаладочные работы",
    "Техническая поддержка 24/7",
    "Сервисное обслуживание и ремонт",
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Решения и услуги</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Комплексные телекоммуникационные и информационные решения для вашего бизнеса
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-border hover:shadow-lg transition-all">
              <CardHeader>
                <solution.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="text-xl">{solution.title}</CardTitle>
                <CardDescription className="text-sm italic">{solution.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{solution.description}</p>
                <ul className="space-y-2">
                  {solution.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-secondary mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="text-center border-border">
                <CardHeader>
                  <CheckCircle className="h-10 w-10 text-primary mx-auto mb-3" />
                  <CardTitle className="text-lg">{service}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Planning and design, consulting, installation, commissioning and start up. 
              Technical support, maintenance and repair services.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;
