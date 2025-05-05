# Self-Sovereign Identity Verification System (Blockchain-based)

A decentralized identity verification system built on blockchain using zkSync. Users upload documents from their own devices to prove identity. Verifiers (e.g., institutions, companies) can scan a QR code to validate the data — all without relying on a central authority.

## 🔐 Key Features

- **Self-Sovereign Identity**: No centralized issuer or storage. Users own and control their identity data.
- **Decentralized Verification**: Verifiers scan a QR code to access verification data from the blockchain.
- **On-chain Proofs**: Identity documents are hashed and stored/referenced on-chain.
- **Zero-Knowledge Proof (ZKP) Support (optional)**: Privacy-preserving document verification (coming soon).
- **QR Code Based Access**: Fast, secure verification by scanning a generated QR code.
- **OTP for Temporary Access**: (Optional) Verifiers can access document verification for a limited time.

---

## 🧱 Tech Stack

### Smart Contracts
- **Solidity** on **zkSync Era** (or Ethereum Sepolia for test)
- **Foundry** for development and testing
- **Chainlink VRF** (optional) for OTP randomness

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **ethers.js** for all blockchain interactions
- **Web3Modal v2** (for wallet connection with MetaMask and WalletConnect)

---

## 📁 Project Structure
```
self-sovereign-id/
├── contracts/ # Solidity smart contracts
├── frontend/ # React-based frontend (Vite)
│ ├── components/ # Reusable UI components
│ ├── pages/ # Auth, Upload, Verify pages
│ ├── context/ # Auth and blockchain context
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Ethers.js utilities (connect, read/write)
│ └── App.jsx # Main app entry
├── foundry.toml # Foundry config
├── deploy/ # Deployment scripts
└── README.md # This file
```

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- Foundry installed (`curl -L https://foundry.paradigm.xyz | bash`)
- MetaMask or WalletConnect supported wallet
- zkSync or Sepolia testnet ETH

- 
## 🛠️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/self-sovereign-id.git
   cd self-sovereign-id

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install

3. **Compile and Test Contracts**:
   ```bash
   forge build
   forge test


4. **Deploy Contract (to zkSync or Sepolia)**:
   ```bash
   # Example with Foundry
   forge script script/Deploy.s.sol:DeployScript --rpc-url <RPC_URL> --private-key <PRIVATE_KEY> --broadcast


5. **Run the Frontend**:
   ```bash
   cd frontend
   npm run dev

## 👥 Roles

### 🧑 User Side

- Connect wallet
- Upload identity document (hashed)
- Generate QR code for verifier

### 🕵️ Verifier Side

- Scan QR code
- View on-chain proof (optionally using OTP access)
- Trustless document verification

## 🔒 Security & Privacy

- Only document hashes are stored on-chain — not the actual documents
- Future support planned for zk-SNARKs / zero-knowledge proofs
- QR codes can optionally include time-sensitive OTP tokens for added security

## 📦 Dependencies

### 📝 Contracts

- `solidity ^0.8.x`
- `@chainlink/contracts` — for optional VRF-based randomness (e.g., OTP)

### 💻 Frontend

- `react`, `react-router-dom`, `tailwindcss`
- `ethers` — Ethereum interaction
- `@web3modal/ethereum`, `@web3modal/react`, `web3modal` — Wallet connection (MetaMask, WalletConnect)

## 📜 License
MIT License

## ✨ Future Enhancements

- zk-SNARK integration for advanced zero-knowledge proof functionality
- Decentralized storage solutions (e.g., IPFS/Filecoin)
- Mobile-friendly UI for better user experience
- Email/Phone verification integration for multi-factor authentication


## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

-   **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
-   **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
-   **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
-   **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```
