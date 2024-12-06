import {
  CalculatorsTab,
  CalculatorsSelect,
} from "../components/CalculatorsTab";

export const CalculatorSection = () => {
  return (
    <section id="calculator-section">
      <div className="pt-6 px-4 md:container md:py-10">
        <h2 className="text-2xl md:text-4xl font-bold  md:font-semibold pb-4 md:pb-6">
          Ваш калькулятор
        </h2>
        <p className="text-lg md:text-2xl pr-6 md:pr-0 mb-4 md:mb-12">
          Обирайте прилад, який хочете розрахувати порівнюючи з центральною
          мережею та визначайте, що для вас є вигідніше.
        </p>
        <div className="block md:hidden">
          <CalculatorsSelect />
        </div>
        <div className="hidden md:block">
          <CalculatorsTab />
        </div>
      </div>
    </section>
  );
};
