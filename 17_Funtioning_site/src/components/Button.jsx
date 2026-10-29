export default function Button({
  children,
  type = "button",
  bgColor = "",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg px-4 py-2 font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-60 ${textColor} ${bgColor || "bg-indigo-600 hover:bg-indigo-700"} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
