import { SectionProps } from "@/lib/types";
import Container from "../ui/Container";
import Typography from "../ui/Typography";
import Card from "../ui/Card";
import { Award } from "lucide-react";

const AboutSection: React.FC<SectionProps> = ({
  sectionRef,
  isVisible,
  translateX,
  opacity,
}) => {
  interface TeamRole {
    icon: string;
    title: string;
    color: string;
    iconColor: string;
  }

  const teamRoles: TeamRole[] = [
    {
      icon: "👨‍🌾",
      title: "Expert Horticulturists",
      color: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: "🔬",
      title: "Quality Control",
      color: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: "📋",
      title: "Farm Management",
      color: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
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
        className="bg-gradient-to-br from-blue-50 to-yellow-50"
      >
        <Container.Content>
          <Container.Grid className="grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <Typography.Heading2 className="mb-6">
                About Lamiflora Limited
              </Typography.Heading2>
              <Typography.Body className="mb-6">
                Founded with a passion for cultivating nature&apos;s most
                beautiful creations, Lamiflora Limited has been at the forefront
                of premium flower farming for over a decade. Our
                state-of-the-art facilities and expert horticulturists ensure
                that every bloom meets the highest standards of quality.
              </Typography.Body>
              <Typography.Body className="mb-8">
                We specialize in growing a diverse range of flowers, from
                vibrant alstroemeria to cheerful chrysanthemums and aromatic
                eucalyptus. Each variety is carefully tended to ensure optimal
                beauty, longevity, and freshness for our valued customers.
              </Typography.Body>
              <Container.Grid className="grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    10+
                  </div>
                  <div className="text-gray-600">Years of Excellence</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    50+
                  </div>
                  <div className="text-gray-600">Flower Varieties</div>
                </div>
              </Container.Grid>
            </div>
            <div className="relative">
              <Card.Base className="p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Award className="text-white" size={28} />
                  </div>
                  <Typography.Heading3>Our Mission</Typography.Heading3>
                </div>
                <Typography.Body className="text-center">
                  To bring joy and beauty to people&apos;s lives through our
                  carefully cultivated flowers, while maintaining the highest
                  standards of sustainability and environmental responsibility.
                </Typography.Body>
              </Card.Base>
            </div>
          </Container.Grid>

          <Card.Base className="p-8 shadow-lg mb-16">
            <Typography.Heading3 className="mb-6 text-center">
              Our Expert Team
            </Typography.Heading3>
            <Typography.Body className="text-center max-w-3xl mx-auto mb-8">
              Behind every beautiful bloom is a team of dedicated professionals
              who bring years of experience and passion to flower cultivation.
              Our horticulturists, farm managers, and quality control
              specialists work together to ensure exceptional results.
            </Typography.Body>
            <Container.Grid className="grid-cols-1 md:grid-cols-3 gap-6">
              {teamRoles.map((role: TeamRole, index: number) => (
                <div key={index} className="text-center">
                  <div
                    className={`w-16 h-16 ${role.color} rounded-full mx-auto mb-3 flex items-center justify-center`}
                  >
                    <span className={`${role.iconColor} text-2xl`}>
                      {role.icon}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-800">{role.title}</h4>
                </div>
              ))}
            </Container.Grid>
          </Card.Base>

          <div className="text-center text-gray-500 text-sm">
            Scroll down to learn about our sustainability practices ↓
          </div>
        </Container.Content>
      </Container.Section>
    </div>
  );
};

export default AboutSection;
