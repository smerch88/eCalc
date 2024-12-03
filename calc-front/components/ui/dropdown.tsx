import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isOpen: boolean;
  toggleDropdown: () => void;
  option: string;
}

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ label, isOpen, toggleDropdown, option, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("relative w-full ", className)} {...props}>
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between w-full h-[61px] px-6 py-4 bg-white rounded-2xl border border-black"
        >
          <span className="text-gray-700 font-medium">{label}</span>
        </button>

        {isOpen && (
          <ul className="w-full bg-gray-100 rounded-b-2xl">
            <li className="px-6 py-3 text-gray-700 rounded-2xl">{option}</li>
          </ul>
        )}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";

export default Dropdown;
