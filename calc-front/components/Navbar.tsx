"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../public/header/logo-sm.png";
import Icon from "../public/header/hamburger.png";
import CityAutoDetect from "./CityAutoDetect";
import { menuItems } from "@/lib/menuItems";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="absolute top-header_spacing left-0 right-0 backdrop-blur-md rounded-3xl bg-background_header/50 lg:hidden">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center" prefetch={false}>
          <Image width={217} height={73} src={Logo} alt="Logotype" />
        </Link>

        <button
          onClick={toggleMenu}
          className="text-primary focus:outline-none"
        >
          <Image width={24} height={24} src={Icon} alt="Menu" />
        </button>
      </div>

      {isOpen && (
        <div className="container">
          <div className="flex justify-center items-center my-4 mb-6">
            <CityAutoDetect />
          </div>

          <ul className="flex items-center justify-between mb-6">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href || "#"}
                  className="py-4 text-base font-normal text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

