const Typography = {
  Heading1: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h1
      className={`text-5xl md:text-6xl font-bold text-gray-800 leading-tight ${
        className || ""
      }`}
    >
      {children}
    </h1>
  ),

  Heading2: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h2 className={`text-4xl font-bold text-gray-800 mb-4 ${className || ""}`}>
      {children}
    </h2>
  ),

  Heading3: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <h3 className={`text-2xl font-bold text-gray-800 ${className || ""}`}>
      {children}
    </h3>
  ),

  Body: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <p className={`text-lg text-gray-600 ${className || ""}`}>{children}</p>
  ),

  Subtitle: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <p className={`text-xl text-gray-600 ${className || ""}`}>{children}</p>
  ),
};

export default Typography;
