import React, { useState, useRef, useEffect } from "react";
import { Camera, Upload, QrCode, CheckCircle, Scan, X } from "lucide-react";
import VerificationHistory from "../components/VerificationHistory";
import { getContract } from "../utils/contract";
import axios from "axios";
import { ethers } from "ethers";
import QrScanner from "qr-scanner";

const VerifierPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [docMeta, setDocMeta] = useState();
  const [scannerError, setScannerError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const successAudioRef = useRef(null);
  const videoRef = useRef(null);
  const scannerRef = useRef(null);

  // Cleanup scanner when component unmounts or modal closes
  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.destroy();
        scannerRef.current = null;
      }
    };
  }, []);

  const startScan = async () => {
    try {
      setIsModalOpen(true);
      setIsProcessing(false);
      setIsSuccess(false);
      setScannerError(null);
      setIsScanning(true);

      // Wait for modal and video to render
      await new Promise((resolve) => setTimeout(resolve, 200));

      if (!videoRef.current) {
        throw new Error("Video element not found");
      }

      // Stop any existing scanner
      if (scannerRef.current) {
        scannerRef.current.destroy();
        scannerRef.current = null;
      }

      // Create new scanner with better options for mobile compatibility
      scannerRef.current = new QrScanner(
        videoRef.current,
        async (result) => {
          console.log("QR Scanned:", result?.data || result);
          
          // Stop scanning immediately after successful scan
          if (scannerRef.current) {
            scannerRef.current.stop();
            setIsScanning(false);
          }

          setIsProcessing(true);
          const qrData = result?.data?.trim() || result.trim();
          logQRResult(qrData)
          // await handleScanOrUpload(qrData);
        },
        {
          onDecodeError: (error) => {
            // Don't log decode errors as they're normal during scanning
            console.debug("QR decode attempt:", error);
          },
          highlightScanRegion: true,
          highlightCodeOutline: true,
          maxScansPerSecond: 5,
          // Better camera selection for mobile
          preferredCamera: 'environment' // Use back camera on mobile
        }
      );

      // Start the scanner
      await scannerRef.current.start();
      console.log("QR Scanner started successfully");

    } catch (err) {
      console.error("Error starting scanner:", err);
      setIsScanning(false);
      setScannerError(`Camera error: ${err.message || err}`);
      
      // Don't close modal immediately, let user see the error
      setTimeout(() => {
        if (!isProcessing && !isSuccess) {
          setIsModalOpen(false);
        }
      }, 3000);
    }
  };

  const logQRResult = async (qrData) => {
  try {
    console.log("Sending QR to backend:", qrData);
    await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/log-qr`, {
      qrData
    });
    console.log("QR logged successfully");
  } catch (err) {
    console.error("Failed to log QR:", err);
  }
};

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop();
      scannerRef.current.destroy();
      scannerRef.current = null;
    }
    setIsScanning(false);
  };

  const handleFileUpload = async (event) => {
    try {
      setIsModalOpen(true);
      setIsProcessing(true);
      setIsSuccess(false);
      setScannerError(null);

      const file = event.target.files[0];
      if (!file) {
        setIsModalOpen(false);
        setIsProcessing(false);
        return;
      }

      console.log("Processing uploaded file:", file.name);
      const qrContent = await QrScanner.scanImage(file);
      
      if (!qrContent) {
        throw new Error("No QR code detected in the uploaded image");
      }

      console.log("QR content from image:", qrContent);
      await handleScanOrUpload(qrContent.trim());

    } catch (error) {
      console.error("File upload error:", error);
      setIsProcessing(false);
      setScannerError(`Error reading QR from image: ${error.message}`);
      
      // Show error for a few seconds then close
      setTimeout(() => {
        setIsModalOpen(false);
        setScannerError(null);
      }, 3000);
    }

    // Reset file input
    event.target.value = '';
  };

  const handleScanOrUpload = async (docId) => {
    try {
      console.log("Starting verification for doc ID:", docId);

      // 1️⃣ Get document metadata from backend
      const metaRes = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/v1/metadataByHash/${docId}`
      );

      if (!metaRes.data.success) {
        throw new Error(metaRes.data.msg || "Document not found in database");
      }

      const metadata = metaRes.data.metadata;
      setDocMeta(metadata);

      const normalizedHash = metadata.hash.startsWith("0x")
        ? metadata.hash
        : "0x" + metadata.hash;

      if (normalizedHash.length !== 66) {
        throw new Error("Invalid document hash format");
      }

      const bytes32Hash = ethers.getBytes(normalizedHash);

      // 2️⃣ Get contract instance
      const result = await getContract(false);
      if (!result) {
        throw new Error("Wallet not connected");
      }
      const { contract } = result;

      // 3️⃣ Verify on blockchain
      const ownershipValid = await contract.verifyHash(
        bytes32Hash,
        metadata.ownerAddress
      );

      const docValid = await contract.verifyDocument(
        metadata.ownerAddress,
        bytes32Hash
      );

      // 4️⃣ Update UI based on verification result
      setIsProcessing(false);
      
      if (ownershipValid && docValid) {
        setIsSuccess(true);
        // Play success sound
        if (successAudioRef.current) {
          successAudioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
        console.log("Document verified successfully!");
      } else {
        setIsSuccess(false);
        setScannerError("Document verification failed - not found on blockchain!");
      }

    } catch (err) {
      console.error("Verification error:", err);
      setIsProcessing(false);
      setScannerError(`Verification failed: ${err.message}`);
    }
  };

  const closeModal = () => {
    stopScanner();
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsSuccess(false);
    setScannerError(null);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white p-4 pt-16 sm:p-8 sm:pt-16">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <header className="text-center py-12">
          <div className="inline-block px-4 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 font-medium mb-4">
            Document Verifier
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Verify Document Authenticity
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Scan QR codes to instantly verify the authenticity and ownership of
            digital documents
          </p>
        </header>

        {/* Main Content: Scanner and Results */}
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* QR Code Scanner Box */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <QrCode className="w-6 h-6 mr-3 text-blue-400" />
              QR Code Scanner
            </h2>
            <div className="space-y-4">
              <button
                onClick={startScan}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
                disabled={isModalOpen}
              >
                <Camera className="w-5 h-5 mr-2" />
                Start Camera Scan
              </button>

              <div className="flex items-center text-gray-500">
                <hr className="w-full border-gray-600" />
                <span className="px-2 text-sm">OR</span>
                <hr className="w-full border-gray-600" />
              </div>

              {/* Styled file input */}
              <label
                htmlFor="qr-upload"
                className="w-full bg-gray-700 hover:bg-gray-600 text-gray-300 font-bold py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer transition-colors"
              >
                <Upload className="w-5 h-5 mr-2" />
                Upload QR Code Image
              </label>
              <input
                type="file"
                id="qr-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          {/* Verification Results Box */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
              Verification Results
            </h2>
            
            {docMeta && isSuccess ? (
              <div className="space-y-4">
                <div className="flex items-center text-green-400 mb-4">
                  <CheckCircle className="w-6 h-6 mr-2" />
                  <span className="font-semibold">Document Verified!</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-400">Owner:</span> {docMeta.ownerAddress?.slice(0, 10)}...</p>
                  <p><span className="text-gray-400">Hash:</span> {docMeta.hash?.slice(0, 10)}...</p>
                  <p><span className="text-gray-400">Type:</span> {docMeta.documentType || 'Unknown'}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <QrCode className="w-24 h-24 mb-4" />
                <p className="font-medium">No scan results yet</p>
                <p className="text-sm">
                  Scan a QR code to see verification results here
                </p>
              </div>
            )}
          </div>
        </main>

        {/* How To Section */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-8">How to Verify Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                <QrCode className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold">1. Get QR Code</h3>
              <p className="text-sm text-gray-400">
                Request or find the document's unique QR code.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                <Scan className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-semibold">2. Scan Code</h3>
              <p className="text-sm text-gray-400">
                Use the camera or upload an image to scan the code.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-semibold">3. View Results</h3>
              <p className="text-sm text-gray-400">
                Instantly see the document's authenticity status.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Enhanced Modal for Processing & Success */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full text-center relative">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
              disabled={isProcessing}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Camera Scanner State */}
            {isScanning && !isProcessing && !isSuccess && !scannerError && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Scan QR Code</h3>
                <video
                  ref={videoRef}
                  className="w-full max-w-sm mx-auto rounded-lg mb-4"
                  autoPlay
                  muted
                  playsInline
                />
                <p className="text-sm text-gray-400">
                  Point your camera at a QR code
                </p>
                <button
                  onClick={closeModal}
                  className="mt-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Processing state */}
            {isProcessing && (
              <div className="flex flex-col items-center py-8">
                <svg
                  className="animate-spin h-16 w-16 text-blue-500 mb-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <p className="text-lg text-gray-300 font-semibold">Verifying Document...</p>
                <p className="text-sm text-gray-500 mt-2">Checking blockchain records</p>
              </div>
            )}

            {/* Success state */}
            {isSuccess && (
              <div className="py-8">
                <CheckCircle className="mx-auto w-20 h-20 text-green-400 animate-bounce mb-4" />
                <h3 className="text-green-400 font-bold text-xl mb-2">
                  Verification Successful!
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Document authenticity confirmed on blockchain
                </p>
                {docMeta && (
                  <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
                    <p className="text-sm"><span className="text-gray-400">Owner:</span> {docMeta.ownerAddress?.slice(0, 20)}...</p>
                    <p className="text-sm"><span className="text-gray-400">Hash:</span> {docMeta.hash?.slice(0, 20)}...</p>
                  </div>
                )}
                <button
                  onClick={closeModal}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg"
                >
                  Close
                </button>
              </div>
            )}

            {/* Error state */}
            {scannerError && (
              <div className="py-8">
                <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <X className="w-8 h-8 text-red-400" />
                </div>
                <h3 className="text-red-400 font-bold text-lg mb-2">Error</h3>
                <p className="text-gray-300 text-sm mb-6">{scannerError}</p>
                <button
                  onClick={closeModal}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <VerificationHistory />

      {/* Hidden audio for success sound */}
      <audio
        ref={successAudioRef}
        src="https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg"
        preload="auto"
      />
    </div>
  );
};

export default VerifierPage;