export default function Button({
  children,
  type = "button",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
