import Boiler1 from '../public/mockBoilers/1.webp';
import Boiler2 from '../public/mockBoilers/2.webp';
import Boiler3 from '../public/mockBoilers/3.webp';
// import Boiler4 from "../public/mockBoilers/4.webp";
import { PartnerCard } from '@/components/PartnerCard';

const boilers = [
    {
        name: 'Ariston VELIS PRO DRY WIFI 80 EU',
        price: 17278,
        link: 'https://bt.rozetka.com.ua/ua/ariston-3100909/p433311959/',
        image: Boiler1,
        efficiency: 98,
        volume: 100,
    },
    {
        name: 'ARISTON BLU1 ECO 100 V 1,8K PL DRY',
        price: 10299,
        link: 'https://bt.rozetka.com.ua/ua/ariston_blu1_eco_100_v_1_8k_pl_dry/p161442863/',
        image: Boiler2,
        efficiency: 98,
        volume: 100,
    },
    {
        name: 'ARISTON LYDOS DUNE R 50 V 1,5K PL EU',
        price: 6399,
        link: 'https://bt.rozetka.com.ua/ua/ariston-3201528/p387777807/',
        image: Boiler3,
        efficiency: 98,
        volume: 100,
    },
    // {
    //   name: "ATLANTIC Vertigo Steatite WI-FI 100 (2250W) silver",
    //   price: 18999,
    //   link: "https://bt.rozetka.com.ua/ua/atlantic-851338/p352057158/",
    //   image: Boiler4,
    // },
];

export const PartnersSection = () => {
    return (
        <section>
            <div className="container py-10">
                <h2 className="text-4xl font-semibold pb-6">Наші пропозиції від партнерів</h2>
                <p className="text-2xl mb-12">
                    Пропонуємо прилади від наших партнерів на основі ваших результатів, які будуть
                    вигідними у вашому випадку. Ви можете підставити прилад з запропонованих до
                    розрахунків натиснувши на “Розрахувати” та перевірити чи вигідно це для вас.
                    Натиснувши “До магазину” ви перейдете на сайт партнера для замовлення приладу
                    додому.
                </p>
                <ul className="grid grid-cols-3 w-full gap-6">
                    {boilers.map(boilerCard => (
                        <PartnerCard key={boilerCard.name} boilerCard={boilerCard} />
                    ))}
                </ul>
            </div>
        </section>
    );
};
