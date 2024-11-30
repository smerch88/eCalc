import cn from "classnames";
import { Button } from "../components/ui/button";

export const HeroSection = () => {
  return (
    <div
      className={cn(
        "hero",
        "flex flex-col justify-center h-[860px] bg-cover bg-bottom bg-no-repeat"
      )}
    >
      <div className="container">
        <div className="flex flex-col gap-16">
          <h1 className="text-5xl font-bold max-w-[650px]">
            Контролюй споживання електроенергії легко
          </h1>
          <Button className="rounded-2xl py-6 text-2xl w-max" size="lg">
            Розрахувати
          </Button>
        </div>
      </div>
    </div>
  );
};