const Input = {
  Text: ({
    placeholder,
    className,
  }: {
    placeholder: string;
    className?: string;
  }) => (
    <input
      type="text"
      placeholder={placeholder}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
        className || ""
      }`}
    />
  ),

  Email: ({
    placeholder,
    className,
  }: {
    placeholder: string;
    className?: string;
  }) => (
    <input
      type="email"
      placeholder={placeholder}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 ${
        className || ""
      }`}
    />
  ),

  TextArea: ({
    placeholder,
    rows = 6,
    className,
  }: {
    placeholder: string;
    rows?: number;
    className?: string;
  }) => (
    <textarea
      rows={rows}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300 resize-none ${
        className || ""
      }`}
    />
  ),
};

export default Input;
