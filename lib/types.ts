import { LucideIcon } from "lucide-react";

// TypeScript interfaces
export interface Product {
  emoji: string;
  image?: string;
  title: string;
  description: string;
  status: string;
  gradient: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface ContactDetail {
  icon: LucideIcon;
  title: string;
  details: string[];
}

export interface SustainabilityPractice {
  icon: React.ReactNode | string;
  title: string;
  description: string;
  color: string;
}

export interface NavigationProps {
  currentSection: number;
  sectionNames: string[];
  onNavigate: (index: number, direction?: "forward" | "backward") => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollProgress: number;
}

export interface SectionProps {
  sectionRef: (el: HTMLElement | null) => void;
  isVisible: boolean;
  translateX: number;
  opacity: number;
  onNavigate?: (index: number) => void;
}