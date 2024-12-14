'use client';

import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { sendFormToTelegramBot } from '@/lib/sendForm';
import { Button } from './ui/button';
import { Input } from './ui/input';

import { Check, XCircle, Loader } from 'react-feather';

interface FormData {
    name: string;
    email: string;
    message: string;
}

export const FeedbackForm: FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(false);

    const onSubmit: SubmitHandler<FormData> = async formData => {
        setIsLoading(true);
        setIsSent(false);
        setError(false);

        try {
            const payload = {
                ...formData,
                createdAt: new Date().toLocaleString(),
            };
            await sendFormToTelegramBot(payload);
            setIsSent(true);
            reset();
        } catch (err) {
            console.error(err);
            setError(true);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                setIsSent(false);
                setError(false);
            }, 4000);
        }
    };

    const errorClass = 'border-red-500 text-red-500';

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-[40px] p-4 xl:p-12 w-full"
        >
            <div className="flex flex-col gap-6 xl:flex-row">
                {/* Name Input */}
                <div>
                    <label className="text-lg xl:text-2xl" htmlFor="name">
                        ПІБ
                    </label>
                    <Input
                        type="text"
                        id="name"
                        placeholder="Іванов Іван Іванович"
                        {...register('name', { required: "Це поле є обов'язковим" })}
                        className={`h-[54px] rounded-2xl mt-4 xl:mt-6 ${
                            errors.name ? errorClass : ''
                        }`}
                    />
                    {errors.name && (
                        <span className="text-red-500 text-sm">{errors.name.message}</span>
                    )}
                </div>
                {/* Email Input */}
                <div>
                    <label className="text-lg xl:text-2xl" htmlFor="email">
                        Email
                    </label>
                    <Input
                        type="email"
                        id="email"
                        placeholder="ivanov123@gmail.com"
                        {...register('email', { required: "Це поле є обов'язковим" })}
                        className={`h-[54px] rounded-2xl mt-4 xl:mt-6 ${
                            errors.email ? errorClass : ''
                        }`}
                    />
                    {errors.email && (
                        <span className="text-red-500 text-sm">{errors.email.message}</span>
                    )}
                </div>
            </div>

            {/* Message textarea-input */}
            <div className="flex flex-col my-6">
                <label className="text-lg xl:text-2xl" htmlFor="message">
                    Ваше запитання
                </label>
                <textarea
                    id="message"
                    maxLength={400}
                    placeholder="Вітаю..."
                    {...register('message', { required: "Це поле є обов'язковим" })}
                    className={`border border-black xl:text-lg rounded-2xl px-6 py-4 mt-4 xl:mt-6 ${
                        errors.message ? errorClass : ''
                    }`}
                />
                {errors.message && (
                    <span className="text-red-500 text-sm">{errors.message.message}</span>
                )}
            </div>

            {/* Submit Button */}
            <Button
                type="submit"
                size="xl"
                className={`w-full text-lg xl:text-2xl ${
                    isSent ? 'bg-green-500 hover:bg-green-400' : ''
                }`}
            >
                {isLoading ? (
                    <Loader className="animate-spin" />
                ) : isSent ? (
                    <Check className="text-white" />
                ) : error ? (
                    <XCircle className="text-red-500" />
                ) : (
                    'Відправити'
                )}
            </Button>

            {/* Success/Error Messages */}
            {isSent && <div className="text-green-500 text-sm">Форма успішно надіслана!</div>}
            {error && <div className="text-red-500 text-sm">Сталася помилка при надсиланні.</div>}
        </form>
    );
};
