"use client";

import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

import { Button } from "../ui/button";

const BoilerComponent = () => {
  return (
    <div className="flex flex-row gap-16 text-2xl">
      <div className="w-7/12 flex-shrink-0 flex flex-col gap-12">
        <div>
          <label htmlFor="city-input">Тарифи за воду з міста:</label>
          <div className="relative mt-6">
            <Input
              id="city-input"
              type="text"
              placeholder="Місто"
              className="px-6 py-6 rounded-2xl text-lg"
            />
            <MapPin className="absolute right-4 top-1/2 transform -translate-y-1/2 h-4 w-4" />
          </div>
        </div>
        <div>
          <span>Який тариф на водопостачання використовуєте?</span>
          <div className="flex flex-row gap-12 text-lg mt-6">
            <div className="flex flex-row gap-6 items-center">
              <div className="relative">
                <Input
                  id="city-input"
                  type="text"
                  placeholder=""
                  className="px-6 py-6 rounded-2xl text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
                  грн/м³
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center">
              <div className="relative">
                <Input
                  id="city-input"
                  type="text"
                  placeholder=""
                  className="px-6 py-6 rounded-2xl text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
                  грн/м³
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <span>Який тариф на водопостачання використовуєте?</span>
          <div className="flex flex-row gap-12 text-lg mt-6">
            <div className="flex flex-row gap-6 items-center">
              <label htmlFor="city-input">Холодна</label>
              <div className="relative">
                <Input
                  id="city-input"
                  type="text"
                  placeholder=""
                  className="px-6 py-6 rounded-2xl text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
                  грн/м³
                </span>
              </div>
            </div>
            <div className="flex flex-row gap-6 items-center">
              <label htmlFor="city-input">Гаряча</label>
              <div className="relative">
                <Input
                  id="city-input"
                  type="text"
                  placeholder=""
                  className="px-6 py-6 rounded-2xl text-lg"
                />
                <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
                  грн/м³
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-12">
          <div>
            <label htmlFor="city-input">Початкова температура</label>
            <div className="relative mt-6">
              <Input
                id="city-input"
                type="text"
                placeholder=""
                className="px-6 py-6 rounded-2xl text-lg"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
                °C
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="city-input">Цільова температура</label>
            <div className="relative mt-6">
              <Input
                id="city-input"
                type="text"
                placeholder=""
                className="px-6 py-6 rounded-2xl text-lg"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
                °C
              </span>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="city-input">Який ККД бойлера?</label>
          <div className="relative mt-6">
            <Input
              id="city-input"
              type="text"
              placeholder=""
              className="px-6 py-6 rounded-2xl text-lg"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 whitespace-nowrap text-lg">
              °C
            </span>
          </div>
        </div>
      </div>
      <div>
        <p>Бойлер</p>
        <p>50000.00 грн/міс</p>
        <p>на 10 000 грн менше</p>
        <p>на 6 000 кг CO₂ менше в місяць</p>
        <p>проти</p>
        <p>Центральне водопостачання</p>
        <p>60000.00 грн/міс</p>
        <Button>Розрахувати</Button>
      </div>
    </div>
  );
};

export default BoilerComponent;
