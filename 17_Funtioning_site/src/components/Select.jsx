import React, { useId } from "react";

const Select = React.forwardRef(function Select({ options, label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full ">
      {label && <label htmlFor={id} className="mb-1 block pl-1 text-sm font-medium text-slate-700">{label}</label>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 ${className}`}
      >
        {options?.map((option) => (
          <option value={typeof option === "string" ? option : option.value} key={typeof option === "string" ? option : option.value}>
            {typeof option === "string" ? option : option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;
