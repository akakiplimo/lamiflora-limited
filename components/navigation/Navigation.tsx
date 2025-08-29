import { NavigationProps } from "@/lib/types";
import Logo from "./Logo";
import Button from "../ui/Button";
import { Menu, X } from "lucide-react";

const Navigation: React.FC<NavigationProps> = ({
  currentSection,
  sectionNames,
  onNavigate,
  isMenuOpen,
  setIsMenuOpen,
  scrollProgress,
}) => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-1">
          {sectionNames.map((name: string, index: number) => (
            <Button.Nav
              key={index}
              onClick={() => onNavigate(index)}
              active={currentSection === index}
            >
              {name}
            </Button.Nav>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          {sectionNames.map((name: string, index: number) => (
            <Button.Nav
              key={index}
              onClick={() => onNavigate(index)}
              active={currentSection === index}
              mobile
            >
              {name}
            </Button.Nav>
          ))}
        </div>
      )}
    </div>

    {/* Section Scroll Progress Bar */}
    <div className="h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  </nav>
);

export default Navigation;
