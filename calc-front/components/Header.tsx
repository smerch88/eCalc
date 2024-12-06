import Image from "next/image";
import Link from "next/link";

import CityAutoDetect from "./CityAutoDetect";
import { menuItems } from "@/lib/menuItems";

export const Header = () => {
  return (
    <header className="hidden lg:inline-block bg-background_header/50 absolute top-6 left-0 right-0 py-6 px-24 rounded-xlg">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center leading-none"
          prefetch={false}
        >
          <Image
            width={241}
            height={60}
            src="/icons/logo-lg.svg"
            alt="Logotype"
          />
        </Link>

        <nav className="flex gap-x-4">
          {menuItems.map((item) => (
            <Link
              className="px-6 py-4 text-lg font-normal text-primary"
              href={item?.href || ""}
              key={item.href}
            >
              {item?.title}
            </Link>
          ))}
        </nav>

        <CityAutoDetect />
      </div>
    </header>
  );
};
