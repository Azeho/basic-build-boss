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
      title: "Hospitality Sector",
      subtitle: "Hospitality sector",
      description: "Comprehensive solutions for hotels, resorts and sanatoriums. Telephony systems, video surveillance and access control.",
      image: hospitalityImg,
      reference: "Deniz Hotel Avaza",
    },
    {
      title: "Healthcare",
      subtitle: "Healthcare sector",
      description: "Specialized communication systems for medical facilities, hospitals and sanatoriums.",
      image: healthcareImg,
      reference: "Mollakara Sanatorium",
    },
    {
      title: "Government Sector",
      subtitle: "Government sector",
      description: "Secure communication systems for government agencies and ministries.",
      image: governmentImg,
      reference: "Ministry of Energy of Turkmenistan",
    },
    {
      title: "Financial Sector",
      subtitle: "Financial sector",
      description: "Secure solutions for banks and financial institutions with high data protection requirements.",
      image: financialImg,
      reference: "The State Bank for Foreign Economic Affairs of Turkmenistan",
    },
    {
      title: "Education",
      subtitle: "Education sector",
      description: "Modern systems for educational institutions, schools and universities.",
      image: educationImg,
      reference: "Secondary School No. 56 in Ashgabat",
    },
    {
      title: "Retail",
      subtitle: "Retail sector",
      description: "Comprehensive solutions for shopping centers, supermarkets and wholesale warehouses.",
      image: retailImg,
      reference: "Supermarket '15 Years of Independence'",
    },
    {
      title: "Transport",
      subtitle: "Transport sector",
      description: "Dispatch communication systems for airports, railway stations and seaports.",
      image: transportImg,
      reference: "Turkmenbashi International Seaport",
    },
    {
      title: "Industry",
      subtitle: "Industrial sector",
      description: "Process control systems and automation for industrial enterprises and energy sector.",
      image: industrialImg,
      reference: "Mary Power Plant",
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Industries We Serve</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Completed projects across various sectors of Turkmenistan's economy
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
                  <span className="font-semibold text-foreground">Completed project:</span> {sector.reference}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Experience</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">8+</div>
              <div className="text-sm text-muted-foreground">Industries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15+</div>
              <div className="text-sm text-muted-foreground">Years in Market</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Quality</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Industries;
