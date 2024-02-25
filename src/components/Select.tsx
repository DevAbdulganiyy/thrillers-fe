import React from "react";
import { useFormContext } from "react-hook-form";

function Select({ items, id, htmlFor, name, label }: any) {
  const {
    register,
    formState: { dirtyFields, errors },
  } = useFormContext();

  const hasErrors = !!errors?.[name];
  const isValid = !!dirtyFields?.[name] && !hasErrors;

  return (
    <>
      <label>{label}</label>
      <select
        id={id}
        {...register(name)}
        className="bg-gray-50 mt-3 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="">{label}</option>
        {items?.map((item: any) => (
          <option key={item?.id} value={item?.id}>
            {item?.firstName} {item?.lastName}
          </option>
        ))}
      </select>
    </>
  );
}

export default Select;
