"use client"

import { useState } from "react"
import {
  Plus,
  FileText,
  Shield,
  Zap,
  Star,
  ArrowRight,
  Upload,
  Download,
  Eye,
  Calendar,
  CheckCircle,
  Clock,
} from "lucide-react"
import {Link} from "react-router-dom"
import { AddDocumentModal } from "../components/ui/add-document-modal"

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

export default function DocumentManager() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      {/* <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Identity³</h1>
                <p className="text-xs text-gray-400 -mt-1">Secure • Decentralized • Yours</p>
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-8">
              <Link href="/documents" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Documents
              </Link>
              <Link href="/verification" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Verification
              </Link>
              <Link href="/settings" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Settings
              </Link>
              <Link href="/help" className="text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Help
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <button className="px-4 py-2 text-gray-300 hover:text-blue-400 font-medium transition-colors">
                Sign In
              </button>
              <Link href="/login">
                <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
                  Login
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium border border-blue-600/30">
                  <Star className="w-4 h-4 mr-2" />
                  Trusted by 50,000+ users worldwide
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Your Digital
                  <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Identity Hub
                  </span>
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Store, verify, and share your important documents with military-grade security. Built on blockchain
                  technology for ultimate trust and transparency.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Document
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>

                <Link href="/login">
                  <button className="inline-flex items-center px-8 py-4 border-2 border-gray-700 hover:border-blue-500 text-gray-300 hover:text-blue-400 rounded-2xl font-semibold transition-all duration-200 hover:bg-blue-600/10">
                    Connect Wallet
                  </button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-2xl font-bold text-white">256-bit</div>
                  <div className="text-sm text-gray-400">Encryption</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Feature Cards */}
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Blockchain Security</h3>
                    <p className="text-gray-400">Immutable and tamper-proof</p>
                  </div>
                </div>
                <div className="bg-green-600/10 border border-green-600/20 rounded-2xl p-4">
                  <div className="text-sm text-green-400">✓ End-to-end encryption</div>
                  <div className="text-sm text-green-400">✓ Zero-knowledge proofs</div>
                  <div className="text-sm text-green-400">✓ Decentralized storage</div>
                </div>
              </div>

              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-3xl p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Instant Verification</h3>
                    <p className="text-gray-400">Verify in seconds, not days</p>
                  </div>
                </div>
                <div className="bg-blue-600/10 border border-blue-600/20 rounded-2xl p-4">
                  <div className="text-sm text-blue-400">⚡ Real-time validation</div>
                  <div className="text-sm text-blue-400">⚡ Global accessibility</div>
                  <div className="text-sm text-blue-400">⚡ API integration</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Your Document Vault</h2>
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

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">I</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Identity³</h1>
                  <p className="text-sm text-gray-400">Secure • Decentralized • Yours</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md mb-6">
                The future of digital identity management. Secure, private, and completely under your control.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-800 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-600/30 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-gray-400 hover:text-blue-400">𝕏</span>
                </button>
                <button className="w-10 h-10 bg-gray-800 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-600/30 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-gray-400 hover:text-blue-400">in</span>
                </button>
                <button className="w-10 h-10 bg-gray-800 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-600/30 rounded-xl flex items-center justify-center transition-colors">
                  <span className="text-gray-400 hover:text-blue-400">📧</span>
                </button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Identity³. All rights reserved.</p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AddDocumentModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  )
}
