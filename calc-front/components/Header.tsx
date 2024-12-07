import Image from "next/image";
import Link from "next/link";

import CityAutoDetect from "./CityAutoDetect";
import Logo from "../public/header/logo-lg.png";
import { menuItems } from "@/lib/menuItems";

export const Header = () => {
  return (
    <header className="hidden absolute top-6 left-0 right-0 py-6 backdrop-blur-md rounded-xlg bg-background_header/50 lg:inline-block">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center" prefetch={false}>
          <Image width={241} height={60} src={Logo} alt="Logotype" />
        </Link>

        <nav>
          <h1 className="sr-only">Navigation Menu</h1>
          <ul className="flex gap-x-4">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  className="px-6 py-4 text-lg font-normal text-primary"
                  href={item?.href || ""}
                >
                  {item?.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <CityAutoDetect />
      </div>
    </header>
  );
};

