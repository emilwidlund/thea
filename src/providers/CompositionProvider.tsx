import { Composition } from "@/models/composition";
import { TimelineModel } from "@/models/timeline";
import { createContext, useContext, useState } from "react";

export type CompositionContextValue = {
  composition: Composition;
  setComposition: (composition: Composition) => void;
  setFPS: (fps: number) => void;
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

  const setFPS = (fps: number) => {
    setComposition({
      ...composition,
      timeline: TimelineModel.parse({ fps }),
    });
  };

  return (
    <CompositionContextProvider.Provider
      value={{ composition, setComposition, setFPS }}
    >
      {children}
    </CompositionContextProvider.Provider>
  );
};
