import React, { createContext, useState } from 'react';
import { ethers } from "ethers";

export const TestContext = createContext();

const TestContextProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(localStorage.getItem("address")|| "");
  const [selectedWallet, setSelectedWallet] = useState(null)
  const [isConnecting, setIsConnecting] = useState(false)
  
    async function getProviderAndSigner() {
      if (typeof window.ethereum === "undefined") {
        alert("Please install MetaMask");
        throw new Error("MetaMask not installed");
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      return { provider, signer };
    }
  
    async function connect() {
      setIsConnecting(true); // Start spinner
      try {
        const { signer } = await getProviderAndSigner();
        const address = await signer.getAddress();
        console.log(`Connected to ${address}`);
        setWalletAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        localStorage.setItem("address", `${address.slice(0, 6)}...${address.slice(-4)}`);
        return true; // Signal successful connection
      } catch (error) {
        console.error("Connection failed:", error);
        setWalletAddress("Connection failed");
        return false;
      } finally {
        setIsConnecting(false); // Stop spinner
      }
    }
    
  const v1 = "hii";
  const value = { walletAddress,setWalletAddress,connect, selectedWallet, setSelectedWallet, isConnecting, setIsConnecting};

  return (
    <TestContext.Provider value={value}>
      {children}
    </TestContext.Provider>
  );
};

export default TestContextProvider;
