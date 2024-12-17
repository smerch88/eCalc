import Link from 'next/link';
import Image from 'next/image';

import { contacts } from '@/lib/contacts';

export const ContactsSection = () => {
    return (
        <div className="px-4 xl:container mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {contacts.map((contact, index) => (
                    <li
                        key={index}
                        className="flex flex-col bg-white rounded-xlg shadow-md p-6 h-60 xl:h-72"
                    >
                        <div className="flex items-center mb-8">
                            <Link
                                href={contact.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center mr-2"
                            >
                                <span
                                    className={`flex justify-center lg:hidden items-center w-10 h-10 rounded-2xl ${
                                        index === 0 ? 'bg-black' : 'bg-blue-500'
                                    }`}
                                >
                                    <Image
                                        width={16}
                                        height={16}
                                        src={contact.icon}
                                        alt={contact.alt}
                                    />
                                </span>
                                <span
                                    className={`hidden justify-center lg:flex items-center w-11 h-11 rounded-2xl ${
                                        index === 0 ? 'bg-black' : 'bg-blue-500'
                                    }`}
                                >
                                    <Image
                                        width={24}
                                        height={24}
                                        src={contact.icon}
                                        alt={contact.alt}
                                    />
                                </span>
                            </Link>
                            <strong className="text-lg xl:text-2xl text-primary">
                                {contact.title}
                            </strong>
                        </div>
                        <p className="text-lg xl:text-2xl font-normal text-primary">
                            {contact.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
