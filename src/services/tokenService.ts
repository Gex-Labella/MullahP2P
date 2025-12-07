import { AccountInterface, Contract, uint256, cairo } from 'starknet';

// ERC-20 Interface ABI (simplified)
const erc20ABI = [
  {
    members: [
      {
        name: "low",
        offset: 0,
        type: "felt"
      },
      {
        name: "high",
        offset: 1,
        type: "felt"
      }
    ],
    name: "Uint256",
    size: 2,
    type: "struct"
  },
  {
    inputs: [
      {
        name: "recipient",
        type: "felt"
      },
      {
        name: "amount",
        type: "Uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        name: "success",
        type: "felt"
      }
    ],
    type: "function"
  },
  {
    inputs: [
      {
        name: "account",
        type: "felt"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "Uint256"
      }
    ],
    type: "function"
  }
];

export class TokenService {
  private account: AccountInterface;
  private tokenAddress: string;
  private tokenContract: Contract;
  
  constructor(account: AccountInterface, tokenAddress: string) {
    this.account = account;
    this.tokenAddress = tokenAddress;
    
    // Initialize the contract
    this.tokenContract = new Contract(erc20ABI, tokenAddress, account);
  }
  
  async getBalance(ownerAddress: string): Promise<string> {
    try {
      const response = await this.tokenContract.balanceOf(ownerAddress);
      
      // Convert Uint256 to string
      const balance = uint256.uint256ToBN(response.balance);
      return balance.toString();
    } catch (error) {
      console.error('Error getting token balance:', error);
      throw new Error('Failed to get token balance');
    }
  }
  
  async transfer(recipientAddress: string, amount: string): Promise<string> {
    try {
      // Convert amount to Uint256
      const amountUint256 = cairo.uint256(amount);
      
      // Execute the transfer
      const result = await this.tokenContract.transfer(
        recipientAddress,
        amountUint256
      );
      
      // Return the transaction hash
      return result.transaction_hash;
    } catch (error) {
      console.error('Error transferring tokens:', error);
      throw new Error('Failed to transfer tokens');
    }
  }
}

// Default tokens
export const SUPPORTED_TOKENS = {
  ETH: {
    symbol: 'ETH',
    name: 'Ether',
    decimals: 18,
    address: '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7' // StarkNet ETH contract
  },
  // Add other tokens as needed
};