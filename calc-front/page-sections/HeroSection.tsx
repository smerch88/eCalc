'use client';

import { Link as Scroll } from 'react-scroll';

import { Button } from '../components/ui/button';
import cn from 'classnames';

export const HeroSection = () => {
    return (
        <div
            className={cn(
                'hero',
                'h-[744px] max-h-[100lvh] bg-cover bg-no-repeat bg-center-right mt-14',
                'xl:mt-0 xl:border-none xl:shadow-none',
                'xl:h-[860px] xl:bg-bottom'
            )}
        >
            <div className="container flex flex-col h-[744px] max-h-[100lvh] pt-16 pb-24 xl:h-[860px] xl:py-80">
                <h1 className="w-64 mb-auto text-[32px] font-bold leading-10 xl:mb-12 xl:w-[651px] xl:text-5xl">
                    Контролюй споживання електроенергії легко
                </h1>

                <Scroll to="calculator-section" smooth={true} offset={250} duration={1500}>
                    <Button
                        className="w-full py-6 rounded-2xl text-lg font-normal text-white xl:w-max xl:text-2xl"
                        size="lg"
                    >
                        Розрахувати
                    </Button>
                </Scroll>
            </div>
        </div>
    );
};
