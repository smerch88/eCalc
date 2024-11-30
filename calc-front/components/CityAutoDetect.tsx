"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // Ваш кастомний Input компонент.
import CitySelector from "@/components/CitySelect";
import { useUnifiedStore } from "@/stores/stores"; // Імпорт zustand store.

const CityAutoDetect = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модального вікна.
  const location = useUnifiedStore((state) => state.location); // Поточне місто зі стору.
  const setLocation = useUnifiedStore((state) => state.setLocation); // Функція для оновлення міста.

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
            setLocation(detectedCity); // Оновлення стану через zustand.
          });
      },
      () => {
        // Якщо геолокація недоступна, fallback на IP API
        fetch("https://ipapi.co/json/")
          .then((res) => res.json())
          .then((data) => {
            const detectedCity = data.city || "Невідомо";
            setLocation(detectedCity); // Оновлення стану через zustand.
          });
      }
    );
  }, [setLocation]);

  return (
    <div className="relative w-1/2">
      {/* Поле вводу */}
      <Input
        type="text"
        placeholder="Місто"
        value={location} // Значення з zustand store.
        readOnly
        onClick={() => setIsModalOpen(true)} // Відкрити модальне вікно.
        className="w-full bg-white px-6 py-6 pr-14 rounded-xl text-lg cursor-pointer"
      />

      {/* Кнопка для вибору вручну */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-lg bg-gray-200 text-black px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
      >
        &#8743;
      </button>

      {/* Модальне вікно */}
      {isModalOpen && (
        <CitySelector
          onClose={() => setIsModalOpen(false)} // Закриття модального вікна.
        />
      )}
    </div>
  );
};

export default CityAutoDetect;
