import React, { useState, useEffect } from "react";
import { useField } from "formik";

interface Category {
  _id: string;
  name: string;
}

interface CustomMultiSelectProps {
  name: string; // Name of the field within Formik
  categories: Category[]; // All available categories
  label: string;
  selectedIds: string[]; // Initial selected category/collection IDs
}

const CustomMultiSelect: React.FC<CustomMultiSelectProps> = ({
  name,
  categories,
  label,
  selectedIds = [],
}) => {
  const [field, , helpers] = useField(name);
  const [inputValue, setInputValue] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { setValue } = helpers;

  useEffect(() => {
    setValue(selectedIds);
  }, [setValue]);

  // Filter categories based on the input value and exclude selected ones
  const filteredCategories = categories?.filter(
    (category) =>
      category.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !field?.value?.includes(category._id)
  );

  // Add category to the selected list
  const selectCategory = (category: Category) => {
    if (!field.value.includes(category._id)) {
      setValue([...field.value, category._id]);
    }
    setInputValue("");
    setIsDropdownVisible(false);
  };

  // Remove category from the selected list
  const removeCategory = (id: string) => {
    setValue(field.value.filter((categoryId: string) => categoryId !== id));
  };

  return (
    <div className="relative">
      <label className="block text-gray-700 text-sm font-semibold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsDropdownVisible(true);
        }}
        onFocus={() => setIsDropdownVisible(true)}
        onBlur={() => setTimeout(() => setIsDropdownVisible(false), 100)} // Small delay to handle click event
        onKeyDown={(e) => {
          if (e.key === "Enter" && filteredCategories.length > 0) {
            selectCategory(filteredCategories[0]);
            e.preventDefault();
          }
        }}
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {(field.value || []).map((selectedId: string) => {
          const category = categories.find((cat) => cat._id === selectedId);
          return (
            <span
              key={selectedId}
              className="bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 flex items-center gap-1"
            >
              {category?.name}
              <button
                type="button"
                onClick={() => removeCategory(selectedId)}
                className="text-blue-500 hover:text-blue-700"
              >
                &times;
              </button>
            </span>
          );
        })}
      </div>
      {isDropdownVisible && filteredCategories.length > 0 && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg max-h-48 overflow-y-auto z-50">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              onClick={() => selectCategory(category)}
              className="cursor-pointer hover:bg-gray-100 p-2"
            >
              {category.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMultiSelect;
