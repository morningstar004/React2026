import React, { useId } from "react";

const Select = ({ options, lable, className, ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full ">
      {lable && <lable htmlFor={id} className='inline-block mb-1 pl-1'></lable>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`${className} px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-green-50 duration-200 border border-grey-200
        w-full`}
      >
        {options?.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.forwardRef(Select);
