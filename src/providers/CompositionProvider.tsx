import { Composition } from "@/models/composition";
import { createContext, useContext, useState } from "react";

export type CompositionContextValue = {
  composition: Composition;
  setComposition: (composition: Composition) => void;
};

export const defaultCompositionContextValue = () => {
  throw new Error("CompositionContextValue not provided");
};

export const CompositionContextProvider =
  createContext<CompositionContextValue>(defaultCompositionContextValue);

export const useComposition = () => {
  return useContext(CompositionContextProvider);
};

export const CompositionProvider = ({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Composition;
}) => {
  const [composition, setComposition] = useState<Composition>(value);

  return (
    <CompositionContextProvider.Provider
      value={{ composition, setComposition }}
    >
      {children}
    </CompositionContextProvider.Provider>
  );
};
