"use client"

import { useState, useRef, useEffect } from "react"
import { Upload, FileText, X } from "lucide-react"

export function AddDocumentModal({ isOpen, onClose }) {
  const [documentName, setDocumentName] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const fileInputRef = useRef(null)

  // Handle smooth animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300) // Wait for animation to complete
      document.body.style.overflow = "unset"
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    }
    return () => document.removeEventListener("keydown", handleEsc)
  }, [isOpen, onClose])

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
      } else {
        alert("Please select a PDF file only.")
      }
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setSelectedFile(file)
      } else {
        alert("Please select a PDF file only.")
        e.target.value = ""
      }
    }
  }

  const handleUpload = async () => {
    if (!documentName.trim() || !selectedFile) {
      alert("Please enter a document name and select a PDF file.")
      return
    }
    setIsUploading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Uploading:", { name: documentName, file: selectedFile })
      setDocumentName("")
      setSelectedFile(null)
      onClose()
      alert("Document uploaded successfully!")
    } catch (error) {
      alert("Upload failed. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  if (!isVisible) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-out ${
        isOpen ? "bg-black/80 backdrop-blur-md opacity-100" : "bg-black/0 backdrop-blur-none opacity-0"
      }`}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className={`relative w-full max-w-md mx-4 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl transition-all duration-300 ease-out transform ${
          isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
        style={{
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Animated Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-full p-1"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="p-6">
          {/* Animated Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-blue-500/20 rounded-lg">
                <Upload className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Add New Document</h2>
            </div>
            <p className="text-sm text-gray-400">Upload a PDF document to your secure digital identity vault.</p>
          </div>

          {/* Document Name Input with Animation */}
          <div className="mb-6">
            <label htmlFor="document-name" className="block text-sm font-medium text-white mb-2">
              Document Name
            </label>
            <input
              id="document-name"
              type="text"
              placeholder="Enter document name (e.g., Passport, License)"
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-gray-500"
            />
          </div>

          {/* Animated File Upload Area */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-2">Upload PDF Document</label>
            <div
              className={`relative border-2 border-dashed rounded-lg p-6 transition-all duration-300 ease-out transform ${
                dragActive
                  ? "border-blue-400 bg-blue-400/10 scale-[1.02]"
                  : selectedFile
                    ? "border-green-400 bg-green-400/10"
                    : "border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-800/70"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!selectedFile ? (
                <div className="text-center">
                  <div className={`transition-transform duration-300 ${dragActive ? "scale-110" : "scale-100"}`}>
                    <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  </div>
                  <div className="text-white mb-2">
                    <span className="font-medium">Click to upload</span> or drag and drop
                  </div>
                  <p className="text-sm text-gray-400">PDF files only (Max 10MB)</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-between animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-600/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{selectedFile.name}</p>
                      <p className="text-sm text-gray-400">{formatFileSize(selectedFile.size)}</p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-all duration-200 hover:scale-110"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Animated Footer Buttons */}
          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-3 gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!documentName.trim() || !selectedFile || isUploading}
              className={`px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2 ${
                !documentName.trim() || !selectedFile || isUploading
                  ? "opacity-50"
                  : "hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/25"
              }`}
            >
              {isUploading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span className="animate-pulse">Uploading...</span>
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
  )
}
