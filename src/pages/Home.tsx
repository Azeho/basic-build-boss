import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Network, Video, Volume2, Wifi, Cog, Shield, Camera, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";

const Home = () => {
  // Add your vendor logos here - upload images to src/assets/ folder
  // Example: import ciscoLogo from "@/assets/vendor-cisco.png";
  const vendors = [
    { name: "Vendor 1" },
    { name: "Vendor 2" },
    { name: "Vendor 3" },
    { name: "Vendor 4" },
    { name: "Vendor 5" },
    { name: "Vendor 6" },
  ];

  const services = [
    {
      icon: Phone,
      title: "Enterprise Telephony",
      description: "Modern telephone systems and PBX solutions for business",
      color: "text-primary",
    },
    {
      icon: Network,
      title: "Dispatch Communications",
      description: "Reliable dispatch communication systems",
      color: "text-secondary",
    },
    {
      icon: Video,
      title: "Conference Systems",
      description: "High-quality audio and video conferencing systems",
      color: "text-primary",
    },
    {
      icon: Volume2,
      title: "Public Address Systems",
      description: "Professional PA and notification systems",
      color: "text-secondary",
    },
    {
      icon: Wifi,
      title: "IT Infrastructure",
      description: "Local networks and information technology",
      color: "text-primary",
    },
    {
      icon: Cog,
      title: "Automation",
      description: "Industrial automation and SCADA systems",
      color: "text-secondary",
    },
    {
      icon: Shield,
      title: "Information Security",
      description: "Comprehensive information systems protection",
      color: "text-primary",
    },
    {
      icon: Camera,
      title: "Video Surveillance",
      description: "CCTV systems and access control",
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
              Comprehensive Telecommunications Solutions
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Professional design, installation and maintenance of communication systems and IT infrastructure for your business
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/solutions">
                <Button size="lg" variant="default" className="w-full sm:w-auto">
                  Our Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contacts">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Solutions and Services
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We provide a full range of services for implementing modern telecommunications systems
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
              All Solutions
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
              <div className="text-muted-foreground">Years of Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Completed Projects</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Technical Support</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We work with leading global equipment manufacturers
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-all"
            >
              <div className="text-center w-full">
                <div className="w-full h-20 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">{vendor.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Start Working Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Contact us for consultation and to receive a commercial proposal
          </p>
          <Link to="/contacts">
            <Button size="lg">
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
