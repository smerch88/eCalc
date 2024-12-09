"use client";
import cn from "classnames";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import { ComponentType, useState } from "react";
import Boiler from "../public/calculatorDevices/Boiler.png";
import Light from "../public/calculatorDevices/Light.png";
import Microwave from "../public/calculatorDevices/Microwave.png";
import WM from "../public/calculatorDevices/WM.png";

// import { Dropdown } from "./ui/dropdown";
import { SelectInput } from "./ui/selectInput";

const LightComponent = dynamic(() => import("./calculators/LightComponent"));
const BoilerComponent = dynamic(() => import("./calculators/BoilerComponent"));
const WMComponent = dynamic(() => import("./calculators/WMComponent"));
const MWComponent = dynamic(() => import("./calculators/MWComponent"));

interface Device {
  id: string;
  name: string;
  image: StaticImageData;
  component: ComponentType;
}

const devices: Device[] = [
  {
    id: "light",
    name: "Освітлення",
    image: Light,
    component: LightComponent,
  },
  {
    id: "boiler",
    name: "Бойлер",
    image: Boiler,
    component: BoilerComponent,
  },
  {
    id: "wm",
    name: "Пральна машина",
    image: WM,
    component: WMComponent,
  },
  {
    id: "mw",
    name: "Мікрохвильовка",
    image: Microwave,
    component: MWComponent,
  },
];

export const CalculatorsTab = () => {
  const [activeTab, setActiveTab] = useState<string | undefined>("boiler");

  const renderContent = () => {
    const activeDevice = devices.find((device) => device.id === activeTab);
    if (activeDevice && activeDevice.component) {
      const ActiveComponent = activeDevice.component;
      return <ActiveComponent />;
    }
    return <p>Виберіть пристрій, щоб побачити деталі.</p>;
  };

  return (
    <>
      <div className="flex flex-row">
        {devices.map((item) => (
          <div
            key={item.id}
            className={cn(
              activeTab !== "mw" && activeTab === item.id
                ? "decorated-right"
                : ""
            )}
          >
            <div
              className={cn(
                activeTab !== "light" && activeTab === item.id
                  ? "decorated-left"
                  : "",
                activeTab === item.id ? "bg-white" : "",
                "flex flex-col items-center pt-16 pb-12 rounded-tl-[40px] rounded-tr-[40px]"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Image src={item.image} alt={item.name} />
              <h3 className="text-2xl mt-6">{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          activeTab === "light" && "!rounded-tl-[0px]",
          activeTab === "mw" && "!rounded-tr-[0px]",
          "p-4 md:p-12 md:bg-white rounded-[40px] md:h-[1100px]"
        )}
      >
        {renderContent()}
      </div>
    </>
  );
};

// export const CalculatorsSelect = () => {
//   const [activeTab, setActiveTab] = useState<string>("");

//   const activeDevice = devices.find((device) => device.id === activeTab);

//   const renderContent = () => {
//     if (activeDevice && activeDevice.component) {
//       const ActiveComponent = activeDevice.component;
//       return <ActiveComponent />;
//     }
//     return (
//       <div className="bg-white rounded-b-[30px] text-center pb-4">
//         <p>Виберіть пристрій, щоб побачити деталі.</p>
//       </div>
//     );
//   };

//   return (
//     <>
//       <div className="bg-white px-4 pb-6 rounded-t-[30px]">
//         <p className="py-4 text-lg">Прилад для розрахунку:</p>
//         <Dropdown
//           className="bg-white"
//           label={activeDevice?.name || "Пристрій"}
//           content={
//             <div className="space-y-4 bg-white">
//               {devices.map((device) => (
//                 <div
//                   key={device.id}
//                   className={cn(
//                     "flex items-center p-2 cursor-pointer hover:bg-gray-100 rounded-lg",
//                     activeTab === device.id && "bg-gray-100"
//                   )}
//                   onClick={(e) => {
//                     setActiveTab(device.id);
//                     // Закриваємо дропдаун через ref
//                     const details =
//                       (e.currentTarget.closest(
//                         "details"
//                       ) as HTMLDetailsElement) || null;
//                     if (details) details.removeAttribute("open");
//                   }}
//                 >
//                   <div className="w-[45px] h-[52px]">
//                     <Image
//                       src={device.image}
//                       alt={device.name}
//                       className="object-cover"
//                     />
//                   </div>
//                   <span className="ml-4">{device.name}</span>
//                 </div>
//               ))}
//             </div>
//           }
//         />
//       </div>
//       <div>{renderContent()}</div>
//     </>
//   );
// };

export const CalculatorsSelect = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeDevice = devices.find((device) => device.id === activeTab);

  const renderContent = () => {
    if (activeDevice && activeDevice.component) {
      const ActiveComponent = activeDevice.component;
      return <ActiveComponent />;
    }
    return (
      <div className="bg-white rounded-b-[30px] text-center pb-4">
        <p>Виберіть пристрій, щоб побачити деталі.</p>
      </div>
    );
  };

  return (
    <>
      <div className="bg-white px-4 pb-6 rounded-t-[30px]">
        <p className="py-4 text-lg">Прилад для розрахунку:</p>
        <SelectInput
          options={devices.map((device) => ({
            label: device.name,
            value: device.id,
            image: device.image,
          }))}
          selectedValue={activeTab || "Пристрій"}
          onChange={(e) => setActiveTab(e.target.value)}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          className="bg-white"
          // dropdownClassName="block border-none shadow-none"
        />
      </div>
      <div>{renderContent()}</div>
    </>
  );
};
