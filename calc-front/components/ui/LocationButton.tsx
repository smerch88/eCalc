"use client"; //вказує next.js що компонент рендериться на стороні клієнта, що дасть можливість використовувати onClick

import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export const LocationButton: React.FC = () => {
  const [location, setLocation] = useState<string>("");

  const geoFindMe = async () => {
    setLocation("Визначення місцезнаходження...");

    function success(position: GeolocationPosition) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.address) {
            const { city, country } = data.address;
            setLocation(`${city || "невідомо"}, ${country || "невідомо"}`);
          } else {
            setLocation("Не вдалось отримати місцязнаходження");
          }
        })
        .catch(() => {
          setLocation("Помилка при отриманні даних місцязнаходження");
        });
    }

    function error() {
      setLocation("Неможливо отримати ваше місцезнаходження");
    }

    if (!navigator.geolocation) {
      setLocation("Geolocation не підтримується вашим браузером");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  return (
    <div className="relative w-1\2">
      <Input
        id="location"
        type="text"
        placeholder="Місто"
        value={location}
        readOnly
        className="w-full bg-white px-6 py-6 pr-14 rounded-xl text-lg"
      />
      <button
        onClick={geoFindMe}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-lg bg-gray-200 text-black px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
      >
        &#8743;
      </button>
    </div>
  );
};
