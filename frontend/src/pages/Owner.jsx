import React, { useState, useEffect } from "react";
import { Wallet, Plus, X } from "lucide-react";
import { getContract } from "../utils/contract"; // make sure this function returns a connected ethers.js contract
import { useNavigate } from "react-router-dom";

const OwnerPage = () => {
  const [wallets, setWallets] = useState([
    "0x1a2B3c4d5E6F7g8H9i0J1k2L3m4N5o6P7q8R9s0T",
    "0xAbCdEfGhIjKlMnOpQrStUvWxYz1234567890aBcD",
  ]);
  const [newWallet, setNewWallet] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [checking, setChecking] = useState(true);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // ✅ Check if the connected wallet is the contract owner
  useEffect(() => {
    const checkIfOwner = async () => {
      try {
        const storedAddress = localStorage.getItem("address");
        if (!storedAddress) {
          setIsOwner(false);
          return; // Not logged in through your UI
        }

        const result = await getContract(false);
        if (!result) {
          setIsOwner(false);
          return;
        }

        const { contract, signerAddress } = result;
        const owner = await contract.owner();

        if (signerAddress.toLowerCase() === owner.toLowerCase()) {
          setIsOwner(true);
          try {
            const verifierList = await contract.getAllVerifiers();
            setWallets(verifierList);
          } catch (error) {
            console.error("Failed to fetch verifiers", error);
          }
        } else {
          setIsOwner(false);
        }
      } catch (err) {
        console.error("Error checking owner:", err);
        setIsOwner(false);
      } finally {
        setChecking(false);
      }
    };

    checkIfOwner();
  }, []);

  const handleAddWallet = async () => {
    if (!newWallet || wallets.includes(newWallet)) return;

    try {
      const { contract } = await getContract();
      const tx = await contract.addVerifier(newWallet);
      await tx.wait();

      const verifierList = await contract.getAllVerifiers();
      setWallets(verifierList);

      setStatus(`✅ Verifier ${newWallet} added`);
      setNewWallet("");
    } catch (error) {
      console.error("Add verifier failed:", error);
      setStatus("❌ Failed to add verifier");
    }
  };

  const handleRemoveWallet = async (walletToRemove) => {
    try {
      const { contract } = await getContract();
      const tx = await contract.removeVerifier(walletToRemove);
      await tx.wait();

      const verifierList = await contract.getAllVerifiers();
      setWallets(verifierList);

      setStatus(`🗑️ Verifier ${walletToRemove} removed`);
    } catch (err) {
      console.error("Error removing verifier:", err);
    }
  };

  // 🟡 Loading state while checking
  if (checking) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Checking access...
      </div>
    );
  }

  // ❌ Not Owner
  if (!isOwner) {
    return (
      <div className="min-h-screen bg-black text-red-400 flex items-center justify-center text-center px-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          <p className="text-gray-300">You are not the contract owner.</p>
        </div>
      </div>
    );
  }

  // ✅ Owner View
  return (
    <div className="bg-neutral-950 min-h-screen text-white p-4 sm:p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Wallet Management
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Add or remove authorized Web3 wallet addresses that can interact
            with your documents.
          </p>
        </header>

        {/* Main */}
        <main className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-lg">
          {/* Add Wallet */}
          <div className="mb-8">
            <label
              htmlFor="wallet-address"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Add New Wallet Address
            </label>
            <div className="flex space-x-2">
              <input
                type="text"
                id="wallet-address"
                value={newWallet}
                onChange={(e) => setNewWallet(e.target.value)}
                placeholder="0x..."
                className="flex-grow bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 rounded-lg flex items-center justify-center transition-colors shrink-0"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>

          {/* Wallet List */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Wallet className="w-6 h-6 mr-3 text-blue-400" />
              Authorized Wallets
            </h2>
            <div className="max-h-64 overflow-y-auto space-y-3 pr-2">
              {wallets.length > 0 ? (
                wallets.map((wallet, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-700/60 p-3 rounded-lg group"
                  >
                    <p className="text-sm font-mono truncate text-gray-300 group-hover:text-white transition-colors">
                      {wallet}
                    </p>
                    <button
                      onClick={() => handleRemoveWallet(wallet)}
                      className="text-gray-500 hover:text-red-400 transition-colors shrink-0 ml-4"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No wallets added yet.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OwnerPage;
