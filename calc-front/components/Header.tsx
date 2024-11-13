import Image from "next/image";
import Link from "next/link";
import Logo from "../public/logo.png";
import { menuItems } from "@/lib/menuItems";

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
        </div>
      </div>
    </header>
  );
};
