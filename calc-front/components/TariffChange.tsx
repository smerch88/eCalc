import { ChangeEvent } from "react";
import { FormData } from "@/components/calculators/BoilerComponent";

interface Option {
  value: string;
  label: string;
  tariff: string;
  icon?: JSX.Element | JSX.Element[];
}

export const icons = {
  day: (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="9" cy="10" r="3.4" stroke="#191919" strokeWidth="1.2" />
      <path
        d="M9.04102 4.53577V1"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M9.04102 18.9999V15.4641"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M13.8648 7.46044L17 5.82153"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M4.13572 7.46044L1.00049 5.82153"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M0.999659 14.5317L4.13489 12.8928"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M17.0001 14.5317L13.8649 12.8928"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M11.9344 5.42736L12.9117 3.89282"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M4.8596 16.3558L5.83691 14.8213"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M12.9121 16.3561L11.9348 14.8215"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M16.3271 10.3213L14.5078 10.3213"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3.46312 10.3213L1.6438 10.3213"
        stroke="#191919"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M5.83754 5.42736L4.86023 3.89282"
        stroke="#191919"
        strokeLinecap="round"
      />
    </svg>
  ),
  night: (
    <svg
      width="19"
      height="17"
      viewBox="0 0 19 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.84305 1.86319C7.89675 1.71808 8.10198 1.71809 8.15567 1.86319L8.63946 3.1706C8.75762 3.48993 9.0094 3.74171 9.32874 3.85988L10.6361 4.34366C10.7813 4.39736 10.7812 4.60259 10.6361 4.65628L9.32874 5.14007C9.0094 5.25823 8.75762 5.51001 8.63946 5.82935L8.15567 7.13676C8.10198 7.28186 7.89675 7.28186 7.84305 7.13676L7.35927 5.82935C7.2411 5.51001 6.98932 5.25823 6.66999 5.14007L5.36258 4.65628C5.21747 4.60259 5.21748 4.39736 5.36258 4.34367L6.66999 3.85988C6.98932 3.74171 7.2411 3.48994 7.35927 3.1706L6.89034 2.99708L7.35927 3.1706L7.84305 1.86319Z"
        stroke="#191919"
      />
      <path
        d="M2.85752 7.82578L2.99999 7.44077L3.14245 7.82578C3.23361 8.07213 3.42784 8.26636 3.67419 8.35752L4.0592 8.49999L3.67419 8.64245C3.42784 8.73361 3.23361 8.92784 3.14245 9.17419L2.99999 9.5592L2.85752 9.17419C2.76636 8.92784 2.57213 8.73361 2.32578 8.64245L1.94077 8.49999L2.32578 8.35752C2.57213 8.26636 2.76636 8.07213 2.85752 7.82578ZM2.9062 9.81265C2.90622 9.8126 2.90624 9.81255 2.90626 9.8125L2.9062 9.81265ZM3.09371 9.8125C3.09373 9.81255 3.09375 9.8126 3.09377 9.81265L3.09371 9.8125ZM1.68732 8.4062C1.68737 8.40622 1.68741 8.40623 1.68746 8.40625L1.68732 8.4062Z"
        stroke="#191919"
      />
      <path
        d="M4.5 12.2337C5.1407 13.3487 6.05601 14.2802 7.15835 14.9391C8.2607 15.598 9.51323 15.9623 10.7961 15.9972C12.079 16.032 13.3494 15.7362 14.4857 15.1381C15.622 14.5399 16.5862 13.6595 17.2861 12.5809C17.9861 11.5023 18.3983 10.2617 18.4834 8.97771C18.5685 7.69373 18.3236 6.40933 17.7722 5.24737C17.2207 4.08541 16.3812 3.08475 15.3338 2.3411C14.2865 1.59745 13.0663 1.1357 11.7901 1C11.7901 1 14.1072 3.53207 14.5865 5.536C15.0658 7.53993 14.4857 9.45996 13.6081 10.4409C12.4083 11.7822 11.3087 12.4035 9.36856 12.5809C7.73795 12.7299 4.5 12.2337 4.5 12.2337Z"
        stroke="#191919"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export const options: Option[] = [
  {
    value: "single-zone",
    label: "Однозонний",
    tariff: "4.32",
    icon: icons.day,
  },
  {
    value: "two-zone",
    label: "Двозонний",
    tariff: "4.32         2.16",
    icon: [icons.night, icons.day],
  },
  { value: "three-zone", label: "Ввести вручну", tariff: "" },
];

export const TariffChange = (
  selectedCostPerKWh: string,
  setSelectedCostPerKWh: (value: string) => void,
  formData: FormData,
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  setIsValid: (value: boolean) => void,
  setErrorMessage: (value: string) => void
) => {
  const handleTariffChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    const selectedOption = options.find(
      (option) => option.value === event.target.value
    );
    const tariffValue = selectedOption?.tariff || "";
    const selectedIcon = selectedOption?.icon;

    setSelectedCostPerKWh(event.target.value);
    setIsValid(true);
    setErrorMessage("");

    if (event.target.value === "two-zone" && tariffValue) {
      const [dayRate, nightRate] = tariffValue.split(/\s+/).map(parseFloat);
      const nightRateFactor = nightRate / dayRate;

      setFormData((prev) => ({
        ...prev,
        costPerKWh: tariffValue,
        nightRateFactor: nightRateFactor,
        icon: selectedIcon,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        costPerKWh: tariffValue,
        nightRateFactor: 1,
        icon: selectedIcon,
      }));
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = event.target;

    setIsValid(true);
    setErrorMessage("");

    if (selectedCostPerKWh !== "three-zone") {
      setFormData((prev) => ({ ...prev, [id]: value }));
      return;
    }

    setFormData((prev) => ({ ...prev, costPerKWh: value }));

    const isNumberValid = /^(?!$)(\d+(\.\d{0,2})?)$/.test(value);
    if (!isNumberValid) {
      setIsValid(false);
      setErrorMessage("Введіть число до двох знаків після коми.");
    }
  };

  const getCalculationValue = (): number => {
    if (selectedCostPerKWh === "two-zone") {
      const tariffValues = formData.costPerKWh.trim().split(/\s+/);
      return parseFloat(tariffValues[0]) || 0;
    }

    return parseFloat(formData.costPerKWh) || 0;
  };

  return { handleTariffChange, handleInputChange, getCalculationValue };
};
