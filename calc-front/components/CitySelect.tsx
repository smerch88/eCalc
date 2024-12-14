"use client";

import React, { useState, FC } from "react";

interface CitySelectorProps {
  searchTerm: string; // Введене значення
  onCitySelect: (city: string) => void; // Функція для вибору міста
}

const CitySelector: FC<CitySelectorProps> = ({ searchTerm, onCitySelect }) => {
  const [cities] = useState([
    "Вінниця",
    "Вінницька обл.",
    "Дніпро",
    "Дніпровська обл.",
    "Житомир",
    "Житомирська обл.",
    "Запоріжжя",
    "Запорізька обл.",
    "Київ",
    "Київська обл.",
    "Львів",
    "Львівська обл.",
    "Миколаїв",
    "Миколаївська обл.",
    "Одеса",
    "Одеська обл.",
    "Полтава",
    "Полтавська обл.",
    "Харків",
    "Харківська обл.",
    "Херсон",
    "Херсонська обл.",
    "Черкаси",
    "Черкаська обл.",
  ]);

  // Фільтрація міст на основі введеного значення
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ul className="absolute top-full left-0 w-full bg-white border rounded-lg rounded-tl-none rounded-tr-none shadow-lg max-h-60 overflow-y-auto z-50">
      {filteredCities.length > 0 ? (
        filteredCities.map((city) => (
          <li
            key={city}
            className="p-2 hover:bg-[#f0f0f0] cursor-pointer"
            onClick={() => onCitySelect(city)} // Вибір міста
          >
            {city}
          </li>
        ))
      ) : (
        <li className="p-2 text-gray-500">Місто не знайдено</li>
      )}
    </ul>
  );
};

export default CitySelector;
