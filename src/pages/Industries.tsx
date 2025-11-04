import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import hospitalityImg from "@/assets/sector-hospitality.jpg";
import healthcareImg from "@/assets/sector-healthcare.jpg";
import governmentImg from "@/assets/sector-government.jpg";
import financialImg from "@/assets/sector-financial.jpg";
import educationImg from "@/assets/sector-education.jpg";
import retailImg from "@/assets/sector-retail.jpg";
import transportImg from "@/assets/sector-transport.jpg";
import industrialImg from "@/assets/sector-industrial.jpg";

const Industries = () => {
  const sectors = [
    {
      title: "Гостиничный сектор",
      subtitle: "Hospitality sector",
      description: "Комплексные решения для отелей, курортов и санаториев. Системы телефонии, видеонаблюдения и контроля доступа.",
      image: hospitalityImg,
      reference: "Дениз отель Аваза",
    },
    {
      title: "Здравоохранение",
      subtitle: "Healthcare sector",
      description: "Специализированные системы связи для медицинских учреждений, больниц и санаториев.",
      image: healthcareImg,
      reference: "Санаторий Моллакара",
    },
    {
      title: "Государственный сектор",
      subtitle: "Government sector",
      description: "Защищенные коммуникационные системы для государственных учреждений и министерств.",
      image: governmentImg,
      reference: "Министерство Энергетики Туркменистана",
    },
    {
      title: "Финансовый сектор",
      subtitle: "Financial sector",
      description: "Безопасные решения для банков и финансовых организаций с высокими требованиями к защите данных.",
      image: financialImg,
      reference: "Внешэконом банк Туркменистана",
    },
    {
      title: "Образование",
      subtitle: "Education sector",
      description: "Современные системы для образовательных учреждений, школ и университетов.",
      image: educationImg,
      reference: "СОШ №56 в г. Ашгабат",
    },
    {
      title: "Розничная торговля",
      subtitle: "Retail sector",
      description: "Комплексные решения для торговых центров, супермаркетов и оптовых баз.",
      image: retailImg,
      reference: "Супермаркет «15 лет Независимости»",
    },
    {
      title: "Транспорт",
      subtitle: "Transport sector",
      description: "Системы диспетчерской связи для аэропортов, вокзалов и морских портов.",
      image: transportImg,
      reference: "Международный морской порт Туркменбаши",
    },
    {
      title: "Промышленность",
      subtitle: "Industrial sector",
      description: "АСУТП и системы автоматизации для промышленных предприятий и энергетики.",
      image: industrialImg,
      reference: "Мары ГРЭС",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Сферы деятельности</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Реализованные проекты в различных отраслях экономики Туркменистана
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sector, index) => (
            <Card key={index} className="overflow-hidden border-border hover:shadow-xl transition-all group">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={sector.image} 
                  alt={sector.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-primary-foreground mb-1">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-primary-foreground/80 italic">
                    {sector.subtitle}
                  </p>
                </div>
              </div>
              <CardHeader>
                <CardDescription className="text-muted-foreground">
                  {sector.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Реализованный объект:</span> {sector.reference}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Наш опыт</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">8+</div>
              <div className="text-sm text-muted-foreground">Отраслей</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Объектов</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Лет на рынке</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Качество</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
