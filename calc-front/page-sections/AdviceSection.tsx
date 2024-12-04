import AdvicesList from "@/components/AdvicesList";

export const AdviceSection = () => {
  return (
    <section>
      <div className="container py-10">
        <h2 className="text-4xl font-semibold mb-6">
          Поради про енергозбереження на основі ваших даних
        </h2>
        <p className="text-2xl mb-12">
          Ці поради допоможуть вам оптимізовано використовувати електроенергію
          вдома та заощаджувати кошти.
        </p>
        <div className="p-12 bg-white rounded-[40px]">
          <AdvicesList />
        </div>
      </div>
    </section>
  );
};
