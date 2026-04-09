import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp, CheckCircle, FileEdit, Settings, Wrench } from "lucide-react";
import aboutHeroImg from "@/assets/about-hero.jpg";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Professionalism",
      description: "Highly qualified specialists with years of experience",
    },
    {
      icon: Award,
      title: "Quality",
      description: "We use only certified equipment from leading global manufacturers",
    },
    {
      icon: Users,
      title: "Client-Oriented",
      description: "Individual approach to each project and 24/7 technical support",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuous development and implementation of cutting-edge technologies",
    },
  ];

  const achievements = [
    "Official partner of leading global manufacturers",
    "More than 500 successfully completed projects",
    "Team of 50+ highly qualified specialists",
    "Own service center and warehouse",
    "24/7 technical support",
    "Warranty on all completed work",
  ];

  const services = [
    {
      icon: FileEdit,
      title: "Planning & Design & Consulting",
      description: [
        "Developing technical solutions in alignment with customer requirements and project budget. Preparing design and estimate documentation.",
        "Project planning and scheduling, including timelines and implementation deadlines.",
        "Consulting on equipment and material procurement tailored to specific project needs.",
        "Managing the full project lifecycle from start to finish: from planning and resource allocation to final delivery."
      ]
    },
    {
      icon: Settings,
      title: "Installation & Commissioning & Start up",
      description: [
        "Execution of installation and cabling works. Testing, verification, and labeling of all system components.",
        "Equipment commissioning and start-up operations.",
        "Construction of structured cabling networks, data transmission systems, and telephone communications.",
        "Dispatching, telemetry, and automation. Sound notification systems, video surveillance, and access control."
      ]
    },
    {
      icon: Wrench,
      title: "Technical support & maintenance",
      description: [
        "Technical project support and equipment installation supervision. We provide technical support throughout the entire project lifecycle or the manufacturer's warranty period.",
        "Maintenance and repair services, including preventive equipment maintenance.",
        "Comprehensive system maintenance, diagnostics, and troubleshooting.",
        "Integration of legacy equipment with modern systems."
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Your reliable partner in telecommunications and IT solutions
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src={aboutHeroImg}
              alt="Sungur Electronics Team"
              className="rounded-lg shadow-xl w-full"
              width="1200"
              height="800"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Solutions Based on Experience and Professionalism
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Sungur Electronics</span> is a company specializing in the development and implementation of system solutions in modern information technology (transmission, control, storage, and processing of information), communications systems, and security in the Turkmen market since 2010. Depending on the development needs of the customer's enterprise, we develop and implement turnkey custom systems or adapt existing solutions to specific conditions.
              </p>
              <p>
                Sungur Electronics strives to be an innovative company focused on the needs and objectives of our clients. Our core business has always been and remains systems integration. We offer our clients a full range of IT and automation services, from strategy development to implementation, deployment, support, and maintenance.
              </p>
              <p>
                Our team of professional consultants and technical specialists is our core asset. All our technical specialists regularly undergo training abroad. Their high level of professionalism is confirmed by numerous certificates and diplomas from leading global manufacturers and, most importantly, by successfully completed projects.
              </p>
              <p>
                Sungur Electronics is focused on building long-term, professional partnerships with our clients. For us, partnerships are about mutual benefit and development. We strive to be an innovative company focused on the needs and objectives of our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-all">
                <CardHeader>
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {service.description.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
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
          <h2 className="text-3xl font-bold mb-6">Partnership with Leading Brands</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            We are official partners and distributors of leading global telecommunications
            equipment manufacturers, including MITEL and others.
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
