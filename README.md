# 💰 Mullah P2P - Peer-to-Peer Cryptocurrency Transfer Platform

<div align="center">

![Mullah P2P](https://img.shields.io/badge/Mullah-P2P-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-3178C6?style=for-the-badge&logo=typescript)
![Ethereum](https://img.shields.io/badge/Ethereum-Smart_Contracts-627EEA?style=for-the-badge&logo=ethereum)

A modern, secure, and user-friendly platform for peer-to-peer cryptocurrency transfers with advanced blockchain integration.

[Features](#-features) • [Getting Started](#-getting-started) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Smart Contract](#-smart-contract)
- [Development](#-development)
- [Contributing](#-contributing)

---

## 🌟 Overview

**Mullah P2P** is a decentralized peer-to-peer cryptocurrency transfer platform built on Ethereum and StarkNet. It enables users to transfer ETH and ERC-20 tokens securely with reduced fees for MUL token holders, track transaction history in real-time, and monitor network status.

---

## ✨ Features

### 🔐 Core Features
- **Wallet Integration**: Seamless connection with MetaMask and Web3 wallets
- **Multi-Token Support**: Transfer ETH and any ERC-20 tokens
- **Smart Fee System**: Dynamic fee rates with discounts for MUL token holders
- **Daily Limits**: Built-in transfer limits for enhanced security
- **Transaction History**: Real-time tracking of all your transfers

### 🎨 User Experience
- **Modern UI/UX**: Glassmorphism design with dark mode support
- **3D Visualizations**: Interactive Ethereum and blockchain visualizations
- **Real-time Charts**: Live transaction and network statistics
- **Responsive Design**: Optimized for desktop and mobile devices
- **Loading Animations**: Smooth transitions and Lottie animations

### ⚙️ Advanced Features
- **Network Selection**: Switch between multiple blockchain networks
- **Security Settings**: Configure 2FA, biometric authentication, and more
- **Advanced Settings**: Customize gas fees, transaction speed, and notifications
- **P2P Statistics**: Comprehensive analytics and insights

---

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19.1.1 with TypeScript 5.9.2
- **Build Tool**: Vite 7.1.3
- **Styling**: Tailwind CSS 4.1.12
- **UI Components**: Radix UI Components
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: Framer Motion, Lottie React
- **Charts**: Recharts
- **Notifications**: Sonner

### Blockchain
- **Smart Contracts**: Solidity (Ethereum)
- **Web3 Library**: Ethers.js 6.15.0
- **StarkNet**: Starknet 7.6.4, get-starknet 3.3.3
- **Wallet Sessions**: Argent X Sessions 8.0.1

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MetaMask** or Web3 wallet extension
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mullah-p2p.git
   cd MullahP2P/mullah-p2p
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   ```bash
   # Create .env in mullah-p2p directory
   touch .env
   ```

4. **Configure environment variables**
   ```env
   VITE_P2P_CONTRACT_ADDRESS=0x_your_contract_address
   VITE_MUL_TOKEN_ADDRESS=0x_your_token_address
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 💡 Usage

### Connecting Your Wallet

1. Click the **Ethereum logo** or **Connect Wallet** button
2. Select your wallet provider (MetaMask recommended)
3. Approve the connection request
4. Your wallet address will appear in the dashboard

### Making a Transfer

1. Navigate to the **Dashboard**
2. Click **P2P Transfer** or the transfer button
3. Select token type (ETH or ERC-20)
4. Enter recipient address
5. Enter amount to transfer
6. Review fee calculation
7. Confirm transaction in your wallet

### Viewing Transaction History

- Navigate to **Dashboard** → **Transaction History**
- View all past transfers with details:
  - Transaction hash
  - Amount and token
  - Recipient address
  - Fee paid
  - Timestamp and status

### Monitoring Network Status

- Navigate to **Network Status** page
- View real-time blockchain data:
  - Current block number
  - Gas prices
  - Network congestion
  - Connection status

---

## 📁 Project Structure

```
mullah-p2p/
├── public/              # Static assets
├── src/
│   ├── abis/           # Smart contract ABIs
│   │   ├── P2PMullah.json
│   │   └── ERC20.json
│   ├── animations/     # Lottie animation files
│   ├── components/     # React components
│   │   ├── features/   # Feature-specific components
│   │   ├── layout/     # Layout components
│   │   ├── settings/   # Settings page components
│   │   └── ui/         # Reusable UI components
│   ├── contexts/       # React contexts
│   │   └── StarknetProvider.tsx
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Login.tsx
│   │   ├── NetworkStatus.tsx
│   │   ├── P2PStatistics.tsx
│   │   ├── Settings.tsx
│   │   └── Signup.tsx
│   ├── services/       # Service layer
│   │   ├── ContractService.ts
│   │   └── tokenService.ts
│   ├── store/          # Redux store
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main app component
│   └── main.tsx        # Entry point
├── .env                # Environment variables
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript config
├── tailwind.config.js  # Tailwind CSS config
└── vite.config.ts      # Vite config
```

---

## 📜 Smart Contract

### P2PMullah Contract

The core smart contract enables secure P2P transfers with the following features:

#### Key Functions

```solidity
// Transfer ETH with automatic fee calculation
function transferETH(address payable recipient) payable

// Transfer ERC-20 tokens
function transferToken(address token, address recipient, uint256 amount)

// Get fee rate for user (discounted for MUL holders)
function _getFeeRate(address user) view returns (uint256)

// Admin functions
function updateFeeRates(uint256 newBaseFeeRate, uint256 newDiscountRate)
function updateLimits(uint256 newMaxTransfer, uint256 newDailyLimit)
function pause() / unpause()
```

#### Fee Structure

- **Base Fee Rate**: Configurable percentage (default: 0.5%)
- **Discount Rate**: For MUL token holders (default: 0.2%)
- **Minimum MUL**: Required amount for fee discount
- **Daily Limit**: Maximum transfer per 24 hours
- **Max Transfer**: Single transaction limit

#### Events

- `EthTransferred`: ETH transfer completed
- `TokenTransferred`: ERC-20 token transfer completed
- `FeeWithdrawn`: Platform fees withdrawn
- `FeeRatesUpdated`: Fee rates modified
- `LimitsUpdated`: Transfer limits changed

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Initialize Tailwind CSS
npm run tw:init
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Configured with React and TypeScript rules
- **Formatting**: Follow existing patterns
- **Components**: Functional components with hooks
- **Naming**: PascalCase for components, camelCase for functions

### Environment Variables

```env
# Required
VITE_P2P_CONTRACT_ADDRESS=   # P2P contract address
VITE_MUL_TOKEN_ADDRESS=      # MUL token contract address

# Optional
VITE_NETWORK_NAME=           # Network name (default: Ethereum)
VITE_CHAIN_ID=               # Chain ID (default: 1)
VITE_RPC_URL=                # Custom RPC endpoint
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Contribution Guidelines

- Write clear, concise commit messages
- Add tests for new features
- Update documentation as needed
- Follow the existing code style
- Ensure all tests pass before submitting

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- **Ethereum Foundation** for blockchain infrastructure
- **StarkNet** for Layer 2 scaling solutions
- **OpenZeppelin** for secure smart contract libraries
- **React Team** for the amazing framework
- **Radix UI** for accessible component primitives

---

## 📞 Contact & Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/mullah-p2p/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/mullah-p2p/discussions)
- **Email**: support@mullahp2p.com

---

<div align="center">

**Made with ❤️ for the decentralized future**

⭐ Star us on GitHub if you find this project useful!

</div>
