import { FC, ChangeEvent } from "react";

interface SelectInputProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  className?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const SelectInput: FC<SelectInputProps> = ({
  options,
  selectedValue,
  onChange,
  className = "",
  isOpen,
  setIsOpen,
}) => {
  const handleSelectChange = (value: string) => {
    onChange({ target: { value } } as ChangeEvent<HTMLSelectElement>);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer w-full h-14 px-4 py-3 rounded-2xl bg-white border border-black text-base xl:text-lg flex items-center justify-between"
      >
        <span>
          {options.find((option) => option.value === selectedValue)?.label}
        </span>
        <svg
          className="ml-2 w-5 h-5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Випадаючий список */}
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-black rounded-2xl shadow-lg z-10">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelectChange(option.value)}
              className="px-4 py-2 rounded-2xl hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
