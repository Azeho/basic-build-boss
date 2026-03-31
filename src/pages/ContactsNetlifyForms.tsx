import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState, useRef } from "react";
import mitelLogo from "@/assets/mitel.jpg";

/**
 * SIMPLIFIED Contact Form using Netlify Forms
 *
 * NO API KEYS NEEDED!
 * NO SENDGRID SETUP REQUIRED!
 *
 * Just deploy and configure email notification in Netlify Dashboard:
 * 1. Netlify Dashboard → Site settings → Forms
 * 2. Add notification → Email notification
 * 3. Enter: info@sungur-electronics.com
 * 4. Done!
 */

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Encode form data for Netlify
      const formBody = new FormData();
      formBody.append('form-name', 'contact');
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('phone', formData.phone);
      formBody.append('message', formData.message);

      // Submit to Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        body: formBody,
      });

      if (response.ok) {
        // Store email for confirmation dialog
        setSubmittedEmail(formData.email);

        // Show success modal
        setShowSuccessDialog(true);

        // Clear form
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again or email us directly at info@sungur-electronics.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      content: "+993 12 97-43-33",
      link: "tel:+993129743-33",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@sungur-electronics.com",
      link: "mailto:info@sungur-electronics.com",
    },
    {
      icon: MapPin,
      title: "Address",
      content: "Ashgabat, Turkmenistan",
      link: null,
    },
    {
      icon: Clock,
      title: "Working Hours",
      content: "Mon-Fri: 9:00 AM - 6:00 PM\nSat-Sun: Closed",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-primary to-secondary py-20 text-primary-foreground">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg md:text-xl max-w-3xl opacity-90">
            Contact us for consultation and to receive a commercial proposal
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Send Us a Message</h2>

            {/*
              Netlify Forms require:
              1. name="contact" attribute on form
              2. data-netlify="true" attribute
              3. Hidden input with form-name
              4. method="post"
            */}
            <form
              ref={formRef}
              name="contact"
              method="post"
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Hidden fields for Netlify */}
              <input type="hidden" name="form-name" value="contact" />

              {/* Honeypot field for spam protection */}
              <div style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </div>

              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+993 12 97-43-33"
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project or question"
                  rows={5}
                  className="mt-2"
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                ✨ Powered by Netlify Forms - No API keys required!
              </p>
            </form>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-8">Contact Information</h2>
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
                <div className="flex justify-center">
                  <img src={mitelLogo} alt="MITEL Partner" className="h-16 object-contain" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="mb-4 text-center">
                  We are an official MITEL partner in Turkmenistan
                </CardDescription>
                <div className="flex justify-center">
                  <a
                    href="https://www.mitel.com/partners/partner-locator"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      Partner Locator
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our specialists are ready to consult you on any issues and select
            the optimal solution for your project
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+993129743-33">
              <Button size="lg">
                <Phone className="mr-2 h-5 w-5" />
                Call Us
              </Button>
            </a>
            <a href="mailto:info@sungur-electronics.com">
              <Button size="lg" variant="outline">
                <Mail className="mr-2 h-5 w-5" />
                Send Email
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-primary" />
            </div>
            <DialogTitle className="text-center text-2xl">Message Sent Successfully!</DialogTitle>
            <DialogDescription className="text-center text-lg">
              Thank you for contacting us. We will get back to you shortly{submittedEmail ? ` at ${submittedEmail}` : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <Button onClick={() => setShowSuccessDialog(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contacts;
