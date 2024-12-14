import React, { FC, ReactNode, useRef } from 'react';

interface DropdownProps {
    isOpen?: boolean;
    onToggle?: () => void;
    label: string;
    content: ReactNode;
    className?: string;
}

export const Dropdown: FC<DropdownProps> = ({ isOpen, label, content, className }) => {
    const detailsRef = useRef<HTMLDetailsElement>(null);

    const closeDropdown = () => {
        if (detailsRef.current) {
            detailsRef.current.removeAttribute('open');
        }
    };

    return (
        <details
            // open={isOpen}
            className={`group border-none rounded-2xl overflow-hidden bg-gray-100 ${className}`}
            // onClick={(e) => {
            //   e.preventDefault();
            //   onToggle();
            // }}
        >
            <summary
                className={`cursor-pointer border border-primary rounded-2xl flex items-center justify-between h-14 p-4 bg-white ${className}`}
            >
                {label}
                <svg
                    width="24"
                    height="25"
                    viewBox="0 0 24 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`transform transition-transform duration-700 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                >
                    <path
                        d="M6 9.5L12 15.5L18 9.5"
                        stroke="#191919"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </summary>
            <div className={`p-4 ${className}`}>
                {content}
                <button onClick={closeDropdown} />
            </div>
        </details>
    );
};
