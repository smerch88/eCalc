"use client"; //вказує next.js що компонент рендериться на стороні клієнта, що дасть можливість використовувати onClick

import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import { menuItems } from "@/lib/menuItems";

import { Input } from "@/components/ui/input";
import { geoFindMe } from "@/lib/location";

export const Header = () => {
  return (
    <header className="flex justify-between bg-background_header/50 absolute top-0 left-0 right-0 py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center" prefetch={false}>
            <Image
              src={Logo}
              alt="Logo"
              width={235}
              height={80}
              className="w-[235px] h-20 mr-2 object-contain"
            />
          </Link>
          <nav className="flex gap-4">
            {menuItems.map((item) => (
              <Link
                className="px-6 py-4 text-lg"
                href={item?.href || ""}
                key={item.href}
              >
                {item?.title}
              </Link>
            ))}
          </nav>
          <Input
            id="location"
            type="text"
            placeholder="Місто"
            value=""
            onChange={geoFindMe}
            className="w-1/4 bg-white px-6 py-6 rounded-xl text-lg"
          />
          <button id="find-me" onClick={geoFindMe}>
            &#8743;
          </button>
        </div>
      </div>
    </header>
  );
};
