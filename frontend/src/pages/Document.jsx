import React,{useState} from "react";
import { Card, CardContent } from "../components/ui/Card";
import DocumentDropdown from "../components/ui/DocumentDropdown";
import { Button, buttonVariants } from "../components/ui/Button";
import { AddDocumentModal } from "../components/AddDocumet"
import {Navigate} from "react-router-dom"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/Dropdown";
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
  const documents = [
    {
      id: 1,
      name: "Identity Verification Certificate",
      type: "Certificate",
      createdAt: "2024-01-15",
      size: "2.4 MB",
      status: "Verified",
      color: "from-emerald-500 to-teal-600",
    },
    {
      id: 2,
      name: "Digital Passport",
      type: "Passport",
      createdAt: "2024-01-10",
      size: "1.8 MB",
      status: "Verified",
      color: "from-blue-500 to-indigo-600",
    },
    {
      id: 3,
      name: "Academic Credentials",
      type: "Education",
      createdAt: "2024-01-08",
      size: "3.2 MB",
      status: "Pending",
      color: "from-purple-500 to-pink-600",
    },
    {
      id: 4,
      name: "Professional License",
      type: "License",
      createdAt: "2024-01-05",
      size: "1.5 MB",
      status: "Verified",
      color: "from-orange-500 to-red-600",
    },
    {
      id: 5,
      name: "Medical Records",
      type: "Health",
      createdAt: "2024-01-03",
      size: "4.1 MB",
      status: "Verified",
      color: "from-cyan-500 to-blue-600",
    },
    {
      id: 6,
      name: "Financial Statement",
      type: "Finance",
      createdAt: "2024-01-01",
      size: "2.7 MB",
      status: "Verified",
      color: "from-yellow-500 to-orange-600",
    },
  ]
  // const wallet = localStorage.getItem("address");

  // if (!wallet) {
  //   return <Navigate to="/login" replace />;
  // }

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

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
      <hr className="bg-gray-600 h-0.5 w-[70%] m-auto"/>

      {/* Documents Section */}
      <section className="py-20 px-6 bg-neutral-950">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="bg-gradient-to-tl from-indigo-400 via-pink-100 to-gray-100 text-transparent bg-clip-text text-5xl font-bold  mb-4">Your Document Vault</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Securely store and manage all your important documents in one place
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg">
            <div className="flex items-center space-x-4 mb-4 sm:mb-0">
              <div className="text-2xl font-bold text-white">{documents.length}</div>
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
          {documents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {documents.map((document, index) => (
                <div
                  key={document.id}
                  className="group bg-gray-800/40 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:bg-gray-800/60 hover:border-gray-600 transition-all duration-300 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Document Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div
                      className={`w-14 h-14 bg-gradient-to-br ${document.color} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <FileText className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex items-center space-x-2">
                      {document.status === "Verified" ? (
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
                      {document.name}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="font-medium mr-2 text-gray-300">Type:</span>
                        <span>{document.type}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>
                          {new Date(document.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <span className="font-medium mr-2 text-gray-300">Size:</span>
                        <span>{document.size}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-600/30 rounded-xl text-sm font-medium transition-all duration-200">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-700/50 hover:bg-gray-700/70 text-gray-300 border border-gray-600 rounded-xl text-sm font-medium transition-all duration-200">
                      <Download className="w-4 h-4 mr-2" />
                      Download
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
              <h3 className="text-2xl font-semibold text-white mb-4">No documents yet</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Start building your secure digital vault by uploading your first document
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
      {/* <AddDocumentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} /> */}
    </div>
  );
};

export default Document;
