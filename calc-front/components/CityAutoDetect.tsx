"use client"; // Вказує Next.js, що компонент рендериться на стороні клієнта.

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"; // Припустимо, у вас є кастомний Input компонент.
import CitySelector from "./CitySelector"; // Імпорт модального компонента для вибору міста.

const CityAutoDetect = () => {
  const [city, setCity] = useState("Київ"); // За замовчуванням - Київ.
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модального вікна.

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

  const handleModalOpen = () => {
    setIsModalOpen(true); // Відкрити модальне вікно.
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity); // Оновити вибраний город.
    setIsModalOpen(false); // Закрити модальне вікно.
  };

  return (
    <div className="relative w-1/2">
      {/* Поле вводу */}
      <Input
        type="text"
        placeholder="Місто"
        value={city}
        readOnly
        onClick={handleModalOpen} // При кліку - відкрити модальне вікно.
        className="w-full bg-white px-6 py-6 pr-6 rounded-xl text-lg cursor-pointer"
      />

      {/* Кнопка для вибору вручну */}
      <button
        onClick={handleModalOpen}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-lg bg-gray-200 text-black px-3 py-2 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
      >
        &#8743;
      </button>

      {/* Модальне вікно */}
      {isModalOpen && (
        <CitySelector
          selectedCity={city}
          onCitySelect={handleCitySelect}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default CityAutoDetect;
