import { CalculatorsTab, CalculatorsSelect } from '../components/CalculatorsTab';

export const CalculatorSection = () => {
    return (
        <section id="calculator-section">
            <div className=" px-4 xl:container mt-6 xl:mt-[80px]">
                <h2 className="text-2xl xl:text-4xl font-bold  xl:font-semibold pb-4 xl:pb-6">
                    Ваш калькулятор
                </h2>
                <p className="text-lg xl:text-2xl pr-6 xl:pr-0 mb-4 xl:mb-12">
                    Обирайте прилад, який хочете розрахувати порівнюючи з центральною мережею та
                    визначайте, що для вас є вигідніше.
                </p>
                <div className="block xl:hidden">
                    <CalculatorsSelect />
                </div>
                <div className="hidden xl:block">
                    <CalculatorsTab />
                </div>
            </div>
        </section>
    );
};
