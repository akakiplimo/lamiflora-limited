import { ContactDetail, SectionProps } from "@/lib/types";
import { Mail, MapPin, Phone } from "lucide-react";
import Container from "../ui/Container";
import Typography from "../ui/Typography";
import Card from "../ui/Card";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Logo from "../navigation/Logo";

const ContactSection: React.FC<SectionProps> = ({
  sectionRef,
  onNavigate,
  isVisible,
  translateX,
  opacity,
}) => {
  const contactDetails: ContactDetail[] = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+254 (0) 722 667 154", "+254 (0) 719 784 008"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@lamiflora.co.ke", "sales@lamiflora.co.ke"],
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["Nyandarua County, Kenya", "Premium Flower Farm"],
    },
  ];

  interface BusinessHour {
    day: string;
    time: string;
  }

  const businessHours: BusinessHour[] = [
    { day: "Monday - Friday", time: "8:00 AM - 6:00 PM" },
    { day: "Saturday", time: "9:00 AM - 4:00 PM" },
    { day: "Sunday", time: "Closed" },
  ];

  interface QuickLink {
    name: string;
    index: number;
  }

  const quickLinks: QuickLink[] = [
    { name: "Home", index: 0 },
    { name: "Products", index: 1 },
    { name: "About", index: 2 },
    { name: "Sustainability", index: 3 },
  ];

  return (
    <div
      className={`absolute inset-0 transition-none ${
        !isVisible ? "pointer-events-none" : ""
      }`}
      style={{
        transform: `translateX(${translateX}%)`,
        opacity: opacity,
      }}
    >
      <Container.Section
        ref={sectionRef}
        className="bg-gradient-to-br from-gray-50 to-blue-50"
      >
        <Container.Content>
          <div className="text-center mb-16">
            <Typography.Heading2>Get in Touch</Typography.Heading2>
            <Typography.Subtitle className="max-w-3xl mx-auto">
              Ready to bring the beauty of our premium flowers to your space?
              We'd love to hear from you.
            </Typography.Subtitle>
          </div>

          <Container.Grid className="grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Information */}
            <div className="space-y-8">
              {contactDetails.map((contact: ContactDetail, index: number) => (
                <Card.Contact key={index} {...contact} />
              ))}

              <Card.Base className="p-6 shadow-lg">
                <Typography.Heading3 className="mb-4">
                  Business Hours
                </Typography.Heading3>
                <div className="space-y-2 text-gray-600">
                  {businessHours.map((hours: BusinessHour, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{hours.day}</span>
                      <span>{hours.time}</span>
                    </div>
                  ))}
                </div>
              </Card.Base>
            </div>

            {/* Contact Form */}
            <Card.Base className="shadow-xl p-8">
              <Typography.Heading3 className="mb-6">
                Send us a Message
              </Typography.Heading3>
              <div className="space-y-6">
                <Container.Grid className="grid-cols-1 md:grid-cols-2 gap-4">
                  <Input.Text placeholder="Your Name" />
                  <Input.Email placeholder="Your Email" />
                </Container.Grid>
                <Input.Text placeholder="Subject" />
                <Input.TextArea placeholder="Your Message" rows={6} />
                <Button.Primary
                  onClick={() =>
                    alert("Message sent! We'll get back to you soon.")
                  }
                  className="w-full"
                >
                  Send Message
                </Button.Primary>
              </div>
            </Card.Base>
          </Container.Grid>

          {/* Footer */}
          <div className="pt-12 border-t border-gray-200">
            <Container.Grid className="grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <Logo />
                <Typography.Body className="mb-4 mt-4">
                  Cultivating nature's finest blooms with passion, precision,
                  and sustainable practices. From our farms to your heart.
                </Typography.Body>
                <p className="text-sm text-gray-500">
                  © 2024 Lamiflora Limited. All rights reserved. Terms of
                  Service | Privacy Policy | Cookie Policy
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">
                  Quick Links
                </h4>
                <ul className="space-y-2 text-gray-600">
                  {quickLinks.map((link: QuickLink, index: number) => (
                    <li key={index}>
                      <button
                        onClick={() => onNavigate?.(link.index)}
                        className="hover:text-blue-600 transition-colors"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-gray-800">
                  Contact Info
                </h4>
                <ul className="space-y-2 text-gray-600">
                  <li>+254 722 667 154</li>
                  <li>info@lamiflora.co.ke</li>
                  <li>Nyandarua County, Kenya</li>
                </ul>
              </div>
            </Container.Grid>
          </div>
        </Container.Content>
      </Container.Section>
    </div>
  );
};

export default ContactSection;
