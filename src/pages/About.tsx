import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Award, TrendingUp, CheckCircle } from "lucide-react";
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
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Solutions Based on Experience and Professionalism
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <span className="font-semibold text-foreground">Sungur Electronics</span> is a
                leading systems integrator in telecommunications technologies and information systems
                in Turkmenistan.
              </p>
              <p>
                Since our founding, we have implemented hundreds of projects of varying complexity for government
                agencies, financial organizations, industrial enterprises and commercial companies.
              </p>
              <p>
                Our mission is to provide clients with reliable, modern and cost-effective solutions
                that contribute to their business development and operational efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
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
