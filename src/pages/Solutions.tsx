import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Phone, Network, Video, Cog, Shield, Camera, Radio, Volume2, Wrench } from "lucide-react";
import { memo } from "react";
import pabxImg from "@/assets/pabx.jpg";
import networkImg from "@/assets/network.jpg";
import scadaImg from "@/assets/scada.jpg";
import audioImg from "@/assets/audio.jpg";
import audioconfImg from "@/assets/audioconf.jpg";
import cyberImg from "@/assets/cyber.png";
import cctvImg from "@/assets/cctv.jpg";
import techsImg from "@/assets/techs.jpg";
import systemsImg from "@/assets/systems.jpg";

const Solutions = () => {
  const solutions = [
    {
      icon: Phone,
      title: "Telephonization & PABX systems",
      description: "PABX systems Mitel (Unify), Alcatel, Panasonic. UC Platforms, Contact Center, Desktop & Cordless Devices, Collaboration, Voice recording systems, Billing systems",
      color: "text-primary",
      image: pabxImg,
    },
    {
      icon: Network,
      title: "Network and IT solution",
      description: "Data center equipment (IT Racks, Servers, Power (UPS) and Cooling (HVAC)), Network Infrastructure (Hardware & Software), Network Management, Monitoring and Security, Cloud Integration (SD-WAN and NaaS), Redundancy and High Availability",
      color: "text-secondary",
      image: networkImg,
    },
    {
      icon: Cog,
      title: "Industrial automation & SCADA systems",
      description: "Automated Process Control Systems (APCS) and SCADA systems: Monitoring and regulation, Quality control, Efficiency optimization, Safety and protection, Data management",
      color: "text-primary",
      image: scadaImg,
    },
    {
      icon: Video,
      title: "Audio and video conference systems",
      description: "Professional audio-conferencing systems, Professional video-conferencing systems, Virtual conferencing systems, Simultaneous translation systems",
      color: "text-secondary",
      image: audioconfImg,
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "IDS (Intrusion Detection System), IPS (Intrusion Prevention System), Firewall systems (Fortinet, Juniper, Netgate), Session Border Controller (SBC), Encryption data and voice",
      color: "text-primary",
      image: cyberImg,
    },
    {
      icon: Camera,
      title: "CCTV and access control systems",
      description: "Video surveillance systems (CCTV), Intelligent video analytics (IVA) & video content analysis (VCA), Access control systems, Video wall systems",
      color: "text-secondary",
      image: cctvImg,
    },
    {
      icon: Radio,
      title: "Dispatcher communications systems",
      description: "OpenScape Xpert Mitel (Unify), OpenScape Alarm Response OScAR Mitel (Unify)",
      color: "text-primary",
      image: audioImg,
    },
    {
      icon: Wrench,
      title: "Services",
      description: "Planning, Design and Consulting, Installation, Commissioning and Start up, Technical support and maintenance",
      color: "text-secondary",
      image: techsImg,
    },
    {
      icon: Volume2,
      title: "Voice announcement and PA systems",
      description: "Public Address (PA) systems BOSCH, Electro-Voice, Sennheiser, Dynacord, TOA, Inter-M",
      color: "text-primary",
      image: systemsImg,
    },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((solution, index) => (
            <Card key={index} className="hover:shadow-lg transition-all border-border overflow-hidden">
              <div className="relative h-40 bg-muted">
                <img
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-full object-cover"
                  width="640"
                  height="400"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <CardHeader>
                <solution.icon className={`h-12 w-12 ${solution.color} mb-4`} />
                <CardTitle className="text-lg">{solution.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{solution.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-foreground">
              Our Commitment to Excellence
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg">
              <p>
                <span className="font-semibold text-foreground">Sungur Electronics</span> strives to be an innovation-driven company, deeply focused on our clients' unique needs and objectives. Our core expertise lies in system integration. We provide a comprehensive range of information technology and automation services—from initial strategy development to implementation, ongoing support, and maintenance.
              </p>
              <p>
                Our greatest asset is our team of professional consultants and technical specialists. Our engineers regularly undergo international training to stay at the forefront of the industry. Their high level of expertise is backed by numerous certifications from leading global manufacturers and, most importantly, by a proven track record of successfully completed projects.
              </p>
              <p>
                At Sungur Electronics, we are committed to building long-term, professional partnerships. To us, partnership means mutual growth and shared success. We remain dedicated to being an innovative leader that anticipates and meets the evolving challenges of our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Solutions);
