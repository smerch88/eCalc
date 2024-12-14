import AdvicesList from '@/components/AdvicesList';

export const AdviceSection = () => {
    return (
        <section>
            <div className="px-4 mt-6 xl:mt-[80px] xl:container">
                <h2 className="text-2xl pr-10 xl:pr-0 xl:text-4xl font-semibold mb-4 xl:mb-6">
                    Поради про енергозбереження на основі ваших даних
                </h2>
                <p className="text-lg pr-10 xl:text-2xl mb-4 xl:mb-12">
                    Ці поради допоможуть вам оптимізовано використовувати електроенергію вдома та
                    заощаджувати кошти.
                </p>
                <div className="p-4 xl:p-12 bg-white rounded-[30px] xl:rounded-[40px]">
                    <AdvicesList />
                </div>
            </div>
        </section>
    );
};
