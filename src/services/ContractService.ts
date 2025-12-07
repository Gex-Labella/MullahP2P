import { ethers } from "ethers";

// Import ABI files
import P2PMullahABI from "../abis/P2PMullah.json";
import ERC20ABI from "../abis/ERC20.json";

// Add MetaMask type support
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: string[] }) => Promise<string[]>;
      isMetaMask?: boolean;
    };
  }
}

export class ContractService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.JsonRpcSigner | null = null;
  private p2pContract: ethers.Contract | null = null;

  // Contract addresses (environment variables preferred)
  private P2P_CONTRACT_ADDRESS =
    import.meta.env.VITE_P2P_CONTRACT_ADDRESS || "0x...";
  private MUL_TOKEN_ADDRESS =
    import.meta.env.VITE_MUL_TOKEN_ADDRESS || "0x...";

  constructor() {
    this.initializeProvider();
  }

  // Initialize provider from browser
  private initializeProvider() {
    if (typeof window.ethereum !== "undefined" && window.ethereum) {
      this.provider = new ethers.BrowserProvider(
        window.ethereum as ethers.Eip1193Provider
      );

      this.provider
        .getSigner()
        .then((signer) => {
          this.signer = signer;

          // Initialize contract
          this.p2pContract = new ethers.Contract(
            this.P2P_CONTRACT_ADDRESS,
            P2PMullahABI,
            this.signer
          );
        })
        .catch((error) => {
          console.error("Failed to get signer:", error);
        });
    }
  }

  // Check if wallet is connected
  isWalletConnected(): boolean {
    return this.provider !== null && this.signer !== null;
  }

  // Connect wallet
  async connectWallet(): Promise<string> {
    try {
      if (!window.ethereum) {
        throw new Error("No Ethereum wallet found. Please install MetaMask.");
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!this.provider) {
        this.initializeProvider();
      }

      if (!this.signer) {
        this.signer = await this.provider!.getSigner();
      }

      const address = await this.signer.getAddress();
      return address || accounts[0] || "";
    } catch (error: unknown) {
      console.error("Failed to connect wallet:", error);

      let errorMessage = "Failed to connect wallet";
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      throw new Error(errorMessage);
    }
  }

  // Get connected wallet address
  async getCurrentAddress(): Promise<string | null> {
    if (!this.signer) return null;
    try {
      return await this.signer.getAddress();
    } catch {
      return null;
    }
  }

  // Disconnect wallet (soft reset)
  disconnect(): void {
    this.provider = null;
    this.signer = null;
    this.p2pContract = null;
  }

  // Get native ETH balance
  async getBalance(): Promise<string> {
    try {
      if (!this.signer || !this.provider) {
        throw new Error("Wallet not connected");
      }
      const address = await this.signer.getAddress();
      const balanceWei = await this.provider.getBalance(address);
      return ethers.formatEther(balanceWei) + " ETH";
    } catch (error: unknown) {
      console.error("Failed to get ETH balance:", error);
      throw error instanceof Error ? error : new Error("Unknown balance error");
    }
  }

  // Transfer ETH
  async transferEth(
    recipient: string,
    amount: string
  ): Promise<ethers.ContractTransactionResponse> {
    try {
      if (!this.p2pContract) {
        throw new Error("Contract not initialized");
      }

      const amountWei = ethers.parseEther(amount);
      const tx = await this.p2pContract.transferETH(recipient, {
        value: amountWei,
      });
      return tx;
    } catch (error: unknown) {
      console.error("ETH transfer failed:", error);
      throw error instanceof Error ? error : new Error("ETH transfer failed");
    }
  }

  // Transfer ERC-20 token
  async transferToken(
    tokenAddress: string,
    recipient: string,
    amount: string
  ): Promise<ethers.ContractTransactionResponse> {
    try {
      if (!this.p2pContract) {
        throw new Error("Contract not initialized");
      }

      const tokenContract = new ethers.Contract(
        tokenAddress,
        ERC20ABI,
        this.signer!
      );

      const decimals = await tokenContract.decimals();
      const amountWithDecimals = ethers.parseUnits(amount, decimals);

      const approveTx = await tokenContract.approve(
        this.P2P_CONTRACT_ADDRESS,
        amountWithDecimals
      );
      await approveTx.wait();

      const tx = await this.p2pContract.transferToken(
        tokenAddress,
        recipient,
        amountWithDecimals
      );

      return tx;
    } catch (error: unknown) {
      console.error("Token transfer failed:", error);
      throw error instanceof Error ? error : new Error("Token transfer failed");
    }
  }

  // Get fee rate for current user
  async getFeeRate(): Promise<string> {
    try {
      if (!this.p2pContract) {
        throw new Error("Contract not initialized");
      }

      const address = await this.signer?.getAddress();
      const feeRate = await this.p2pContract._getFeeRate.staticCall(address);
      return (Number(feeRate) / 100).toFixed(2) + "%";
    } catch (error: unknown) {
      console.error("Failed to get fee rate:", error);
      throw error instanceof Error ? error : new Error("Fee rate error");
    }
  }

  // Get daily transfer limit
  async getDailyLimit(): Promise<string> {
    try {
      if (!this.p2pContract) {
        throw new Error("Contract not initialized");
      }

      const limit = await this.p2pContract.dailyLimit();
      return ethers.formatEther(limit) + " ETH";
    } catch (error: unknown) {
      console.error("Failed to get daily limit:", error);
      throw error instanceof Error ? error : new Error("Daily limit error");
    }
  }

  // Get MUL token balance
  async getMulBalance(): Promise<string> {
    try {
      if (!this.signer) {
        throw new Error("Wallet not connected");
      }

      const mulToken = new ethers.Contract(
        this.MUL_TOKEN_ADDRESS,
        ERC20ABI,
        this.signer
      );

      const address = await this.signer.getAddress();
      const balance = await mulToken.balanceOf(address);
      const decimals = await mulToken.decimals();

      return ethers.formatUnits(balance, decimals) + " MUL";
    } catch (error: unknown) {
      console.error("Failed to get MUL balance:", error);
      throw error instanceof Error ? error : new Error("MUL balance error");
    }
  }
}

export default new ContractService();
