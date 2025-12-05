import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+993 (12) 00-00-00",
      link: "tel:+99312000000",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@sungur-electronics.com",
      link: "mailto:info@sungur-electronics.com",
    },
    {
      icon: MapPin,
      title: "Адрес",
      content: "Ашхабад, Туркменистан",
      link: null,
    },
    {
      icon: Clock,
      title: "Режим работы",
      content: "Пн-Пт: 9:00 - 18:00\nСб-Вс: Выходной",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Контакты</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Свяжитесь с нами для консультации и получения коммерческого предложения
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Напишите нам</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name">Имя *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ваше имя"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+993 (12) 00-00-00"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Сообщение *</Label>
                <Textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Опишите вашу задачу или вопрос"
                  rows={5}
                  className="mt-2"
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Отправить сообщение
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Контактная информация</h2>
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="border-border">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <info.icon className="h-6 w-6 text-primary" />
                      <CardTitle className="text-lg">{info.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <CardDescription className="whitespace-pre-line">
                        {info.content}
                      </CardDescription>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6 border-primary bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">Партнер MITEL</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4">
                  Мы являемся официальным партнером MITEL в Туркменистане
                </CardDescription>
                <a 
                  href="https://www.mitel.com/partners/partner-locator"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="sm">
                    Partner Locator
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Готовы начать?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Наши специалисты готовы проконсультировать вас по любым вопросам и подобрать 
            оптимальное решение для вашего проекта
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+99312000000">
              <Button size="lg">
                <Phone className="mr-2 h-5 w-5" />
                Позвонить
              </Button>
            </a>
            <a href="mailto:info@sungur-electronics.com">
              <Button size="lg" variant="outline">
                <Mail className="mr-2 h-5 w-5" />
                Написать письмо
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;
