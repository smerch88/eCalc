import cn from "classnames";
import { Button } from "../components/ui/button";

export const HeroSection = () => {
  return (
    <div
      className={cn(
        "hero",
        "h-[744px] bg-cover bg-no-repeat bg-center-right mt-[100px] border-y border-solid border-black shadow-shadow",
        "md:mt-0 md:border-none md:shadow-none",
        "xl:h-[860px] xl:bg-bottom"
      )}
    >
      <div className="container flex flex-col h-[744px] pt-[60px] md:pt-[178px] pb-[97px] xl:h-[860px] xl:py-[317px]">
        <h1 className="w-[240px] mb-auto text-[32px] font-bold leading-10 xl:w-[651px] xl:text-5xl">
          Контролюй споживання електроенергії легко
        </h1>

        <Button
          className="w-[100%] py-6 rounded-2xl text-lg font-normal text-white md:w-max xl:text-2xl"
          size="lg"
        >
          Розрахувати
        </Button>
      </div>
    </div>
  );
};

