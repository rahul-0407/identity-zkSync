import React, { useState, useRef } from "react";
import { Camera, Upload, QrCode, CheckCircle, Scan } from "lucide-react";
import VerificationHistory from "../components/VerificationHistory";
import { getContract } from "../utils/contract";
import axios from "axios"
import { ethers } from "ethers";
import {QrScanner } from "qr-scanner"

const VerifierPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [docMeta, setDocMeta] = useState();
  // You would add your useState and useEffect hooks for scanning logic here.
  // For now, this is just the UI component.

  const successAudioRef = useRef(null);

  const startScan = async () => {
    try {
      const qrHash = await scanQRCodeSomehow(); // camera-based scanning
      if (!qrHash) throw new Error("No QR code detected");
      console.log(qrHash);
      // handleScanOrUpload(qrHash.trim());
    } catch (err) {
      alert("Error scanning QR: " + err.message);
    }
  };

  const handleFileUpload = async (event) => {
    try {
      const file = event.target.files[0];
      if(!file) return;

      const qrContent = await QrScanner.scanImage(file);
      if (!qrContent) throw new Error("No QR code detected in image");

      console.log(qrContent);

      // handleScanOrUpload(qrContent.trim());
    } catch (error) {
      alert("Error reading QR from image: " + err.message);
    }
  }

  const handleScanOrUpload = async (docId) => {
    try {
      setIsModalOpen(true);
      setIsProcessing(true);
      setIsSuccess(false);

      // 1️⃣ Get document metadata from backend
      const metaRes = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/auth/v1/metadataByHash/${docId}`
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

      // 2️⃣ Get contract instance (no need to reconnect if already connected)
      const result = await getContract(false);
      if (!result) {
        throw new Error("Wallet not connected");
      }
      const { contract } = result; 

      const ownershipValid = await contract.verifyHash(
        bytes32Hash,
        metadata.ownerAddress
      );

      const docValid = await contract.verifyDocument(
        metadata.ownerAddress,
        bytes32Hash
      );

      // 4️⃣ Update UI based on blockchain result
      setIsProcessing(false);
      if (ownershipValid && docValid) {
        setIsSuccess(true);
        successAudioRef.current?.play();
      } else {
        setIsSuccess(false);
        alert("Document not verified on blockchain!");
      }
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
      alert(`Error: ${err.message}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsSuccess(false);
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
                onChange={startScan}
              />
            </div>
          </div>

          {/* Verification Results Box */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
              Verification Results
            </h2>
            {/* This is the initial "empty" state */}
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
              <QrCode className="w-24 h-24 mb-4" />
              <p className="font-medium">No scan results yet</p>
              <p className="text-sm">
                Scan a QR code to see verification results here
              </p>
            </div>
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

      {/* Modal for Processing & Success */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-500">
          <div className="bg-gray-900 rounded-xl p-8 max-w-sm w-full text-center relative">
            {isProcessing && (
              <>
                <div className="mb-4">
                  {/* Spinning circle loader */}
                  <svg
                    className="animate-spin mx-auto h-16 w-16 text-blue-500"
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
                </div>
                <p className="text-lg text-gray-300 font-semibold">
                  Processing...
                </p>
              </>
            )}
            {isSuccess && (
              <>
                <CheckCircle className="mx-auto w-20 h-20 text-green-400 animate-bounce mb-4" />
                <p className="text-green-400 font-bold text-xl mb-6">
                  Verification Successful!
                </p>
                <button
                  onClick={closeModal}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg"
                >
                  Close
                </button>
              </>
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
