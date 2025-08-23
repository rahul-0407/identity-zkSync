# Self-Sovereign Identity Verification System (Blockchain-based)

🚀 **An innovative and creative approach to digital identity verification!** 🚀

A groundbreaking decentralized identity verification system built on blockchain using zkSync Era. This project introduces a **revolutionary new concept** where users upload documents from their own devices to prove identity, while verifiers can scan a QR code to validate the data — all without relying on any central authority.

💡 **What makes this different?** Unlike traditional identity systems that rely on centralized databases and third-party validators, our system puts **YOU in complete control** of your identity data while maintaining cryptographic proof of authenticity through innovative SHA3-256 on-chain hashing.

## 🚀 Current Status

✅ **Sepolia Testnet** - Fully functional deployment and testing completed  
✅ **zkSync Era Ready** - Code written and optimized for L2, final testing in progress  
🔄 **Ethereum Mainnet** - Production deployment coming very soon  
🔄 **Mobile App** - React Native version in active development  
🔄 **Decentralized Storage** - IPFS/Arweave integration planned for next release  

## 🔐 Key Features

- **🌟 Revolutionary Self-Sovereign Identity**: Break free from centralized systems! No centralized issuer or storage. Users own and control their identity data completely.
- **🔗 Innovative Decentralized Verification**: Our creative QR code system allows verifiers to access verification data directly from the blockchain.
- **🛡️ Advanced On-chain Proofs**: Pioneering approach using SHA3-256 document hashing stored on-chain for ultimate security.
- **📋 Groundbreaking On-chain Verifier Registry**: First-of-its-kind system where verifier details and permissions are stored directly on blockchain.
- **🔐 Cutting-edge SHA3-256 Document Hashing**: Military-grade cryptographic hashing for unbreakable document integrity.
- **🌍 Multi-Network Innovation**: Currently on Sepolia, zkSync Era ready, Ethereum mainnet coming soon.
- **🕵️ Zero-Knowledge Proof (ZKP) Support**: Next-gen privacy-preserving document verification (planned).
- **📱 Smart QR Code Access**: Lightning-fast, secure verification by scanning our specially designed QR codes.
- **👑 Intelligent Owner-Controlled Access**: Only contract owner can add/remove authorized verifiers - a new paradigm in access control.

## 💡 What Makes This Project Special?

🎯 **Creative Innovation**: This isn't just another blockchain project - it's a **completely new approach** to digital identity that solves real-world problems in an elegant, decentralized way.

🏗️ **Original Architecture**: We've designed a unique system that combines:
- Self-sovereign identity principles
- Advanced cryptographic hashing (SHA3-256)
- On-chain verifier registry (never been done before!)
- QR-code based verification without compromising privacy

🚀 **Cutting-edge Technology**: Built for the future with zkSync Era L2 scaling, React 19, and ethers.js v6 - this project represents the **next generation** of identity verification systems.

🌟 **Real-world Impact**: Unlike theoretical projects, this system is **actually working** on Sepolia testnet and ready for production deployment, proving that innovative ideas can become reality.

---

## 🧱 Tech Stack

### Smart Contracts
- **Solidity** on **zkSync Era** and **Ethereum**
- **Foundry** for development and testing
- **Currently Live**: Sepolia testnet
- **On-chain Verifier Registry**: Blockchain-based verifier management
- **SHA3-256 Cryptographic Hashing**: Secure document integrity verification

### Frontend
- **React 19**
- **Vite**
- **Tailwind CSS**
- **React Router**
- **ethers.js v6** for all blockchain interactions and wallet connection

### Storage & Data
- **Current**: SHA3-256 document hashes stored on-chain (Sepolia testnet)
- **Verifier Registry**: On-chain storage of authorized verifier details
- **Planned**: IPFS/Arweave for decentralized document storage
- **Blockchain**: zkSync Era (final testing) | Ethereum (production deployment soon)

---

