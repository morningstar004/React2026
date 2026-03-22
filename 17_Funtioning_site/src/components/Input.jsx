import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { lable, type = "text", className = " ", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {lable && <lable className='inline-block mb-1 pl-1' htmlfor={id}>{lable}</lable>}
      <input 
      type={type}
      className={`px-3 py-2 rounded-lg focus:ring-[#FFAFCC] hover: border-[#FFC8DD]  focus:ring-opacity-30 bg-white text-black outline-none focus:bg-green-50 duration-200 border border-grey-200
        w-full${className}`}
        ref={ref}
        {...props}
        id={id}
       />
    </div>
  )
});

export default Input;
