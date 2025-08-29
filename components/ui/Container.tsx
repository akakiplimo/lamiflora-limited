const Container = {
  Main: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`h-screen overflow-hidden bg-white relative ${
        className || ""
      }`}
    >
      {children}
    </div>
  ),

  Section: ({
    children,
    className,
    ref,
  }: {
    children: React.ReactNode;
    className?: string;
    ref?: (el: HTMLElement | null) => void;
  }) => (
    <section ref={ref} className={`h-full overflow-y-auto ${className || ""}`}>
      {children}
    </section>
  ),

  Content: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 ${
        className || ""
      }`}
    >
      {children}
    </div>
  ),

  Grid: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={`grid ${className || ""}`}>{children}</div>,
};

export default Container;
