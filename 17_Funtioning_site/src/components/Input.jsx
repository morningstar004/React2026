import React from "react";
import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { lable, type = "text", className = " ", ...props },
  ref,
) {
  const ID = useId();
  return (
    <div className="w-full">
      {lable && <lable className='inline-block mb-1 pl-1' htmlfor={ID}>{lable}</lable>}
      <input 
      type={type}
      className={`px-2 py-2 rounded-lg bg-white text-black outline-none focus:bg-green-50 duration-200 border border-grey-200
        w-full${className}`}
        ref={ref}
        {...props}
        id={ID}
       />
    </div>
  )
});

export default Input;
