import { Composition } from "@/models/composition";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export type CompositionContextValue = {
  composition: Composition;
  setComposition: Dispatch<SetStateAction<Composition>>;
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

  useEffect(() => {
    setComposition(value);
  }, [value]);

  return (
    <CompositionContextProvider.Provider
      value={{ composition, setComposition }}
    >
      {children}
    </CompositionContextProvider.Provider>
  );
};
