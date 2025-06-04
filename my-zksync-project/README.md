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

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- Foundry installed (`curl -L https://foundry.paradigm.xyz | bash`)
- MetaMask or WalletConnect supported wallet
- zkSync or Sepolia testnet ETH

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/self-sovereign-id.git
cd self-sovereign-id






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
