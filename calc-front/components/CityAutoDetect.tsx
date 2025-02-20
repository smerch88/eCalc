'use client';

import CitySelector from '@/components/CitySelect';
import { Input } from '@/components/ui/input';
import { useUnifiedStore } from '@/stores/stores'; // Імпорт zustand store.
import Image from 'next/image';
import IconArrowDown from '@/public/icons/arrow-down.svg';
import IconArrowUp from '@/public/icons/arrow-up.svg';
import { useState,useEffect,useRef } from 'react';

// Словник для перекладу міст
// const cityTranslations: { [key: string]: string } = {
//     Vinnytsia: 'Вінниця',
//     Dnipro: 'Дніпро',
//     Zhytomyr: 'Житомир',
//     Zaporizhzhia: 'Запоріжжя',
//     Kyiv: 'Київ',
//     Lviv: 'Львів',
//     Mykolaiv: 'Миколаїв',
//     Odessa: 'Одеса',
//     Poltava: 'Полтава',
//     Kharkiv: 'Харків',
//     Kherson: 'Херсон',
//     Cherkasy: 'Черкаси',
// };

// const translateCity = (city: string) => {
//     return cityTranslations[city] || city; // Якщо немає перекладу, повертається оригінальна назва
// };

const CityAutoDetect = () => {
    const location = useUnifiedStore((state) => state.location); // Поточне місто.
    const setLocation = useUnifiedStore(state => state.setLocation); // Оновлення міста.

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Стан випадаючого списку.
    const [searchTerm, setSearchTerm] = useState(''); // Стан пошуку.
    const dropdownRef = useRef<HTMLDivElement>(null); // Реф для випадаючого списку.

    // useEffect(() => {
    //     // Визначаємо місто через API при завантаженні компонента.
    //     fetch('https://ipapi.co/json/')
    //         .then(res => res.json())
    //         .then(data => {
    //             const detectedCity = translateCity(data.city || 'Київ');
    //             setLocation(detectedCity);
    //             setSearchTerm(detectedCity); // Початкове значення поля.
    //         })
    //         .catch(() => {
    //             setLocation('Київ');
    //             setSearchTerm('Київ');
    //         });
    // }, [setLocation]);
 useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false); // Закриваємо випадаюче меню
                setSearchTerm(location); // Повертаємо попереднє місто
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [location]);

    const handleInputClick = () => {
        setSearchTerm(''); // Очищаємо поле вводу
        setIsDropdownOpen(true); // Відкриваємо список міст
    };

    const handleCitySelect = (city: string) => {
        setLocation(city); // Оновлюємо глобальний стан
        setSearchTerm(city); // Вставляємо місто у поле
        setIsDropdownOpen(false); // Закриваємо випадаючий список
    };

    return (
        <div className="relative w-full xl:w-[282px] h-[56px]" ref={dropdownRef}>
            {/* Поле вводу */}
            <Input
                type="text"
                placeholder="Місто"
                value = {isDropdownOpen ? searchTerm : location}
                onChange={e => setSearchTerm(e.target.value)}
                onClick={handleInputClick}
                className={`w-full h-full bg-white px-4 text-lg cursor-pointer border-gray-200 
          hover:bg-[#f0f0f0] focus:outline-none focus-visible:ring-0 transition-all 
          ${isDropdownOpen ? 'rounded-t-xl rounded-b-none' : 'rounded-xl'}`}
                // onChange={(e) => setSearchTerm(e.target.value)} // Пошук міст
                // onClick={handleInputClick} // Очищення та відкриття списку
                // className="w-full h-full bg-white px-4 rounded-xl text-lg cursor-pointer border-gray-200 hover:bg-[#f0f0f0] hover:outline-none focus:outline-none focus-visible:ring-0"
            />

            {/* Іконка */}
            <Image
                width={24}
                height={24}
                src={isDropdownOpen ? IconArrowUp : IconArrowDown}
                alt="Arrow"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer object-contain"
                style={{ width: 'auto', height: 'auto' }}
            />

            {/* Список міст */}
            {isDropdownOpen && (
                <CitySelector
                    searchTerm={searchTerm} // Передаємо введене значення
                    onCitySelect={handleCitySelect} // Вибір міста
                />
            )}
        </div>
    );
};

export default CityAutoDetect;
