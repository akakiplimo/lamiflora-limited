import Image from "next/image";

const Logo: React.FC = () => (
  <Image
    src="/lamiflora_logo.png"
    alt="Lamiflora Logo"
    width={150}
    height={50}
    className="h-18 w-auto"
  />
);

export default Logo;
