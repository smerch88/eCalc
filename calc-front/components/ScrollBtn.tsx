'use client';
import { Link as Scroll } from 'react-scroll';
import { Button } from '../components/ui/button';
export const ScrollBtn = () => {
    return (
        <Scroll to="calculator-section" smooth={true} offset={10} duration={1500}>
            <Button
                className="w-full h-[56px] py-4 px-[62.5px] rounded-2xl text-lg font-normal text-white xl:w-[282px] xl:h-[61px] xl:text-2xl"
                size="lg"
            >
                Розрахувати
            </Button>
        </Scroll>
    );
};
