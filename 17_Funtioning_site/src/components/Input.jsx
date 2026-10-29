import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label className="mb-1 block pl-1 text-sm font-medium text-slate-700" htmlFor={id}>{label}</label>}
      <input
      type={type}
      className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 ${className}`}
        ref={ref}
        {...props}
        id={id}
       />
    </div>
  )
});

export default Input;
