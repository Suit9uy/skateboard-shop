"use client";

import { Heading } from "@/components/Heading";
import {
  ColorField,
  Content,
  ImageField,
  isFilled,
  KeyTextField,
} from "@prismicio/client";
import { PrismicNextImage, PrismicNextImageProps } from "@prismicio/next";
import clsx from "clsx";
import { ComponentProps, ReactNode, useEffect } from "react";
import { useCustomizerContorls } from "./context";
import { useRouter } from "next/navigation";

type Props = Pick<
  Content.BoardCustomizerDocumentData,
  "wheels" | "decks" | "metals"
> & {
  className?: string;
};

export default function Controls({ wheels, decks, metals, className }: Props) {
  const router = useRouter();

  const {
    setBolt,
    setDeck,
    setTruck,
    setWheel,
    seletedTruck,
    seletedBolt,
    seletedDeck,
    seletedWheel,
  } = useCustomizerContorls();

  useEffect(() => {
    const url = new URL(window.location.href);

    if (isFilled.keyText(seletedWheel?.uid))
      url.searchParams.set("wheel", seletedWheel.uid);

    if (isFilled.keyText(seletedDeck?.uid))
      url.searchParams.set("deck", seletedDeck.uid);

    if (isFilled.keyText(seletedTruck?.uid))
      url.searchParams.set("truck", seletedTruck.uid);

    if (isFilled.keyText(seletedBolt?.uid))
      url.searchParams.set("bolt", seletedBolt.uid);

    router.replace(url.href);
  }, [router, seletedWheel, seletedDeck, seletedTruck, seletedBolt]);

  return (
    <div className={clsx("flex flex-col gap-6", className)}>
      <Options title="Deck" selectedName={seletedDeck?.uid}>
        {decks.map((deck) => (
          <Option
            key={deck.uid}
            imageField={deck.texture}
            imgixParams={{
              rect: [20, 1550, 1000, 1000],
              width: 150,
              height: 150,
            }}
            selected={deck.uid === seletedDeck?.uid}
            onClick={() => setDeck(deck)}
          >
            {deck.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Wheels" selectedName={seletedWheel?.uid}>
        {wheels.map((wheel) => (
          <Option
            key={wheel.uid}
            imageField={wheel.texture}
            imgixParams={{
              rect: [20, 10, 850, 850],
              width: 150,
              height: 150,
            }}
            selected={wheel.uid === seletedWheel?.uid}
            onClick={() => setWheel(wheel)}
          >
            {wheel.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Trucks" selectedName={seletedTruck?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === seletedTruck?.uid}
            onClick={() => setTruck(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
      <Options title="Bolts" selectedName={seletedBolt?.uid}>
        {metals.map((metal) => (
          <Option
            key={metal.uid}
            colorField={metal.color}
            selected={metal.uid === seletedBolt?.uid}
            onClick={() => setBolt(metal)}
          >
            {metal.uid?.replace(/-/g, " ")}
          </Option>
        ))}
      </Options>
    </div>
  );
}

type OptionsProps = {
  title?: ReactNode;
  selectedName?: KeyTextField;
  children?: ReactNode;
};

function Options({ title, selectedName, children }: OptionsProps) {
  const formattedName = selectedName?.replace(/-/g, " ");

  return (
    <div>
      <div className="flex">
        <Heading as="h2" size="xs" className="mb-2">
          {title}
        </Heading>
        <p className="ml-3 text-zinc-300">
          <span className="select-none text-zinc-500">| </span>
          {formattedName}
        </p>
      </div>
      <ul className="mb-1 flex flex-wrap gap-2">{children}</ul>
    </div>
  );
}

type OptionProps = Omit<ComponentProps<"button">, "children"> & {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
} & (
    | {
      imageField: ImageField;
      imgixParams?: PrismicNextImageProps["imgixParams"];
      colorField?: never;
    }
    | {
      colorField: ColorField;
      imageField?: never;
      imgixParams?: never;
    }
  );

function Option({
  children,
  selected,
  imageField,
  imgixParams,
  colorField,
  onClick,
}: OptionProps) {
  return (
    <li>
      <button
        className={clsx(
          "size-10 cursor-pointer rounded-full bg-black p-0.5 outline-2 outline-white",
          selected && "outline",
        )}
        onClick={onClick}
      >
        {imageField ? (
          <PrismicNextImage
            field={imageField}
            imgixParams={imgixParams}
            className="pointer-events-none h-full w-full rounded-full"
            alt=""
          />
        ) : (
          <div
            className="h-full w-full rounded-full"
            style={{ backgroundColor: colorField ?? undefined }}
          />
        )}

        <span className="sr-only">{children}</span>
      </button>
    </li>
  );
}
