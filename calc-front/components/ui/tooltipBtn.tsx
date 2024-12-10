import { MouseEventHandler } from "react";
import Image from "next/image";
import Icon from "../../public/icons/info.svg";

interface TooltipBtnProps {
  onMouseEnter?: MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: MouseEventHandler<HTMLButtonElement>;
}

export default function TooltipBtn({
  onMouseEnter,
  onMouseLeave,
}: TooltipBtnProps) {
  return (
    <div>
      <button
        className="absolute top-0 right-0"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        type="button"
      >
        <Image
          className=""
          width={24}
          height={24}
          src={Icon}
          alt="Icon displaying additional information"
        />
      </button>
    </div>
  );
}


