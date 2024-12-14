import Link from 'next/link';
import { menuItems } from '@/lib/menuItems';

type NavbarProps = {
    isMobile?: boolean;
    closeMenu?: () => void;
};

export const Navbar = ({ isMobile = false, closeMenu }: NavbarProps) => {
    return (
        <nav>
            {isMobile ? (
                <h1 className="sr-only">Mobile Menu</h1>
            ) : (
                <h1 className="sr-only">Navigation Menu</h1>
            )}
            <ul
                className={`flex ${
                    isMobile ? 'items-center flex-row justify-between mb-6' : 'gap-x-4'
                }`}
            >
                {menuItems.map(item => (
                    <li key={item.href}>
                        <Link
                            href={item.href || '#'}
                            className={`${
                                isMobile ? 'py-4 text-base' : 'xl:px-6 xl:py-4 text-lg'
                            } font-normal text-primary`}
                            onClick={isMobile && closeMenu ? closeMenu : undefined}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
