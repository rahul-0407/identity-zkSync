"use client";

import { useState, useEffect, useContext } from "react";
import {
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { TestContext } from "../context/TestContext";

// Reduced to just 4 wallet options
const wallets = [
  {
    id: "metamask",
    name: "MetaMask",
    description: "Connect using browser extension",
    icon: "🦊",
    enabled: true,
    popular: true,
  },
  {
    id: "walletconnect",
    name: "WalletConnect",
    description: "Connect using mobile wallet",
    icon: "📱",
    enabled: false,
  },
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    description: "Connect using Coinbase",
    icon: "🔵",
    enabled: false,
  },
  {
    id: "trust",
    name: "Trust Wallet",
    description: "Connect using Trust Wallet",
    icon: "🛡️",
    enabled: false,
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const {
    selectedWallet,
    isConnecting,
    connect,
    setSelectedWallet,
    walletAddress,
    setIsConnecting,
    isAuthenticated,
  } = useContext(TestContext);
  const [error, setError] = useState(null);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);

  const wallet = localStorage.getItem("address");

  useEffect(() => {
    if (walletAddress && isAuthenticated) {
      navigate("/document");
    }
  }, [walletAddress, isAuthenticated, navigate]);

  //   useEffect(() => {
  //     const wallet = localStorage.getItem("address")
  //     if (wallet) {
  //       navigate("/document")
  //     }
  //   }, [navigate])

  // Check for MetaMask on component mount
  useEffect(() => {
    const checkMetaMask = () => {
      if (typeof window !== "undefined") {
        const isInstalled =
          typeof window.ethereum !== "undefined" && window.ethereum.isMetaMask;
        setIsMetaMaskInstalled(isInstalled);
        return isInstalled;
      }
      return false;
    };

    checkMetaMask();
  }, []);

  const handleWalletConnect = async (walletId) => {
    if (walletId !== "metamask") return;

    setError(null);
    setSelectedWallet(walletId);

    const success = await connect(); // This handles isConnecting internally

    if (success) {
      window.location.href = "/document"; // Redirect after spinner stops
    } else {
      setError("Failed to connect. Please try again.");
      setSelectedWallet(null);
    }
  };

  const installMetaMask = () => {
    window.open("https://metamask.io/download/", "_blank");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 sm:p-6">
      {/* Background Effects - contained within the viewport */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden"></div>
      <div className="fixed top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="fixed bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>

      <div className="relative z-10 w-full max-w-md bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        {/* Header - More compact */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">I</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-white">Identity³</h1>
              <p className="text-xs text-gray-400">
                Secure • Decentralized • Yours
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-white mb-2">
            Connect Your Wallet
          </h2>
          <p className="text-sm text-gray-400">
            Connect your wallet to access your secure digital identity vault
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-800 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-red-400 font-medium mb-1">
                  Connection Failed
                </h4>
                <p className="text-sm text-red-300">{error}</p>
                {!isMetaMaskInstalled && (
                  <button
                    onClick={installMetaMask}
                    className="mt-3 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    Install MetaMask
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Wallet Options - Reduced to 4 */}
        <div className="space-y-3 mb-6">
          {wallets.map((wallet) => (
            <button
              key={wallet.id}
              onClick={() => handleWalletConnect(wallet.id)}
              disabled={!wallet.enabled || isConnecting}
              className={`w-full p-3 rounded-xl border transition-all duration-200 text-left relative ${
                wallet.enabled
                  ? "bg-gray-900/50 border-gray-700 hover:bg-gray-800/60 hover:border-gray-600 cursor-pointer"
                  : "bg-gray-900/20 border-gray-800 cursor-not-allowed opacity-50"
              } ${
                selectedWallet === wallet.id
                  ? "border-blue-500 bg-blue-600/10"
                  : ""
              }`}
            >
              {/* Popular Badge */}
              {wallet.popular && (
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 bg-blue-600/20 text-blue-400 border border-blue-600/30 rounded-full text-xs font-medium">
                    Popular
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-xl">
                  {wallet.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-white">{wallet.name}</h3>
                    {wallet.enabled ? (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    ) : (
                      <Clock className="w-4 h-4 text-gray-500" />
                    )}
                  </div>
                  <p className="text-xs text-gray-400">{wallet.description}</p>
                </div>
                {wallet.enabled && (
                  <div className="text-gray-400">
                    {selectedWallet === wallet.id && isConnecting ? (
                      <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5" />
                    )}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* MetaMask Installation Notice */}
        {!isMetaMaskInstalled && (
          <div className="bg-yellow-900/20 border border-yellow-800 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="text-yellow-400 font-medium mb-1">
                  MetaMask Not Detected
                </h4>
                <p className="text-sm text-yellow-300 mb-3">
                  MetaMask extension is required to connect. Please install it
                  to continue.
                </p>
                <button
                  onClick={installMetaMask}
                  className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Install MetaMask
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Security Notice - More compact */}
        <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-white font-medium mb-1">Secure Connection</h4>
              <p className="text-xs text-gray-400">
                Your wallet connection is encrypted and secure. We never store
                your private keys or have access to your funds.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500 mb-4">
            By connecting, you agree to our{" "}
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              Privacy Policy
            </Link>
          </p>

          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
