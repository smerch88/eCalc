import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const getDaysInCurrentMonth = (): number => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    return new Date(currentYear, currentMonth + 1, 0).getDate();
};

export const smoothScroll = (
    elementId: string,
    offset: number = 0,
    behavior: ScrollBehavior = 'smooth'
) => {
    const targetElement = document.getElementById(elementId);

    if (targetElement) {
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const scrollToPosition = elementPosition + offset;

        window.scrollTo({
            top: scrollToPosition,
            behavior,
        });
    }
};
