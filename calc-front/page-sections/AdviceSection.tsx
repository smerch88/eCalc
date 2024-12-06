import AdvicesList from "@/components/AdvicesList";

export const AdviceSection = () => {
  return (
    <section>
      <div className="px-4 pb-[35px] pt-6 md:pt-0 md:pb-0 md:px-0 md:container md:py-10">
        <h2 className="text-2xl pr-10 md:pr-0 md:text-4xl font-semibold mb-4 md:mb-6">
          Поради про енергозбереження на основі ваших даних
        </h2>
        <p className="text-lg pr-10 md:pr-0 md:text-2xl mb-12">
          Ці поради допоможуть вам оптимізовано використовувати електроенергію
          вдома та заощаджувати кошти.
        </p>
        <div className="p-4 md:p-12 bg-white rounded-[30px] md:rounded-[40px]">
          <AdvicesList />
        </div>
      </div>
    </section>
  );
};
