import { CalculatorsTab } from "../components/CalculatorsTab";

export const CalculatorSection = () => {
  return (
    <section id="calculator-section">
      <div className="container py-10">
        <h2 className="text-4xl font-semibold pb-6">Ваш калькулятор</h2>
        <p className="text-2xl mb-12">
          Обирайте прилад, який хочете розрахувати порівнюючи з центральною
          мережею та визначайте, що для вас є вигідніше.
        </p>
        <CalculatorsTab />
      </div>
    </section>
  );
};
