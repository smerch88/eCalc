"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CityAutoDetect from "./CityAutoDetect";
import { menuItems } from "@/lib/menuItems";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-header_spacing left-0 right-0 rounded-3xl bg-background_header/50 lg:hidden">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center" prefetch={false}>
          <Image
            width={217}
            height={73}
            src="/icons/logo-sm.svg"
            alt="Logotype"
          />
        </Link>

        <button
          onClick={toggleMenu}
          className="text-primary focus:outline-none"
        >
          <Image
            className="mr-4"
            width={24}
            height={24}
            src="/icons/hamburger.svg"
            alt="Menu"
          />
        </button>
      </div>

      {isOpen && (
        <>
          <div className="flex justify-center items-center my-4 mx-4 mb-6">
            <CityAutoDetect />
          </div>

          <ul className="flex items-center justify-between gap-x-2 mx-2 mb-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href || "#"}
                  className="p-4 text-base font-normal text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </nav>
  );
}
