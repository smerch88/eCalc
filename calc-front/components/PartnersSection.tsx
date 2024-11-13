import Image from "next/image";
import Boiler1 from "../public/mockBoilers/1.webp";
import Boiler2 from "../public/mockBoilers/2.webp";
import Boiler3 from "../public/mockBoilers/3.webp";
import Boiler4 from "../public/mockBoilers/4.webp";

const boilers = [
  {
    name: "Ariston VELIS PRO DRY WIFI 80 EU",
    price: "17278",
    link: "https://bt.rozetka.com.ua/ua/ariston-3100909/p433311959/",
    image: Boiler1,
  },
  {
    name: "ARISTON BLU1 ECO 100 V 1,8K PL DRY",
    price: "10299",
    link: "https://bt.rozetka.com.ua/ua/ariston_blu1_eco_100_v_1_8k_pl_dry/p161442863/",
    image: Boiler2,
  },
  {
    name: "ARISTON LYDOS DUNE R 50 V 1,5K PL EU",
    price: "6399",
    link: "https://bt.rozetka.com.ua/ua/ariston-3201528/p387777807/",
    image: Boiler3,
  },
  {
    name: "ATLANTIC Vertigo Steatite WI-FI 100 (2250W) silver",
    price: "18999",
    link: "https://bt.rozetka.com.ua/ua/atlantic-851338/p352057158/",
    image: Boiler4,
  },
];

export const PartnersSection = () => {
  return (
    <section>
      <div className="container py-10">
        <h2 className="text-4xl font-semibold pb-6">
          Наші пропозиції від партнерів
        </h2>
        <p className="text-2xl mb-12">
          Спробуйте розрахунки разом з реальними показниками прилідв від
          партнерів.
        </p>
        <ul className="grid grid-cols-4 w-full gap-6">
          {boilers.map((item) => (
            <li
              className="rounded-2xl bg-white h-[350px] overflow-hidden flex flex-col items-center px-6 py-4 gap-12"
              key={item.name}
            >
              <div>
                <h3 className="w-full text-left text-2xl mb-1">{item.name}</h3>
                <p className="w-full text-left text-lg">{item.price}</p>
              </div>
              <Image
                src={item.image}
                alt={item.name}
                className="object-contain object-top"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
