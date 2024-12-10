import Image from "next/image";

import { Button } from "./button";
import Icon from "../../public/icons/info.svg";

export default function Tooltip() {
  return (
    <div className="relative p-6 w-[496px] rounded-xlg bg-[#f0f0f0]">
      <span className="absolute top-5 right-5">
        <Image
          width={24}
          height={24}
          src={Icon}
          alt="Logotype"
        />
      </span>
      <h3 className="mb-6 font-bold text-2xl text-primary">
        Пояснення показників
      </h3>
      <ul className="flex flex-col gap-y-6 mb-10 font-normal text-2xl text-primary">
        <li>
          luctus tortor. id sodales. Quisque vitae eget nulla, Lorem odio quam
          non Nunc laoreet nec
        </li>
        <li>
          luctus tortor. id sodales. Quisque vitae eget nulla, Lorem odio quam
          non Nunc laoreet nec
        </li>
      </ul>

      <Button
        className="w-[100%] font-normal text-2xl rounded-2xl text-white"
        size="lg"
        disabled
      >
        Зрозуміло
      </Button>
    </div>
  );
}






