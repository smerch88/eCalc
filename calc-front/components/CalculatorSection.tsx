"use client";
import Image, { StaticImageData } from "next/image";
import Boiler from "../public/calculatorDevices/Boiler.png";
import Light from "../public/calculatorDevices/Light.png";
import Microwave from "../public/calculatorDevices/Microwave.png";
import WM from "../public/calculatorDevices/WM.png";
import { useState } from "react";
import dynamic from "next/dynamic";
import cn from "classnames";

const LightComponent = dynamic(() => import("./calculators/LightComponent"));
const BoilerComponent = dynamic(() => import("./calculators/BoilerComponent"));
const WMComponent = dynamic(() => import("./calculators/WMComponent"));
const MWComponent = dynamic(() => import("./calculators/MWComponent"));

interface Device {
  id: string;
  name: string;
  image: StaticImageData;
  component: React.ComponentType;
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

export const Calculator: React.FC = () => {
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
          "p-12 bg-white rounded-[40px] h-[1100px]"
        )}
      >
        {renderContent()}
      </div>
    </>
  );
};
