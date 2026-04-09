import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Phone, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { useState, useRef, memo, useCallback } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import mitelLogo from "@/assets/mitel.jpg";

/**
 * Contact Form
 *
 * This form submits to contact.php which sends emails to info@sungur-electronics.com
 * Make sure your server has PHP mail() function configured properly.
 */

// Popular country codes
const countryCodes = [
  { code: "+1", country: "US/CA" },
  { code: "+7", country: "RU/KZ" },
  { code: "+20", country: "EG" },
  { code: "+27", country: "ZA" },
  { code: "+30", country: "GR" },
  { code: "+31", country: "NL" },
  { code: "+32", country: "BE" },
  { code: "+33", country: "FR" },
  { code: "+34", country: "ES" },
  { code: "+36", country: "HU" },
  { code: "+39", country: "IT" },
  { code: "+40", country: "RO" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+44", country: "UK" },
  { code: "+45", country: "DK" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+48", country: "PL" },
  { code: "+49", country: "DE" },
  { code: "+51", country: "PE" },
  { code: "+52", country: "MX" },
  { code: "+53", country: "CU" },
  { code: "+54", country: "AR" },
  { code: "+55", country: "BR" },
  { code: "+56", country: "CL" },
  { code: "+57", country: "CO" },
  { code: "+58", country: "VE" },
  { code: "+60", country: "MY" },
  { code: "+61", country: "AU" },
  { code: "+62", country: "ID" },
  { code: "+63", country: "PH" },
  { code: "+64", country: "NZ" },
  { code: "+65", country: "SG" },
  { code: "+66", country: "TH" },
  { code: "+81", country: "JP" },
  { code: "+82", country: "KR" },
  { code: "+84", country: "VN" },
  { code: "+86", country: "CN" },
  { code: "+90", country: "TR" },
  { code: "+91", country: "IN" },
  { code: "+92", country: "PK" },
  { code: "+93", country: "AF" },
  { code: "+94", country: "LK" },
  { code: "+95", country: "MM" },
  { code: "+98", country: "IR" },
  { code: "+212", country: "MA" },
  { code: "+213", country: "DZ" },
  { code: "+216", country: "TN" },
  { code: "+218", country: "LY" },
  { code: "+220", country: "GM" },
  { code: "+221", country: "SN" },
  { code: "+234", country: "NG" },
  { code: "+249", country: "SD" },
  { code: "+251", country: "ET" },
  { code: "+254", country: "KE" },
  { code: "+255", country: "TZ" },
  { code: "+256", country: "UG" },
  { code: "+351", country: "PT" },
  { code: "+352", country: "LU" },
  { code: "+353", country: "IE" },
  { code: "+354", country: "IS" },
  { code: "+355", country: "AL" },
  { code: "+358", country: "FI" },
  { code: "+359", country: "BG" },
  { code: "+370", country: "LT" },
  { code: "+371", country: "LV" },
  { code: "+372", country: "EE" },
  { code: "+373", country: "MD" },
  { code: "+374", country: "AM" },
  { code: "+375", country: "BY" },
  { code: "+376", country: "AD" },
  { code: "+377", country: "MC" },
  { code: "+378", country: "SM" },
  { code: "+380", country: "UA" },
  { code: "+381", country: "RS" },
  { code: "+382", country: "ME" },
  { code: "+385", country: "HR" },
  { code: "+386", country: "SI" },
  { code: "+387", country: "BA" },
  { code: "+389", country: "MK" },
  { code: "+420", country: "CZ" },
  { code: "+421", country: "SK" },
  { code: "+423", country: "LI" },
  { code: "+850", country: "KP" },
  { code: "+852", country: "HK" },
  { code: "+853", country: "MO" },
  { code: "+855", country: "KH" },
  { code: "+856", country: "LA" },
  { code: "+880", country: "BD" },
  { code: "+886", country: "TW" },
  { code: "+960", country: "MV" },
  { code: "+961", country: "LB" },
  { code: "+962", country: "JO" },
  { code: "+963", country: "SY" },
  { code: "+964", country: "IQ" },
  { code: "+965", country: "KW" },
  { code: "+966", country: "SA" },
  { code: "+967", country: "YE" },
  { code: "+968", country: "OM" },
  { code: "+970", country: "PS" },
  { code: "+971", country: "AE" },
  { code: "+972", country: "IL" },
  { code: "+973", country: "BH" },
  { code: "+974", country: "QA" },
  { code: "+975", country: "BT" },
  { code: "+976", country: "MN" },
  { code: "+977", country: "NP" },
  { code: "+992", country: "TJ" },
  { code: "+993", country: "TM" },
  { code: "+994", country: "AZ" },
  { code: "+995", country: "GE" },
  { code: "+996", country: "KG" },
  { code: "+998", country: "UZ" },
];

const Contacts = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+993",
    phone: "",
    message: "",
    sendCopy: false,
  });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Get reCAPTCHA token if configured
      let recaptchaToken = null;

      if (recaptchaSiteKey && recaptchaSiteKey !== 'your_recaptcha_site_key_here') {
        recaptchaToken = recaptchaRef.current?.getValue();

        if (!recaptchaToken) {
          setErrorMessage('Please complete the reCAPTCHA verification.');
          setIsSubmitting(false);
          return;
        }
      }

      const response = await fetch('/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      const result = await response.json();

      if (result.success) {
        // Store email for confirmation dialog
        setSubmittedEmail(formData.email);

        // Show success modal
        setShowSuccessDialog(true);

        // Clear form
        setFormData({ name: "", email: "", countryCode: "+993", phone: "", message: "", sendCopy: false });

        // Reset reCAPTCHA
        recaptchaRef.current?.reset();
      } else {
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
        recaptchaRef.current?.reset();
      }
    } catch (error) {
      setErrorMessage('Failed to send message. Please try again or contact us directly at info@sungur-electronics.com');
      recaptchaRef.current?.reset();
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

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

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
                <div className="flex gap-2 mt-2">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                    <SelectContent>
                      {countryCodes.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.code} {item.country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="12 97-43-33"
                    className="flex-1"
                  />
                </div>
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

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="sendCopy"
                  checked={formData.sendCopy}
                  onCheckedChange={(checked) => setFormData({ ...formData, sendCopy: checked === true })}
                />
                <Label
                  htmlFor="sendCopy"
                  className="text-sm font-normal cursor-pointer"
                >
                  Send a copy of this message to my email
                </Label>
              </div>

              {recaptchaSiteKey && recaptchaSiteKey !== 'your_recaptcha_site_key_here' && (
                <div className="flex justify-center">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={recaptchaSiteKey}
                  />
                </div>
              )}

              {errorMessage && (
                <div className="p-4 bg-destructive/10 border border-destructive text-destructive rounded-md">
                  {errorMessage}
                </div>
              )}

              <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
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

export default memo(Contacts);
