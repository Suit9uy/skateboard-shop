"use client";

import { Content } from "@prismicio/client";
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type CustomizerControlsContext = {
  seletedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  setWheel: (wheel: Content.BoardCustomizerDocumentDataWheelsItem) => void;
  seletedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  setDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  seletedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  setTruck: (trucks: Content.BoardCustomizerDocumentDataMetalsItem) => void;
  seletedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  setBolt: (bolts: Content.BoardCustomizerDocumentDataMetalsItem) => void;
};

const defaultContext: CustomizerControlsContext = {
  setWheel: () => { },
  setDeck: () => { },
  setTruck: () => { },
  setBolt: () => { },
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  children?: ReactNode;
};

export function CustomizerControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlsProviderProps) {
  const [seletedWheel, setWheel] = useState(defaultWheel);
  const [seletedDeck, setDeck] = useState(defaultDeck);
  const [seletedTruck, setTruck] = useState(defaultTruck);
  const [seletedBolt, setBolt] = useState(defaultBolt);

  const value = useMemo<CustomizerControlsContext>(() => {
    return {
      seletedWheel,
      setWheel,
      seletedDeck,
      setDeck,
      seletedTruck,
      setTruck,
      seletedBolt,
      setBolt,
    };
  }, [seletedWheel, seletedDeck, seletedTruck, seletedBolt]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerContorls() {
  return useContext(CustomizerControlsContext);
}
