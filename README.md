# Chessellar - Onchain Chess on Stellar

**Chessellar** is a modern, decentralized chess application built on the **Stellar** blockchain. It enables players to engage in PvP chess matches, tracked and resolved using **Soroban** smart contracts, with XLM wagers on the line.

## 🏗️ Project Structure

The repository is organized into a monorepo containing both the frontend web application and the Soroban smart contracts.

```text
chessellar/
├── frontend/      # React + Vite + Tailwind CSS v4 web application
└── contract/      # Soroban project with Rust smart contracts
```

## 🚀 Quick Start

### 1. Running the Frontend

The frontend is a modern React application powered by Vite, providing the chess logic, UI, and Stellar wallet integration.

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Your client will be running locally at `http://localhost:5173`.

### 2. Developing the Smart Contract

The core game logic and XLM wagering system are managed by a Soroban smart contract. You need the `stellar` CLI installed to interact with it.

```bash
cd contract

# Build the contract
stellar contract build
```

## 🛠️ Tech Stack

- **Frontend**: React + Vite + TypeScript + Tailwind CSS v4
- **State Management**: `chess.js` for game logic, React `useState` for UI state.
- **Wallet**: Stellar Freighter Wallet (Planned)
- **Contract**: Rust + Soroban
- **Styling**: Premium Dark Theme with Glassmorphism

## 🌟 Key Features

- ⚡ **Instant Feedback**: Playable in the browser with local move validation using `chess.js`.
- 🔒 **Secure Wagering**: Funds are escrowed in the Soroban smart contract and only released upon game resolution.
- 📜 **Onchain State**: Every game is tracked on the Stellar ledger, ensuring transparency and trust.
- 🎨 **Premium UI**: Modern dark theme with smooth animations and a responsive design.

## 📝 Deployed Contracts (Testnet)

*To be updated upon deployment.*

---

Ready to build the future of onchain gaming? Jump into the `frontend/` and `contract/` directories to begin! 🚀
