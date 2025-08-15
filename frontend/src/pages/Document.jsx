import React, { useContext, useEffect, useState } from "react";
import { TestContext } from "../context/TestContext";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent } from "../components/ui/Card";
import DocumentDropdown from "../components/ui/DocumentDropdown";
import { Button, buttonVariants } from "../components/ui/Button";
import { AddDocumentModal } from "../components/AddDocumet";
import { Navigate } from "react-router-dom";
import {
  Plus,
  MoreVertical,
  QrCode,
  Trash2,
  FileText,
  Shield,
  Users,
  CheckCircle,
  Calendar,
  Eye,
  Download,
  Clock,
  Zap,
} from "lucide-react";

const Document = () => {
  const { document } = useContext(TestContext);
  const wallet = localStorage.getItem("address");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDocQR, setSelectedDocQR] = useState(null);

  useEffect(() => {
    console.log(document[0]);
  }, [document]);

  if (!wallet) {
    return <Navigate to="/login" replace />;
  }

  if (!document.length) {
    return <p>No documents uploaded yet.</p>;
  }

  return (
    <div className="bg-neutral-950 min-h-screen">
      {/* Hero Section */}
      <section className="pb-20 pt-25  px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300 mb-6">
              Document Management
            </div>
            <h1 className=" bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text text-5xl md:text-6xl font-bold mb-6 ">
              Secure Your Digital Documents,
              <br />
              Verify Anywhere, Anytime
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              With self-sovereign identity, you control your documents—securely
              store, share, and prove authenticity, anytime, anywhere, on-chain
              and on demand.
            </p>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Secure Storage</h3>
                <p className="text-sm text-gray-400">
                  End-to-end encrypted document storage
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">QR Verification</h3>
                <p className="text-sm text-gray-400">
                  Instant document verification via QR codes
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Easy Sharing</h3>
                <p className="text-sm text-gray-400">
                  Share documents securely with anyone
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold mb-2">Instant Access</h3>
                <p className="text-sm text-gray-400">
                  Access your documents from anywhere
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr className="bg-gray-600 h-0.5 w-[70%] m-auto" />

      {/* Documents Section */}
      <section className="py-20 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text text-5xl font-bold  mb-4">
              Your Document Vault
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Securely store and manage all your important documents in one
              place
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="text-2xl font-bold text-white">
                {document.length}
              </div>
              <div className="text-gray-400">Documents stored securely</div>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Filter
              </button>
              <button className="px-4 py-2 text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Sort
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Document
              </button>
            </div>
          </div>

          {/* Documents Grid */}
          {document.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {document.map((doc, index) => (
                <div
                  key={doc.id}
                  className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-800/60 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Document Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${doc.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {doc.status === "Verified" ? (
                        <div className="flex items-center px-3 py-1 bg-green-600/20 text-green-400 border border-green-600/30 rounded-full text-xs font-medium">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      ) : (
                        <div className="flex items-center px-3 py-1 bg-yellow-600/20 text-yellow-400 border border-yellow-600/30 rounded-full text-xs font-medium">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Document Info */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {doc.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="font-medium mr-2 text-gray-300">
                          Type:
                        </span>
                        <span>{doc.documentType}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(doc.timestamp).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="font-medium mr-2 text-gray-300">
                          Size:
                        </span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4">
                    <button className="flex-1 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-xl">
                      <Eye className="w-4 h-4 mr-2 inline" /> View
                    </button>
                    <button
                      onClick={() => setSelectedDocQR(doc.id)}
                      className="flex-1 bg-purple-600/20 text-purple-400 px-4 py-2 rounded-xl"
                    >
                      <QrCode className="w-4 h-4 mr-2 inline" /> QR Code
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-gray-700 rounded-3xl flex items-center justify-center mx-auto mb-8">
                <FileText className="w-16 h-16 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">
                No documents yet
              </h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start building your secure digital vault by uploading your first
                document
              </p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Upload Your First Document
              </button>
            </div>
          )}
        </div>
      </section>
      <AddDocumentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* QR Modal */}
      {selectedDocQR && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center  z-500">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Document QR Code</h3>
            <QRCodeSVG
              id={`qr-${selectedDocQR}`}
              value={selectedDocQR} // Only docId stored in QR
              size={200}
              level="H"
              className="m-auto"
            />
            <div className="mt-4 flex justify-center space-x-3">
              <button
                onClick={() => handleDownloadQR(selectedDocQR)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Download
              </button>
              <button
                onClick={() => setSelectedDocQR(null)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Scan this QR or upload it in the verifier page to fetch document
              metadata.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Document;
