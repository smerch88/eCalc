"use client";

import CitySelector from "@/components/CitySelect";
import { Input } from "@/components/ui/input"; // Ваш кастомний Input компонент.
import { useUnifiedStore } from "@/stores/stores"; // Імпорт zustand store.
import Image from "next/image";
import IconArrowDown from "../public/icons/arrow-down.svg";
import { useEffect, useState } from "react";

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
    <div className="relative w-[200px] h-[56px] border-#00000014">
      {/* Поле вводу */}
      <Input
        type="text"
        placeholder="Місто"
        value={location} // Значення з zustand store.
        // readOnly
        onClick={() => setIsModalOpen(true)} // Відкрити модальне вікно.
        className="w-full h-full bg-white px-4 rounded-xl text-lg cursor-pointer border border-gray-300 hover:bg-gray-300 hover:outline-none focus:outline-none focus:ring-0"
      />

      {/* Іконка стрілочки */}
      <Image
        width={24}
        height={24}
        src={IconArrowDown}
        alt="Arrow Down"
        onClick={() => setIsModalOpen(true)} // Додайте можливість кліку
        className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
      />

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
