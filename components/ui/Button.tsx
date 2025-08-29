const Button = {
  Primary: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
        className || ""
      }`}
    >
      {children}
    </button>
  ),

  Secondary: ({
    children,
    onClick,
    className,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`w-12 h-12 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
        className || ""
      }`}
    >
      {children}
    </button>
  ),

  Nav: ({
    children,
    onClick,
    active,
    mobile = false,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    active: boolean;
    mobile?: boolean;
  }) => (
    <button
      onClick={onClick}
      className={`${
        mobile
          ? "block w-full text-left px-4 py-3 text-lg hover:bg-blue-50 transition-colors"
          : "px-4 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50"
      } ${
        active
          ? "text-blue-600 font-semibold bg-blue-50"
          : "text-gray-700 hover:text-blue-600"
      }`}
    >
      {children}
    </button>
  ),
};

export default Button;
