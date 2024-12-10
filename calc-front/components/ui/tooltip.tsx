import Image from "next/image";

import { Button } from "./button";
import Icon from "../../public/icons/info.svg";

interface TooltipProps {
  title?: string;
  text?: string;
  buttonText?: string;
  onClose: () => void;
}

export default function Tooltip({
  title,
  text,
  buttonText,
  onClose,
}: TooltipProps) {
  return (
    <div className="">
      <span className="absolute top-5 right-5">
        <Image width={24} height={24} src={Icon} alt="Logotype" />
      </span>
      <h3 className="mb-6 font-bold text-2xl text-primary">{title}</h3>
      <p className="flex flex-col gap-y-6 mb-10 font-normal text-2xl text-primary">
        {text}
      </p>

      {buttonText && onClose && (
        <Button
          className="w-[100%] font-normal text-2xl rounded-2xl text-white"
          size="lg"
          onClick={onClose}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}

