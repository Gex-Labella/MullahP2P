import { useContext } from "react";
import { StarknetContext, type StarknetContextType } from "../contexts/StarknetContext";

export function useStarknet(): StarknetContextType {
  const context = useContext(StarknetContext);
  if (context === undefined) {
    throw new Error("useStarknet must be used within a StarknetProvider");
  }
  return context;
}