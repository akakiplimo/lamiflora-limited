import { SectionProps, SustainabilityPractice } from "@/lib/types";
import { Leaf } from "lucide-react";
import Container from "../ui/Container";
import Typography from "../ui/Typography";
import Card from "../ui/Card";

const SustainabilitySection: React.FC<SectionProps> = ({
  sectionRef,
  isVisible,
  translateX,
  opacity,
}) => {
  const sustainabilityPractices: SustainabilityPractice[] = [
    {
      icon: <Leaf className="text-white" size={28} />,
      title: "Organic Practices",
      description:
        "We use natural, organic growing methods that protect soil health and promote biodiversity in our farming practices.",
      color: "from-green-500 to-green-600",
    },
    {
      icon: "💧",
      title: "Water Conservation",
      description:
        "Our advanced irrigation systems minimize water waste while ensuring optimal growing conditions for all our flower varieties.",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: "🌱",
      title: "Carbon Neutral",
      description:
        "We've implemented renewable energy solutions and carbon offset programs to maintain a net-zero carbon footprint.",
      color: "from-yellow-500 to-yellow-600",
    },
  ];

  interface EnvironmentalStat {
    value: string;
    label: string;
    color: string;
  }

  const environmentalStats: EnvironmentalStat[] = [
    { value: "50%", label: "Water Savings", color: "text-green-600" },
    { value: "100%", label: "Renewable Energy", color: "text-blue-600" },
    { value: "Zero", label: "Chemical Pesticides", color: "text-yellow-600" },
    { value: "95%", label: "Waste Recycled", color: "text-purple-600" },
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
      <Container.Section ref={sectionRef} className="bg-white">
        <Container.Content>
          <div className="text-center mb-16">
            <Typography.Heading2>
              Our Commitment to Sustainability
            </Typography.Heading2>
            <Typography.Subtitle className="max-w-3xl mx-auto">
              We believe in nurturing not just beautiful flowers, but also our
              planet for future generations
            </Typography.Subtitle>
          </div>

          <Container.Grid className="grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {sustainabilityPractices.map(
              (practice: SustainabilityPractice, index: number) => (
                <Card.Sustainability key={index} {...practice} />
              )
            )}
          </Container.Grid>

          <Card.Base gradient="from-green-50 to-blue-50" className="p-8 mb-16">
            <Typography.Heading3 className="mb-6 text-center">
              Our Environmental Impact
            </Typography.Heading3>
            <Container.Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {environmentalStats.map(
                (stat: EnvironmentalStat, index: number) => (
                  <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                )
              )}
            </Container.Grid>
          </Card.Base>

          <div className="text-center text-gray-500 text-sm">
            Scroll down to get in touch with us ↓
          </div>
        </Container.Content>
      </Container.Section>
    </div>
  );
};

export default SustainabilitySection;
