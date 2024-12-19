import { FC, ChangeEvent } from 'react';
import Image, { StaticImageData } from 'next/image';

interface SelectOption {
    label: string;
    value: string;
    image?: StaticImageData | string;
}

interface SelectInputProps {
    id?: string;
    options: SelectOption[];
    selectedValue: string;
    className?: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    dropdownClassName?: string;
    selectClassName?: string;
}

export const SelectInput: FC<SelectInputProps> = ({
    options,
    selectedValue,
    onChange,
    className = '',
    isOpen,
    setIsOpen,
    dropdownClassName = '',
    selectClassName = '',
}) => {
    const handleSelectChange = (value: string) => {
        onChange({ target: { value } } as ChangeEvent<HTMLSelectElement>);
        setIsOpen(false);
    };

    const displayLabel =
        options.find(option => option.value === selectedValue)?.label || selectedValue;

    return (
        <div className={`relative ${className}`}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`cursor-pointer w-full h-12 px-4 xl:px-6 py-3 rounded-2xl bg-white text-base border border-black flex items-center justify-between ${selectClassName}`}
            >
                <span>{displayLabel}</span>

                <svg
                    className={`ml-2 w-6 h-6 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                    }`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        d="M6 9L12 15L18 9"
                        stroke="#191919"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {/* Випадаючий список */}
            {isOpen && (
                <div
                    className={`${
                        dropdownClassName || 'absolute'
                    } w-full mt-2 bg-white border border-black rounded-2xl shadow-lg z-10 text-sm`}
                >
                    {options.map(option => (
                        <div
                            key={option.value}
                            onClick={() => handleSelectChange(option.value)}
                            className="flex items-center px-4 xl:px-6 py-2 rounded-2xl hover:bg-gray-100 cursor-pointer"
                        >
                            {option.image && (
                                <div className="w-[45px] h-[52px] mr-3">
                                    <Image
                                        src={option.image}
                                        alt={option.label}
                                        className="object-cover"
                                    />
                                </div>
                            )}
                            <span>{option.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
