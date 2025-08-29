import Image from "next/image";
import { SectionProps } from "@/lib/types";
import Container from "../ui/Container";
import Typography from "../ui/Typography";
import Button from "../ui/Button";
import { ChevronDown } from "lucide-react";

const HomeSection: React.FC<SectionProps> = ({
  sectionRef,
  onNavigate,
  isVisible,
  translateX,
  opacity,
}) => (
  <div
    className={`absolute inset-0 transition-none ${
      !isVisible ? "pointer-events-none" : ""
    }`}
    style={{
      transform: `translateX(${translateX}%)`,
      opacity: opacity,
    }}
  >
    <Container.Section ref={sectionRef}>
      <div className="min-h-full flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-yellow-50"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 py-20">
          <div className="mb-8">
            <Image
              src="/lamiflora_logo.png"
              alt="Lamiflora Logo"
              width={150}
              height={50}
              className="object-contain mx-auto mb-4"
            />
            <Typography.Heading1 className="mb-6">
              <span className="text-blue-600">Lamiflora</span> Limited
            </Typography.Heading1>
            <Typography.Subtitle className="mb-8 max-w-3xl mx-auto">
              Cultivating nature's finest blooms with passion, precision, and
              sustainable practices. From our farms to your heart.
            </Typography.Subtitle>
            <Button.Primary onClick={() => onNavigate?.(1)} className="mr-4">
              Explore Our Flowers
            </Button.Primary>
            <div className="inline-block text-sm text-gray-500 mt-4">
              Scroll down to continue ↓
            </div>
          </div>
          <div className="animate-bounce mt-12">
            <ChevronDown
              size={32}
              className="text-blue-600 mx-auto cursor-pointer"
              onClick={() => onNavigate?.(1)}
            />
          </div>
        </div>
      </div>
    </Container.Section>
  </div>
);

export default HomeSection;
