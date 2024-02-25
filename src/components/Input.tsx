import { Placeholder } from "@phosphor-icons/react";
import React, { FC, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  htmlFor?: string;
  label?: string;
}

const Input: FC<InputProps> = ({
  type,
  htmlFor,
  label,
  id,
  name = "",
  placeholder = "name@example",
}) => {
  const {
    register,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const hasErrors = !!errors?.[name];
  const isValid = !!dirtyFields?.[name] && !hasErrors;
  return (
    <div className="mb-5">
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...register(name)}
        placeholder={placeholder}
      />
      {errors?.[name] && (
        <div className={"text-red-500 py-1 text-sm "}>
          {errors?.[name]?.message as any}
        </div>
      )}
    </div>
  );
};

export default Input;
