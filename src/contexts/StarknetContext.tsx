import { createContext } from "react";
import { AccountInterface, ProviderInterface } from "starknet"; //add contract to imports later

export interface StarknetContextType {
  account: AccountInterface | null;
  provider: ProviderInterface | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  chainId: string | null;

  // 🔹 New: contract helpers
  getP2PVolume: () => Promise<number>;
}

export const StarknetContext = createContext<StarknetContextType | undefined>(
  undefined
);
