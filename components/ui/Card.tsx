import {
  ContactDetail,
  Feature,
  Product,
  SustainabilityPractice,
} from "@/lib/types";
import { Leaf } from "lucide-react";

const Card = {
  Base: ({
    children,
    className,
    gradient,
  }: {
    children: React.ReactNode;
    className?: string;
    gradient?: string;
  }) => (
    <div
      className={`${
        gradient ? `bg-gradient-to-br ${gradient}` : "bg-white"
      } rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        className || ""
      }`}
    >
      {children}
    </div>
  ),

  Product: ({ emoji, title, description, status, gradient }: Product) => (
    <Card.Base
      gradient={gradient}
      className="overflow-hidden transform hover:-translate-y-2"
    >
      <div
        className={`h-64 bg-gradient-to-br ${gradient.replace(
          "50",
          "200"
        )} flex items-center justify-center`}
      >
        <div className="text-6xl">{emoji}</div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-blue-600 font-semibold">{status}</span>
          <Leaf className="text-green-500" size={20} />
        </div>
      </div>
    </Card.Base>
  ),

  Feature: ({ icon, title, description }: Feature) => (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
        <span className="text-white text-xl">{icon}</span>
      </div>
      <h4 className="font-semibold text-gray-800 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  ),

  Contact: ({ icon: Icon, title, details }: ContactDetail) => (
    <div className="flex items-start space-x-4">
      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="text-blue-600" size={20} />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        {details.map((detail: string, index: number) => (
          <p key={index} className="text-gray-600">
            {detail}
          </p>
        ))}
      </div>
    </div>
  ),

  Sustainability: ({
    icon,
    title,
    description,
    color,
  }: SustainabilityPractice) => (
    <div className="text-center group">
      <div
        className={`w-16 h-16 bg-gradient-to-br ${color} rounded-full mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
      >
        {typeof icon === "string" ? (
          <span className="text-white text-2xl">{icon}</span>
        ) : (
          icon
        )}
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  ),
};

export default Card;
