import React, { useState } from "react";
import { useField, useFormikContext } from "formik";

interface Tag {
  idNo: number;
  name: string;
  color: string;
}

interface TagsInputProps {
  name: string;
  label: string; // Adding label to the interface
}

const getRandomColor = (): string => {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const TagsInput: React.FC<TagsInputProps> = ({ name, label }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const { setFieldValue, values } = useFormikContext<{
    [key: string]: Tag[];
  }>();
  const [field] = useField<Tag[]>(name);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && inputValue) {
      e.preventDefault();
      const newTags = [
        ...field.value,
        { idNo: Date.now(), name: inputValue, color: getRandomColor() },
      ];
      setFieldValue(name, newTags);
      setInputValue("");
    }
  };

  const handleRemoveTag = (idNo: number): void => {
    const updatedTags = field.value.filter((tag) => tag?.idNo !== idNo);
    setFieldValue(name, updatedTags);
  };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {label}
        </label>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleAddTag}
        placeholder="Type and press enter"
        className="border-2 border-gray-200 rounded p-2 text-sm w-full"
        id={name} // Associate the input with the label
      />
      <div className="flex flex-wrap gap-2 mt-2">
        {values[name].map((tag: Tag) => (
          <div
            key={tag.idNo}
            style={{ backgroundColor: tag.color }}
            className="flex items-center text-white text-sm px-2 py-1 rounded-full"
          >
            {tag.name}
            <button
              onClick={() => handleRemoveTag(tag.idNo)}
              className="text-white ml-2"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