## 📁 Project Structure
```
self-sovereign-id/
├── contracts/                # Solidity smart contracts
├── frontend/                 # React-based frontend (Vite)
│   ├── components/          # Reusable UI components
│   ├── pages/               # Auth, Upload, Verify pages
│   ├── context/             # Auth and blockchain context
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Ethers.js utilities (connect, read/write)
│   └── App.jsx              # Main app entry
├── foundry.toml             # Foundry config
├── deploy/                  # Deployment scripts
└── README.md                # This file
```

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- Foundry installed (`curl -L https://foundry.paradigm.xyz | bash`)
- MetaMask or other ethers.js v6 compatible wallet
- Sepolia testnet ETH (for current testing)
- zkSync Era testnet ETH (for L2 testing)

### Network Configuration
Currently supporting:
- ✅ **Sepolia** (fully tested and deployed)
- 🔄 **zkSync Era** (code ready, final testing in progress)
- 📋 **Ethereum Mainnet** (production deployment very soon)

## 🛠️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/self-sovereign-id.git
   cd self-sovereign-id
   ```

2. **Install Frontend Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Compile and Test Contracts**:
   ```bash
   forge build
   forge test
   ```

4. **Deploy Contract**:
   ```bash
   # Sepolia (Currently Live)
   forge script script/Deploy.s.sol:DeployScript --rpc-url <SEPOLIA_RPC_URL> --private-key <PRIVATE_KEY> --broadcast
   
   # zkSync Era (Testing Soon)
   forge script script/Deploy.s.sol:DeployScript --rpc-url <ZKSYNC_RPC_URL> --private-key <PRIVATE_KEY> --broadcast
   ```

5. **Run the Frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

## 👥 Roles

### 🧑 User Side

- Connect wallet (using ethers.js v6)
- Upload identity document and generate SHA3-256 hash
- Store document hash on blockchain for verification
- Generate QR code for authorized verifiers
- Control access to personal identity data

### 🕵️ Verifier Side

- Scan QR code (if authorized and registered on-chain)
- Access on-chain verification data and document proofs
- View verifier credentials stored on blockchain
- Trustless document verification through SHA3-256 hash comparison
- No need to store user data locally

### 👑 Owner/Admin Side

- Add/remove authorized verifiers to on-chain registry
- Store verifier credentials and details on blockchain
- Control system access permissions
- Manage decentralized verification network

## 🔒 Security & Privacy

- Only SHA3-256 document hashes are stored on-chain — not the actual documents
- **On-chain Verifier Registry**: All verifier details stored on blockchain for transparency
- **Cryptographic Document Integrity**: SHA3-256 ensures tamper-proof document verification
- Owner-controlled verifier access system for enhanced security
- Future zk-SNARKs / zero-knowledge proofs for enhanced privacy
- QR codes provide secure verification access to on-chain data
- Self-sovereign control - users own their identity data
- Decentralized storage coming soon for enhanced privacy

## 🗺️ Development Roadmap

### Phase 1 (Current) ✅
- [x] Sepolia testnet deployment and testing
- [x] zkSync Era code implementation
- [ ] zkSync Era final testing and deployment

### Phase 2 (Next 2-4 weeks) 🔄
- [ ] Ethereum mainnet production deployment
- [ ] IPFS/Arweave decentralized storage integration
- [ ] Mobile app (React Native) launch

### Phase 3 (Future) 📋
- [ ] zk-SNARK privacy features implementation
- [ ] Multi-chain support (Polygon, Arbitrum)
- [ ] Enterprise integrations and APIs
- [ ] Advanced verification workflows

## 📦 Dependencies

### 📝 Contracts

- `solidity ^0.8.x`
- **Access Control**: Owner-based verifier management system

### 💻 Frontend

- `react`, `react-router-dom`, `tailwindcss`
- `ethers` v6 — Ethereum and zkSync interaction with built-in wallet connection

## 📱 Mobile App (Coming Soon)

React Native mobile application in active development featuring:
- Native wallet integration
- Camera-based document scanning
- QR code generation and scanning
- Cross-platform support (iOS & Android)

## 🌐 Decentralized Storage Integration (Planned)

Upcoming integration with:
- **IPFS** for distributed file storage
- **Arweave** for permanent data archival
- Enhanced privacy with off-chain document storage
- Reduced on-chain gas costs

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

## 📜 License
MIT License

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Note**: This project is actively under development. The Sepolia testnet version is fully functional, with zkSync Era and Ethereum mainnet deployments coming very soon. Mobile app and decentralized storage features are in active development.