'use client';

import { FC, useEffect, useState } from 'react';
import { Button } from './ui/button';

export const InfoPopUp: FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const isPopupUsed = localStorage.getItem('popupUsed') === 'true';
        if (isPopupUsed) return;

        const handleScroll = () => {
            if (window.scrollY > 680) {
                setIsVisible(true);
                document.body.classList.add('overflow-hidden');
                window.removeEventListener('scroll', handleScroll);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        document.body.classList.remove('overflow-hidden');
        localStorage.setItem('popupUsed', 'true');
    };

    return (
        <div
            className={`fixed inset-0 z-20 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
        >
            {/* Фон */}
            <div
                className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out ${
                    isVisible ? 'opacity-50' : 'opacity-0'
                }`}
            ></div>

            <div
                className={`relative z-20 w-[300px] h-[200px] p-4 xl:p-6 rounded-[30px] xl:rounded-[40px] bg-white flex flex-col items-center justify-between gap-4 transform transition-all duration-1000 ease-in-out ${
                    isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
                <p className="text-center">
                    ⚠️ Сайт ще знаходиться у розробці. Деякі функції можуть бути недоступні.
                </p>

                <Button
                    className="w-full font-normal text-lg xl:text-xl text-white"
                    size="xl"
                    onClick={handleClose}
                >
                    Зрозуміло
                </Button>
            </div>
        </div>
    );
};
