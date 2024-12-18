import { ContactsSection } from '@/page-sections/ContactsSection';
import { FeedbackSection } from '@/page-sections/FeedbackSection';

export default function Contacts() {
    return (
        <main className="flex flex-col flex-grow items-center justify-between">
            <div className="px-4 xl:container pt-28 xl:pt-44">
                <h1 className="text-[32px] font-bold leading-10 mb-6 xl:mb-12 xl:text-5xl">
                    Контакти
                </h1>
                <p className="text-lg xl:text-2xl xl:pr-0 mb-16 xl:mb-24">
                    Ми завжди раді отримати від вас повідомлення! Залишайте свої запитання або
                    коментарі, і ми обов&apos;язково відповімо.
                </p>
            </div>
            <ContactsSection />
            <FeedbackSection />
        </main>
    );
}
