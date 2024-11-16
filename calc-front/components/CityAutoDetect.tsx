"use client"; //вказує next.js що компонент рендериться на стороні клієнта, що дасть можливість використовувати onClick

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
// import {CitySelector} from './CitySelector';
const CityAutoDetect = () => {
  const [city, setCity] = useState("Невідомо");

  useEffect(() => {
    // Спроба визначити місцезнаходження через Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        )
          .then((res) => res.json())
          .then((data) => {
            const detectedCity =
              data.address.city || data.address.town || "Невідомо";
            setCity(detectedCity);
          });
      },
      () => {
        // Якщо геолокація недоступна, fallback на IP API
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((data) => {
            const detectedCity = data.city || "Невідомо";
            setCity(detectedCity);
          });
      }
    );
  }, []);

  return (
    <div className="relative w-1\2">
      <Input
        // id="location"
        type="text"
        placeholder="Місто"
        value={city}
        // readOnly
        // onChange={}
        className="w-full bg-white px-6 py-6 pr-14 rounded-xl text-lg"
      />
      <button
        // onClick={geoFindMe}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-lg bg-gray-200 text-black px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
      >
        &#8743;
      </button>
    </div>
  );
};

export default CityAutoDetect;
