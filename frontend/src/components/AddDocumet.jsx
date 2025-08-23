"use client";

import { useState, useRef, useContext } from "react";
import { Upload, FileText, X, AlertCircle } from "lucide-react";
import { getContract } from "../utils/contract";
import { TestContext } from "../context/TestContext";
import axios from "axios";

const documentCategories = {
  Medical: ["Medical Certificate", "Health Report", "Prescription"],
  License: ["Driving License", "Pilot License", "Fishing License"],
  Card: ["Aadhar Card", "PAN Card", "Voter Card"],
  Passport: ["Passport"],
  Certificates: [
    "Degree Certificate",
    "Training Certificate",
    "Experience Certificate",
  ],
  Finance: ["ITR", "Bank Statement", "Financial Statement"],
};

export function AddDocumentModal({ isOpen, onClose }) {
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const fileInputRef = useRef(null);

  // Get authentication data from context
  const {
    walletAddress,
    user,
    isAuthenticated,
    authToken,
    connect,
    isConnecting,
    loadUserDocuments,
  } = useContext(TestContext);

  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        setUploadStatus("Please select a PDF, PNG, or JPG file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
        setUploadStatus("");
      } else {
        setUploadStatus("Please select a PDF, PNG, or JPG file.");
        e.target.value = "";
      }
    }
  };

  // OPTION 2: Direct API call with authentication
  const handleUpload = async () => {
    setUploadStatus("");

    // Validation
    if (!documentType || !documentName || !selectedFile) {
      setUploadStatus("Please fill in all fields and select a valid file.");
      return;
    }

    if (!isAuthenticated) {
      setUploadStatus("Please connect your wallet first.");
      return;
    }

    setIsUploading(true);
    setUploadStatus("Uploading to your Web3.Storage space...");

    try {
      const formData = new FormData();
      formData.append("image0", selectedFile);
      formData.append("documentType", documentType);
      formData.append("name", documentName);
      // NO ownerAddress needed - backend gets it from authentication

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/v1/uploadFile`,
        formData,
        {
          withCredentials: true,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (!response.data.success) {
        setUploadStatus("Upload failed: " + response.data.msg);
        return;
      }

      const { hash, url, docId } = response.data;
      console.log("Upload successful:", { hash, url, docId });

      // setUploadStatus(`✅ Document uploaded successfully! CID: ${ipfsCid}`);

      // Optional: Register on smart contract
      setUploadStatus(`📤 Uploading "${documentName}"...`);
      const { contract } = await getContract(true);
      const tx = await contract.uploadAndRegisterDocument(documentName, hash);
      await tx.wait();
      setUploadStatus(`✅ Uploaded & registered on-chain!`);
      setUploadStatus(`✅ Uploaded & registered on-chain!`);

      // Reload documents list
      await loadUserDocuments();

      // Reset form
      resetForm();

      // Close modal after success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Upload error:", error);
      const errorMsg = error.response?.data?.msg || error.message;
      setUploadStatus(`❌ Upload failed: ${errorMsg}`);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setDocumentType("");
    setDocumentName("");
    setSelectedFile(null);
    setUploadStatus("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md mx-4 bg-gray-900 border border-gray-700 rounded-lg shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <Upload className="w-5 h-5 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">
                Add New Document
              </h2>
            </div>
            <p className="text-sm text-gray-400">
              Upload a document to your secure Web3.Storage space.
            </p>
          </div>

          {/* Authentication Status */}
          {!isAuthenticated ? (
            <div className="mb-6 p-4 bg-yellow-900/20 border border-yellow-600 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <AlertCircle className="w-4 h-4" />
                <span className="font-medium">Wallet Not Connected</span>
              </div>
              <p className="text-sm text-yellow-300 mb-3">
                Connect your wallet to upload documents to your personal
                Web3.Storage space.
              </p>
              <button
                onClick={connect}
                disabled={isConnecting}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-gray-600 text-white text-sm rounded transition-colors"
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </button>
            </div>
          ) : (
            <div className="mb-4 p-3 bg-green-900/20 border border-green-600 rounded-lg">
              <div className="text-green-400 text-sm">
                <p>
                  <strong>Connected:</strong> {walletAddress?.slice(0, 6)}...
                  {walletAddress?.slice(-4)}
                </p>
                {user?.spaceName && (
                  <p>
                    <strong>Space:</strong> {user.spaceName}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Document Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
                setDocumentName("");
              }}
              disabled={!isAuthenticated}
              className="w-full h-10 px-3 bg-gray-800 border border-gray-600 rounded-md text-white disabled:opacity-50"
            >
              <option value="">Select Type</option>
              {Object.keys(documentCategories).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Document Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Document Name
            </label>
            <select
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              disabled={!documentType || !isAuthenticated}
              className="w-full h-10 px-3 bg-gray-800 border border-gray-600 rounded-md text-white disabled:opacity-50"
            >
              <option value="">Select Document</option>
              {documentType &&
                documentCategories[documentType].map((doc) => (
                  <option key={doc} value={doc}>
                    {doc}
                  </option>
                ))}
            </select>
          </div>

          {/* File Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Upload Document
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                dragActive
                  ? "border-blue-400 bg-blue-400/10"
                  : selectedFile
                  ? "border-green-400 bg-green-400/10"
                  : "border-gray-600 bg-gray-800/50"
              } ${!isAuthenticated ? "opacity-50" : ""}`}
              onDragEnter={isAuthenticated ? handleDrag : undefined}
              onDragLeave={isAuthenticated ? handleDrag : undefined}
              onDragOver={isAuthenticated ? handleDrag : undefined}
              onDrop={isAuthenticated ? handleDrop : undefined}
            >
              {!selectedFile ? (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="text-white mb-2">
                    <span className="font-medium">Click to upload</span> or drag
                    and drop
                  </div>
                  <p className="text-sm text-gray-400">
                    PDF, PNG, or JPG files (Max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf,image/png,image/jpeg"
                    onChange={handleFileChange}
                    disabled={!isAuthenticated}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-gray-400">
                        {formatFileSize(selectedFile.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upload Status */}
          {uploadStatus && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                uploadStatus.includes("✅")
                  ? "bg-green-900/20 border border-green-600 text-green-300"
                  : uploadStatus.includes("❌")
                  ? "bg-red-900/20 border border-red-600 text-red-300"
                  : "bg-blue-900/20 border border-blue-600 text-blue-300"
              }`}
            >
              {uploadStatus}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={
                !isAuthenticated ||
                !documentType.trim() ||
                !documentName.trim() ||
                !selectedFile ||
                isUploading
              }
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading to Web3.Storage...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  {isAuthenticated
                    ? "Upload to Web3.Storage"
                    : "Connect Wallet First"}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
