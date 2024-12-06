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

        // Використання OpenStreetMap API для визначення міста
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=uk`
        )
          .then((res) => res.json())
          .then((data) => {
            const detectedCity =
              data.address.city || data.address.town || "Невідомо";
            setLocation(detectedCity); // Оновлення стану через zustand.
          })
          .catch(() => {
            console.error("Помилка при запиті до OpenStreetMap API");
            fallbackToIPAPI(setLocation); // Перехід до резервного методу.
          });
      },
      () => {
        console.warn("Геолокація недоступна. Використовуємо резервний метод.");
        fallbackToIPAPI(setLocation); // Перехід до резервного методу.
      }
    );
  }, [setLocation]);

  // Резервний метод для отримання міста через IP API
  const fallbackToIPAPI = (setLocation: (city: string) => void) => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detectedCity = data.city || "Київ";
        setLocation(detectedCity); // Оновлення стану через zustand.
      })
      .catch(() => {
        console.error("Помилка при запиті до IP API");
        setLocation("Київ"); // Fallback до стандартного значення.
      });
  };

  return (
    <div className="relative">
      {/* Поле вводу */}
      <Input
        type="text"
        placeholder="Місто"
        value={location} // Значення з zustand store.
        readOnly
        onClick={() => setIsModalOpen(true)} // Відкрити модальне вікно.
        className="w-[200px] h-[56px] bg-white px-6 py-6 pr-14 rounded-xl text-lg cursor-pointer"
      />

      {/* Кнопка для вибору вручну */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="absolute top-4 right-6 w-[24px] h-[24px] transform -translate-y-1/2 text-lg text-black px-3 py-2 rounded-lg transition-colors"
      >
        &#8744;
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
