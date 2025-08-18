import React, { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/contract";
import axios from "axios";

export const TestContext = createContext();

const TestContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(
    localStorage.getItem("address") || ""
  );
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [document, setDocuments] = useState([]);

  // async function getProviderAndSigner() {
  //   if (typeof window.ethereum === "undefined") {
  //     alert("Please install MetaMask");
  //     throw new Error("MetaMask not installed");
  //   }

  //   // Request connection
  //   await window.ethereum.request({ method: "eth_requestAccounts" });

  //   // Optional: force switch to Sepolia (change chainId as needed)
  //   await window.ethereum.request({
  //     method: "wallet_switchEthereumChain",
  //     params: [{ chainId: "0xaa36a7" }],
  //   });

  //   const provider = new ethers.BrowserProvider(window.ethereum);
  //   const signer = await provider.getSigner();
  //   return { provider, signer };
  // }

  async function connect() {
    setIsConnecting(true);
    try {
      // This forces MetaMask connect popup
      const result = await getContract(true);
      if (!result) return false;

      const { signerAddress } = result;
      setWalletAddress(signerAddress);
      localStorage.setItem("address", signerAddress);

      return true;
    } catch (error) {
      console.error("Connection failed:", error);
      setWalletAddress("Connection failed");
      return false;
    } finally {
      setIsConnecting(false);
    }
  }

  useEffect(() => {
    if (!walletAddress) return;

    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/v1/documents/${walletAddress}`)
      .then((res) => setDocuments(res.data.documents))
      .catch(console.error);
  }, [walletAddress]);

  const v1 = "hii";
  const value = {
    walletAddress,
    setWalletAddress,
    connect,
    selectedWallet,
    setSelectedWallet,
    isConnecting,
    setIsConnecting,
    document,
    setDocuments,
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestContextProvider;
