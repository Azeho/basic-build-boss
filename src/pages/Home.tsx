import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Network, Video, Volume2, Wifi, Cog, Shield, Camera, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-home.jpg";
import siemensLogo from "@/assets/siemens.png";
import boschLogo from "@/assets/Bosch.png";
import panasonicLogo from "@/assets/Panasonic-Logo.jpg";
import schneiderLogo from "@/assets/schneider.png";
import mitelLogo from "@/assets/mitel.jpg";
import alcatelLogo from "@/assets/alcatel.jpg";
import hpLogo from "@/assets/hp.jpg";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

const Home = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const vendors = [
    { name: "Bosch", logo: boschLogo },
    { name: "Mitel", logo: mitelLogo },
    { name: "Panasonic", logo: panasonicLogo },
    { name: "Alcatel", logo: alcatelLogo },
    { name: "HP", logo: hpLogo },
    { name: "Schneider Electric", logo: schneiderLogo },
    { name: "Siemens", logo: siemensLogo },
  ];

  const services = [
    {
      icon: Phone,
      title: "Enterprise Telephony",
      description: "Modern telephone systems and PBX solutions for business",
      color: "text-primary",
      image: "/placeholder.svg?height=200&width=400&text=Enterprise+Telephony",
    },
    {
      icon: Network,
      title: "Dispatch Communications",
      description: "Reliable dispatch communication systems",
      color: "text-secondary",
      image: "/placeholder.svg?height=200&width=400&text=Dispatch+Communications",
    },
    {
      icon: Video,
      title: "Conference Systems",
      description: "High-quality audio and video conferencing systems",
      color: "text-primary",
      image: "/placeholder.svg?height=200&width=400&text=Conference+Systems",
    },
    {
      icon: Volume2,
      title: "Public Address Systems",
      description: "Professional PA and notification systems",
      color: "text-secondary",
      image: "/placeholder.svg?height=200&width=400&text=Public+Address+Systems",
    },
    {
      icon: Wifi,
      title: "IT Infrastructure",
      description: "Local networks and information technology",
      color: "text-primary",
      image: "/placeholder.svg?height=200&width=400&text=IT+Infrastructure",
    },
    {
      icon: Cog,
      title: "Automation",
      description: "Industrial automation and SCADA systems",
      color: "text-secondary",
      image: "/placeholder.svg?height=200&width=400&text=Automation",
    },
    {
      icon: Shield,
      title: "Information Security",
      description: "Comprehensive information systems protection",
      color: "text-primary",
      image: "/placeholder.svg?height=200&width=400&text=Information+Security",
    },
    {
      icon: Camera,
      title: "Video Surveillance",
      description: "CCTV systems and access control",
      color: "text-secondary",
      image: "/placeholder.svg?height=200&width=400&text=Video+Surveillance",
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
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">About Us</h2>
          <div className="space-y-4 text-muted-foreground text-lg">
            <p>
              <span className="font-semibold text-foreground">Sungur Electronics</span> is a
              leading systems integrator in telecommunications technologies and information systems
              in Turkmenistan.
            </p>
            <p>
              Since our founding, we have implemented hundreds of projects of varying complexity for government
              agencies, financial organizations, industrial enterprises and commercial companies.
            </p>
          </div>
          <div className="mt-6">
            <Link to="/about">
              <Button variant="outline" size="lg">
                Read more
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20 bg-muted">
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
            <Card key={index} className="hover:shadow-lg transition-all border-border overflow-hidden">
              <div className="relative h-40 bg-muted">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
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

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8">
            {vendors.map((vendor, index) => (
              <div
                key={index}
                className="flex-[0_0_40%] md:flex-[0_0_25%] lg:flex-[0_0_20%] min-w-0"
              >
                <div className="flex items-center justify-center p-6 bg-background rounded-lg border border-border hover:shadow-md transition-all h-32">
                  <img
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-full h-20 object-contain grayscale hover:grayscale-0 transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
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
