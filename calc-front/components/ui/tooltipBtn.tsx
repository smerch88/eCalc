import { useRef, useState } from 'react';
import Image from 'next/image';

import Tooltip from './tooltip';
import Icon from '../../public/icons/info.svg';

interface TooltipBtnProps {
    title?: string;
    text?: string;
    buttonText?: string;
}

export default function TooltipBtn({ title, text, buttonText }: TooltipBtnProps) {
    const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
    const [interactionType, setInteractionType] = useState<'click' | 'hover'>('hover');

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsTooltipVisible(true);
    };

    const hideTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setIsTooltipVisible(false);
        }, 200);
    };

    const handleInteraction = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (event.type === 'mouseenter') {
            setInteractionType('hover');
            showTooltip();
        } else if (event.type === 'mouseleave') {
            if (interactionType !== 'click') {
                hideTooltip();
            }
        } else if (event.type === 'click') {
            setInteractionType('click');
            showTooltip();
        }
    };

    const handleButtonClick = () => {
        setIsTooltipVisible(false);
    };

    return (
        <div className="relative">
            <span
                className="absolute top-[2px] xl:top-[3px] right-0"
                onMouseEnter={handleInteraction}
                onMouseLeave={handleInteraction}
                onClick={handleInteraction}
            >
                <Image
                    width={24}
                    height={24}
                    src={Icon}
                    alt="Icon displaying additional information"
                />
            </span>

            {isTooltipVisible && (
                <>
                    {interactionType === 'click' && (
                        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40" />
                    )}

                    <div
                        className={`absolute ${
                            interactionType === 'click' ? 'bg-white' : 'bg-tooltip'
                        } p-6 w-[320px] xl:w-[496px] rounded-xmd xl:rounded-xlg top-8 z-50 left-1/2 transform -translate-x-1/2 
                        xl:left-auto xl:right-[-3.5%] xl:translate-x-0`}
                    >
                        <Tooltip
                            title={title}
                            text={text}
                            buttonText={interactionType === 'click' ? buttonText : undefined}
                            onClose={handleButtonClick}
                        />
                    </div>
                </>
            )}
        </div>
    );
}
