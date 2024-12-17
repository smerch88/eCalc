'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Navbar } from '@/components/Navbar';
import CityAutoDetect from './CityAutoDetect';
import Logo from '../public/header/logo.png';
import Icon from '../public/icons/hamburger.svg';

export const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="absolute left-0 right-0 py-4 xl:py-6 backdrop-blur-md rounded-b-xmd xl:rounded-b-xlg bg-background_header/50">
            <div className="container flex items-center justify-between">
                <Link href="/" className="flex items-center" prefetch={false}>
                    <Image
                        width={38}
                        height={39}
                        src={Logo}
                        quality={100}
                        priority
                        alt="e-Calculator logotype"
                        className="block lg:hidden mr-2"
                    />
                    <span className="block lg:hidden text-xl font-bold text-black leading-6">
                        Калькулятор
                    </span>

                    <Image
                        width={46}
                        height={40}
                        src={Logo}
                        quality={100}
                        priority
                        alt="e-Calculator logotype"
                        className="hidden lg:block mr-2"
                    />
                    <span className="hidden lg:block text-xl font-bold text-black leading-6">
                        Калькулятор
                    </span>
                </Link>

                <div className="hidden lg:block">
                    <Navbar />
                </div>

                <div className="hidden lg:block">
                    <CityAutoDetect />
                </div>

                <button onClick={toggleMenu} className="text-primary focus:outline-none lg:hidden">
                    <Image width={24} height={24} src={Icon} alt="Mobile navigation menu" />
                </button>
            </div>

            {isOpen && (
                <div className="container lg:hidden">
                    <div className="flex justify-center items-center mt-4 mb-6">
                        <CityAutoDetect />
                    </div>
                    <Navbar isMobile={true} closeMenu={() => setIsOpen(false)} />
                </div>
            )}
        </header>
    );
};
