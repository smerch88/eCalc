import { cn } from "@/lib/utils";
import { ComponentProps, forwardRef, ReactNode } from "react";

interface CalcInputProps extends ComponentProps<"input"> {
  label?: ReactNode;
  unit?: string;
}

const CalcInput = forwardRef<HTMLInputElement, CalcInputProps>(
  ({ className, type, label, unit, ...props }, ref) => {
    return (
      <div className="mt-6 xl:mt-0">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-lg xl:text-2xl text-primary mb-4 xl:mb-6"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "appearance-none border border-solid border-primary focus:border-primary rounded-2xl h-14 w-full pl-4 md:pl-6 pr-8 md:pr-12 py-4 bg-transparent outline-none font-normal text-base md:text-lg text-primary",
              className
            )}
            ref={ref}
            {...props}
          />
          {unit && (
            <span className="absolute right-4 xl:right-6 top-1/2 transform -translate-y-1/2 font-normal text-base xl:text-lg text-primary">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }
);

CalcInput.displayName = "CalcInput";

export { CalcInput };
