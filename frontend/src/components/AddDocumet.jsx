"use client";

import { useState, useRef } from "react";
import { Upload, FileText, X } from "lucide-react";
import { getContract } from "../utils/contract";

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

// 4. MODAL RECEIVES PROPS: isOpen and onClose
export function AddDocumentModal({ isOpen, onClose }) {
  const [documentType, setDocumentType] = useState("");
  const [documentName, setDocumentName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];

  // 5. CONDITIONAL RENDERING: If isOpen is false, return nothing
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
        alert("Please select a PDF, PNG, or JPG file.");
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert("Please select a PDF, PNG, or JPG file.");
        e.target.value = "";
      }
    }
  };

  const handleUpload = async () => {
    if (!documentType || !documentName || !selectedFile) {
      alert("Please fill in all fields and select a valid file.");
      return;
    }
    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Uploading:", {
        type: documentType,
        name: documentName,
        file: selectedFile,
      });
      setDocumentType("");
      setDocumentName("");
      setSelectedFile(null);
      onClose();
      alert("Document uploaded successfully!");
    } catch (error) {
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
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

  // 7. MODAL RENDERS: Only when isOpen is true
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
              Upload a PDF document to your secure vault.
            </p>
          </div>

          {/* First Dropdown: Document Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-2">
              Document Type
            </label>
            <select
              value={documentType}
              onChange={(e) => {
                setDocumentType(e.target.value);
                setDocumentName(""); // Reset second dropdown when type changes
              }}
              className="w-full h-10 px-3 bg-gray-800 border border-gray-600 rounded-md text-white"
            >
              <option value="">Select Type</option>
              {Object.keys(documentCategories).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Second Dropdown: Document Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Document Name
            </label>
            <select
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              disabled={!documentType}
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

          {/* File Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">
              Upload PDF Document
            </label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-200 ${
                dragActive
                  ? "border-blue-400 bg-blue-400/10"
                  : selectedFile
                  ? "border-green-400 bg-green-400/10"
                  : "border-gray-600 bg-gray-800/50"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div className="text-white mb-2">
                    <span className="font-medium">Click to upload</span> or drag
                    and drop
                  </div>
                  <p className="text-sm text-gray-400">
                    PDF files only (Max 10MB)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf,image/png,image/jpeg"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-400" />
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

          {/* Buttons */}
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
                !documentType.trim() ||   // must have selected type
                !documentName.trim() ||   // must have selected sub-type
                !selectedFile ||          // must have selected file
                isUploading
              }
                         
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors flex items-center justify-center gap-2"
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload Document
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
