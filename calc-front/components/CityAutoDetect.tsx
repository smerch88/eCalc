"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"; // Ваш кастомний Input компонент.
import CitySelector from "@/components/CitySelect";
import { useUnifiedStore } from "@/stores/stores"; // Імпорт zustand store.

// Словник для перекладу міст
const cityTranslations: { [key: string]: string } = {
  Kharkiv: "Харків",
  Kyiv: "Київ",
  Odessa: "Одеса",
  Lviv: "Львів",
  Dnipro: "Дніпро",
  Zaporizhzhia: "Запоріжжя",
  Mykolaiv: "Миколаїв",
  Vinnytsia: "Вінниця",
};

const translateCity = (city: string) => {
  return cityTranslations[city] || city; // Якщо немає перекладу, повертається оригінальна назва
};

const CityAutoDetect = () => {
  // const { location, setLocation } = useUnifiedStore((state) => ({
  //   location: state.location,
  //   setLocation: state.setLocation,
  // })); // Один раз отримуємо значення та функцію оновлення зі стору
  const location = useUnifiedStore((state) => state.location); // Поточне місто зі стору.
  const setLocation = useUnifiedStore((state) => state.setLocation); // Функція для оновлення міста.
  const [isModalOpen, setIsModalOpen] = useState(false); // Стан модального вікна.

  useEffect(() => {
    // Викликаємо тільки IP API для отримання міста
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const detectedCity = translateCity(data.city || "Київ"); // Переклад міста
        setLocation(detectedCity); // Оновлення стану через zustand.
      })
      .catch(() => {
        console.error("Помилка при запиті до IP API");
        setLocation("Київ"); // Fallback до стандартного значення.
      });
  }, [setLocation]); // setLocation викликається лише один раз

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
