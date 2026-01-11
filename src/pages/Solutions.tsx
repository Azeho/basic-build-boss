import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Network, Video, Volume2, Wifi, Cog, Shield, Camera, CheckCircle } from "lucide-react";

const Solutions = () => {
  const solutions = [
    {
      icon: Phone,
      title: "Enterprise Telephony",
      subtitle: "Telephonization & PABX systems",
      description: "Design, installation and configuration of modern telephone systems and office PBX",
      features: [
        "IP telephony",
        "Analog and digital PBX",
        "Call centers",
        "CRM integration",
      ],
    },
    {
      icon: Network,
      title: "Dispatch Communications",
      subtitle: "Dispatcher communications systems",
      description: "Reliable dispatch communication systems for operational management",
      features: [
        "Radio communications",
        "Dispatcher consoles",
        "Notification systems",
        "Call recording",
      ],
    },
    {
      icon: Video,
      title: "Audio and Video Conferencing",
      subtitle: "Audio and video conference systems",
      description: "Professional solutions for conferences of any scale",
      features: [
        "HD video conferencing",
        "Collaboration systems",
        "Wireless connectivity",
        "Conference recording",
      ],
    },
    {
      icon: Volume2,
      title: "Public Address Systems",
      subtitle: "Voice announcement and PA systems",
      description: "Notification and broadcast systems for any facility",
      features: [
        "Evacuation notification",
        "Background music",
        "Zone broadcasting",
        "IP broadcasting",
      ],
    },
    {
      icon: Wifi,
      title: "Local Networks and IT Infrastructure",
      subtitle: "Network and IT solution",
      description: "Design and implementation of enterprise network infrastructure",
      features: [
        "Structured cabling and fiber optics",
        "Active network equipment",
        "Wi-Fi networks",
        "Server solutions",
      ],
    },
    {
      icon: Cog,
      title: "Industrial Automation",
      subtitle: "Industrial automation & SCADA systems",
      description: "Process control systems and SCADA for technological processes",
      features: [
        "SCADA systems",
        "PLCs and controllers",
        "Operator panels",
        "Industrial networks",
      ],
    },
    {
      icon: Shield,
      title: "Information Security",
      subtitle: "Cybersecurity",
      description: "Comprehensive protection of information systems and data",
      features: [
        "Firewalls",
        "Intrusion detection systems",
        "Data encryption",
        "Security audits",
      ],
    },
    {
      icon: Camera,
      title: "Video Surveillance and Access Control",
      subtitle: "CCTV and access control systems",
      description: "Modern security and control systems",
      features: [
        "IP and analog cameras",
        "Video analytics",
        "Access control systems",
        "System integration",
      ],
    },
  ];

  const services = [
    "Design and Consulting",
    "Installation and Commissioning",
    "24/7 Technical Support",
    "Service and Repair",
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Solutions and Services</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Comprehensive telecommunications and information solutions for your business
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
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
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
