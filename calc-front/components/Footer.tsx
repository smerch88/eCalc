"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import Logo from "../public/header/logo-lg.png";
import { footerItems } from "@/lib/menuItems";

export const Footer = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const sections = isMobile ? [...footerItems].reverse() : footerItems;

  return (
    <footer className=" pt-4 pb-6 bg-background_header/50 rounded-xlg xl:px-24 xl:py-10">
      <div className="container flex flex-col xl:flex-row xl:justify-between">
        <Link
          href="/"
          className="flex items-center justify-center mb-8 xl:py-12 xl:mb-0"
          prefetch={false}
        >
          <Image width={241} height={60} src={Logo} alt="Logotype" />
        </Link>

        <nav className="flex flex-col gap-y-6 xl:flex-row xl:gap-x-20">
          {sections.map((section, index) => (
            <div key={index} className="flex flex-col">
              <h2 className="mb-6 px-6 font-normal text-lg text-footer_title xl:p-0">
                {section.title}
              </h2>
              <ul className="flex flex-col gap-y-6">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link
                      className="py-6 px-6 font-normal text-lg text-primary xl:py-4"
                      href={link.href || "#"}
                    >
                      {link.subtitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
};

