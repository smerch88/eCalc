import { FeedbackForm } from '@/components/FeedbackForm';

export const FeedbackSection = () => {
    return (
        <div className="flex flex-col px-4 xl:flex-row my-6 xl:my-[80px] xl:gap-12 xl:container">
            <div className="flex flex-col justify-center w-full xl:max-w-[455px]">
                <h2 className="text-2xl xl:text-4xl font-semibold mb-4 xl:mb-6">
                    Зв’яжіться з нами!
                </h2>
                <p className="text-lg xl:text-2xl mb-12">
                    Напішить нам запитання або проблему, з якою ми вам допоможемо.
                </p>
            </div>
            <FeedbackForm />
        </div>
    );
};
