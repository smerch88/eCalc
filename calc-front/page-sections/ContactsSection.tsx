import cn from 'classnames';
import Link from 'next/link';

export const ContactsSection = () => {
    return (
        <div className={cn('mt-40')}>
            <div className="px-4 xl:container">
                <h1 className="text-[32px] font-bold leading-10 xl:mb-12 xl:text-5xl">Контакти</h1>
                <p className="text-lg xl:text-2xl xl:pr-0 mb-4 xl:mb-12">
                    Ми завжди раді отримати від вас повідомлення! Залишайте свої запитання або
                    коментарі, і ми обов&apos;язково відповімо.
                </p>
                <h2 className="text-2xl xl:text-4xl font-bold xl:font-semibold pb-4 xl:pb-6">
                    Зв&apos;яжіться з нами
                </h2>
                <ul className="text-lg xl:text-2xl">
                    <li>
                        <strong>Електронна пошта:</strong>{' '}
                        <Link href="mailto:info@yourproject.com" className="text-blue-500">
                            support@e-calc.tech
                        </Link>
                    </li>
                    <li>
                        <strong>LinkedIn (Founder):</strong>{' '}
                        <Link
                            href="https://www.linkedin.com/in/arsenii-maksymenko"
                            className="text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Перейти до профілю
                        </Link>
                    </li>
                    <li>
                        <strong>LinkedIn (Дизайнер):</strong>{' '}
                        <Link
                            href="https://www.linkedin.com/in/svitlana-synytsia/"
                            className="text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Перейти до профілю дизайнера
                        </Link>
                    </li>
                    {/* <li>
                        <strong>LinkedIn (Розробник):</strong>{' '}
                        <Link
                            href="https://www.linkedin.com/in/developer-linkedin"
                            className="text-blue-500"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Перейти до профілю розробника
                        </Link>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};
