import { Feature, Product, SectionProps } from "@/lib/types";
import Container from "../ui/Container";
import Typography from "../ui/Typography";
import Card from "../ui/Card";

const ProductsSection: React.FC<SectionProps> = ({
  sectionRef,
  isVisible,
  translateX,
  opacity,
}) => {
  const products: Product[] = [
    {
      emoji: "🌺",
      title: "Premium Alstroemeria",
      description:
        "Vibrant pink blooms with striking yellow centers, perfect for elegant arrangements and special occasions.",
      status: "Fresh Cut Available",
      gradient: "from-pink-50 to-yellow-50",
    },
    {
      emoji: "🌼",
      title: "Button Chrysanthemums",
      description:
        "Cheerful yellow pompom-style flowers that add warmth and texture to any floral display.",
      status: "Bulk Orders Available",
      gradient: "from-yellow-50 to-orange-50",
    },
    {
      emoji: "🌿",
      title: "Fresh Eucalyptus",
      description:
        "Aromatic silver-green foliage perfect for creating stunning backdrops and natural arrangements.",
      status: "Premium Quality",
      gradient: "from-green-50 to-blue-50",
    },
  ];

  const features: Feature[] = [
    {
      icon: "🌱",
      title: "Farm Fresh",
      description: "Harvested at peak freshness from our premium facilities",
    },
    {
      icon: "📦",
      title: "Fast Delivery",
      description: "Quick and careful handling from farm to your doorstep",
    },
    {
      icon: "💎",
      title: "Premium Quality",
      description: "Only the finest blooms make it to our customers",
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
      <Container.Section ref={sectionRef} className="bg-white">
        <Container.Content>
          <div className="text-center mb-16">
            <Typography.Heading2>Our Premium Products</Typography.Heading2>
            <Typography.Subtitle className="max-w-3xl mx-auto">
              Discover our carefully curated collection of fresh, vibrant
              flowers grown with love and expertise
            </Typography.Subtitle>
          </div>

          <Container.Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {products.map((product: Product, index: number) => (
              <Card.Product key={index} {...product} />
            ))}
          </Container.Grid>

          <Card.Base gradient="from-blue-50 to-yellow-50" className="p-8 mb-16">
            <Typography.Heading3 className="mb-4 text-center">
              Why Choose Our Flowers?
            </Typography.Heading3>
            <Container.Grid className="grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature: Feature, index: number) => (
                <Card.Feature key={index} {...feature} />
              ))}
            </Container.Grid>
          </Card.Base>

          <div className="text-center text-gray-500 text-sm">
            Scroll down to learn more about us ↓
          </div>
        </Container.Content>
      </Container.Section>
    </div>
  );
};

export default ProductsSection;
