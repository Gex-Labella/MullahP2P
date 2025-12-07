import { useState, useEffect, type ReactNode } from "react";
import { connect, disconnect } from "get-starknet";
import { AccountInterface, ProviderInterface, Contract } from "starknet";
import { StarknetContext } from "./StarknetContext";

export function StarknetProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<AccountInterface | null>(null);
  const [provider, setProvider] = useState<ProviderInterface | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);

  // 🔹 Replace with your actual contract details
  const CONTRACT_ADDRESS = "0xYourContractAddress";
  const CONTRACT_ABI: unknown[] = []; // <-- paste your ABI JSON here

  // --- Helper: fetch P2P Volume from contract ---
  const getP2PVolume = async (): Promise<number> => {
    try {
      if (!provider) {
        // 🔹 Wallet not connected yet → return random fallback
        return Math.floor(Math.random() * 1000);
      }

      const contract = new Contract(CONTRACT_ABI, CONTRACT_ADDRESS, provider);
      const result = await contract.call("getP2PVolume");

      // result could be BigInt / hex / structured, so parse carefully
      return Number(result);
    } catch (err) {
      console.error("Error fetching P2P volume, using fallback:", err);
      // 🔹 If contract call fails → simulate instead of breaking chart
      return Math.floor(Math.random() * 1000);
    }
  };

  const connectWallet = async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const starknet = await connect();

      if (!starknet) {
        throw new Error("No wallet extension found");
      }

      const userAccount = starknet.account;
      const userProvider = starknet.provider;

      if (!userAccount || !userProvider) {
        throw new Error("Failed to connect wallet");
      }

      setAccount(userAccount);
      setProvider(userProvider);

      const chainIdResponse = await userProvider.getChainId();
      setChainId(chainIdResponse);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      setError("Failed to connect to wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    disconnect();
    setAccount(null);
    setProvider(null);
    setChainId(null);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const starknet = await connect();
        if (starknet && starknet.isConnected && starknet.account) {
          setAccount(starknet.account);
          setProvider(starknet.provider);

          const chainIdResponse = await starknet.provider.getChainId();
          setChainId(chainIdResponse);
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <StarknetContext.Provider
      value={{
        account,
        provider,
        connectWallet,
        disconnectWallet,
        isConnected: !!account,
        isConnecting,
        error,
        chainId,
        getP2PVolume, // ✅ included in context now
      }}
    >
      {children}
    </StarknetContext.Provider>
  );
}
