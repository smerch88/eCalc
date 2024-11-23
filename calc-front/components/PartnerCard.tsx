"use client";
import { useUnifiedStore } from "@/stores/stores";
import { Boiler } from "@/types/common";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";

type PartnerCardProps = {
  boilerCard: Boiler;
};

export const PartnerCard: FC<PartnerCardProps> = ({ boilerCard }) => {
  const setBoiler = useUnifiedStore((state) => state.setBoiler);

  const handleSelectBoiler = () => {
    setBoiler(boilerCard);
    console.log("Selected boiler added to store:", boilerCard); // Debug log
  };

  return (
    <li className="rounded-2xl bg-white h-[566px] overflow-hidden flex flex-col items-center px-6 py-4 justify-between">
      <div>
        <h3 className="w-full text-left text-2xl mb-4">{boilerCard.name}</h3>
        <p className="w-full text-left text-3xl font-bold">
          {boilerCard.price} грн
        </p>
      </div>
      <Image
        src={boilerCard.image}
        alt={boilerCard.name}
        className="object-contain object-top h-[200px]"
      />
      <div className="flex gap-4 flex-col">
        <Link
          href={boilerCard.link}
          className="rounded-2xl py-2 text-2xl text-center border border-black"
        >
          До магазину
        </Link>
        <Button
          onClick={handleSelectBoiler}
          className="rounded-2xl py-6 text-2xl"
        >
          Розрахувати
        </Button>
      </div>
    </li>
  );
};
