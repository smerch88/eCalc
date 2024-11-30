"use client";

import React, { useState } from "react";
import { useUnifiedStore } from "@/stores/stores"; // Імпорт zustand store.

interface CitySelectorProps {
  onClose: () => void; // Функція для закриття модального вікна.
}

const CitySelector: React.FC<CitySelectorProps> = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Пошуковий запит.
  const [cities] = useState([
    "Київ",
    "Полтава",
    "Одеса",
    "Харків",
    "Вінниця",
    "Львів",
    "Дніпро",
    "Миколаїв",
    "Запоріжжя",
    "Херсон",
  ]); // Список міст.

  const location = useUnifiedStore((state) => state.location); // Поточне місто.
  const setLocation = useUnifiedStore((state) => state.setLocation); // Функція для оновлення міста.

  const handleCitySelect = (city: string) => {
    setLocation(city); // Оновлення глобального стану через zustand.
    onClose(); // Закрити модальне вікно.
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        {/* Заголовок і кнопка закриття */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Виберіть місто</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Поле вводу для пошуку */}
        <input
          type="text"
          placeholder="Почніть вводити назву міста"
          className="w-full p-2 border rounded-lg mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Список міст */}
        <ul className="max-h-60 overflow-y-auto border rounded-lg">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <li
                key={city}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleCitySelect(city)}
              >
                {city}
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Місто не знайдено</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CitySelector;
