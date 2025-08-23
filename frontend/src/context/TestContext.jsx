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
  const [chainDocuments, setChainDocuments] = useState([]);
    const [loadingChainData, setLoadingChainData] = useState(false);

  // NEW: User authentication state
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("userData");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

  // Updated connect function
  async function connect() {
    setIsConnecting(true);
    try {
      // Step 1: Connect to MetaMask (your existing logic)
      const result = await getContract(true);
      if (!result) return false;

      const { signerAddress } = result;
      setWalletAddress(signerAddress);
      localStorage.setItem("address", signerAddress);

      // Step 2: Authenticate with backend and create Web3.Storage space
      await authenticateUser(signerAddress);

      return true;
    } catch (error) {
      console.error("Connection failed:", error);
      setWalletAddress("Connection failed");
      return false;
    } finally {
      setIsConnecting(false);
    }
  }

  const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // NEW: Backend authentication
  const authenticateUser = async (walletAddress) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/v1/connectWallet`,
        { walletAddress },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.success) {
        const { user, token } = response.data; // Backend returns user data + auth token

        setUser(user);
        setIsAuthenticated(true);

        if (token) {
          setAuthToken(token);
          localStorage.setItem("authToken", token);
        }

        // Store user data
        localStorage.setItem("userData", JSON.stringify(user));

        // console.log("User authenticated:", user);
        return user;
      }
    } catch (error) {
      console.error("Authentication failed:", error);
      setUser(null);
      setIsAuthenticated(false);
      setAuthToken("");
      localStorage.removeItem("userData");
      localStorage.removeItem("authToken");
      throw error;
    }
  };

  // NEW: Disconnect function
  const disconnect = () => {
    setWalletAddress("");
    setUser(null);
    setIsAuthenticated(false);
    setAuthToken("");
    setDocuments([]);
    localStorage.removeItem("address");
    localStorage.removeItem("userData");
    localStorage.removeItem("authToken");
  };

  // Updated: Load documents with authentication
  useEffect(() => {
    if (!walletAddress) return;
    loadUserDocuments();
  }, [walletAddress, authToken]);

  const loadUserDocuments = async () => {
    try {
      // Option A: Use existing endpoint (if no auth required)
      const response = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/auth/v1/documents/${walletAddress}`,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.data.success) {
        setDocuments(response.data.documents);
        console.log(response.data.documents);
      }
    } catch (error) {
      console.error("Failed to load documents:", error);
    }
  };

  const getDataFromChain = async () => {
      try {
        setLoadingChainData(true);
        const { contract } = await getContract(false); // false = read-only call
  
        // Fetch docs for connected wallet (msg.sender inside contract)
        const docs = await contract.getDocuments();
  
        const parsedDocs = docs.map((doc, i) => ({
          id: i + 1,
          docType: doc.docType,
          timestamp: new Date(Number(doc.timestamp) * 1000).toLocaleString(),
          docHash: doc.docHash,
        }));
  
        setChainDocuments(parsedDocs);
        console.log("Documents from contract:", parsedDocs);
      } catch (error) {
        console.error("Failed to load documents from contract:", error);
      } finally {
        setLoadingChainData(false);
      }
    };

  // const loadUserDocuments =() => {
  //   console.group("hello")
  // }

  // Check if user is already connected on app load
  useEffect(() => {
    const checkConnection = async () => {
      const savedAddress = localStorage.getItem("address");
      const savedUser = localStorage.getItem("userData");
      const savedToken = localStorage.getItem("authToken");

      if (savedAddress && savedUser) {
        try {
          // Verify the MetaMask connection is still valid
          const result = await getContract(false);
          if (result && result.signerAddress === savedAddress) {
            setWalletAddress(savedAddress);
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
            if (savedToken) {
              setAuthToken(savedToken);
            }
          } else {
            // Connection lost, clear saved data
            disconnect();
          }
        } catch (error) {
          console.error("Failed to restore connection:", error);
          disconnect();
        }
      }
    };

    checkConnection();
  }, []);

  const value = {
    // Existing values
    walletAddress,
    setWalletAddress,
    connect,
    selectedWallet,
    setSelectedWallet,
    isConnecting,
    setIsConnecting,
    document,
    setDocuments,

    // NEW values for authentication
    user, // { id, walletAddress, userDID, spaceName }
    isAuthenticated, // boolean
    authToken, // JWT token or session identifier
    disconnect, // function to disconnect
    loadUserDocuments, // function to reload documents
    authenticateUser,setChainDocuments, getDataFromChain, loadingChainData, chainDocuments // function to authenticate user
  };

  return <TestContext.Provider value={value}>{children}</TestContext.Provider>;
};

export default TestContextProvider;
