import { ContactsSection } from '@/page-sections/ContactsSection';
import { FeedbackSection } from '@/page-sections/FeedbackSection';

export default function Contacts() {
    return (
        <main className="flex flex-col flex-grow items-center justify-between">
            <ContactsSection />
            <FeedbackSection />
        </main>
    );
}
