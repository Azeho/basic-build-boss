import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp, CheckCircle } from "lucide-react";
import aboutHeroImg from "@/assets/about-hero.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Профессионализм",
      description: "Высококвалифицированные специалисты с многолетним опытом работы",
    },
    {
      icon: Award,
      title: "Качество",
      description: "Используем только сертифицированное оборудование ведущих мировых производителей",
    },
    {
      icon: Users,
      title: "Клиентоориентированность",
      description: "Индивидуальный подход к каждому проекту и техническая поддержка 24/7",
    },
    {
      icon: TrendingUp,
      title: "Инновации",
      description: "Постоянное развитие и внедрение передовых технологий",
    },
  ];

  const achievements = [
    "Официальный партнер ведущих мировых производителей",
    "Более 500 успешно реализованных проектов",
    "Команда из 50+ высококвалифицированных специалистов",
    "Собственный сервисный центр и склад",
    "Круглосуточная техническая поддержка",
    "Гарантия на все выполненные работы",
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">О компании</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Ваш надежный партнер в области телекоммуникационных и IT решений
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={aboutHeroImg} 
              alt="Команда Sungur Electronics" 
              className="rounded-lg shadow-xl w-full"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Решения, основанные на опыте и профессионализме
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Компания <span className="font-semibold text-foreground">Sungur Electronics</span> является 
                ведущим системным интегратором в области телекоммуникационных технологий и информационных систем 
                на территории Туркменистана.
              </p>
              <p>
                С момента основания мы реализовали сотни проектов различной сложности для государственных 
                учреждений, финансовых организаций, промышленных предприятий и коммерческих компаний.
              </p>
              <p>
                Наша миссия — предоставлять клиентам надежные, современные и экономически эффективные решения, 
                которые способствуют развитию их бизнеса и повышению операционной эффективности.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-border hover:shadow-lg transition-all">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Наши достижения</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted transition-colors">
                <CheckCircle className="h-6 w-6 text-secondary shrink-0 mt-0.5" />
                <span className="text-foreground">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Партнерство с ведущими брендами</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Мы являемся официальными партнерами и дистрибьюторами ведущих мировых производителей 
            телекоммуникационного оборудования, включая MITEL и другие.
          </p>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            <a 
              href="https://www.mitel.com/partners/partner-locator" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-foreground hover:opacity-80 transition-opacity underline"
            >
              Mitel Partner Locator
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
