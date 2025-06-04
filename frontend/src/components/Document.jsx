import React from 'react'
import { Card, CardContent } from "./ui/Card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/Dropdown"
import { Plus, MoreVertical, QrCode, Trash2, FileText, Shield, Users, Zap } from "lucide-react"

const Document = () => {

    const documents = [
        { id: 1, name: "Identity Verification Certificate", type: "Certificate", createdAt: "2024-01-15" },
        { id: 2, name: "Digital Passport", type: "Passport", createdAt: "2024-01-10" },
        { id: 3, name: "Academic Credentials", type: "Education", createdAt: "2024-01-08" },
        { id: 4, name: "Professional License", type: "License", createdAt: "2024-01-05" },
        { id: 5, name: "Medical Records", type: "Health", createdAt: "2024-01-03" },
        { id: 6, name: "Financial Statement", type: "Finance", createdAt: "2024-01-01" },
      ]

  return (
    <div>

        {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300 mb-6">
              Document Management
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Secure Your Digital Documents,
              <br />
              Verify Anywhere, Anytime
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
              With self-sovereign identity, you control your documents—securely store, share, and prove authenticity,
              anytime, anywhere, on-chain and on demand.
            </p>

            {/* Feature highlights */}
            <div className="grid md:grid-cols-4 gap-6 mt-16">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold mb-2">Secure Storage</h3>
                <p className="text-sm text-gray-400">End-to-end encrypted document storage</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <QrCode className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold mb-2">QR Verification</h3>
                <p className="text-sm text-gray-400">Instant document verification via QR codes</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Users className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold mb-2">Easy Sharing</h3>
                <p className="text-sm text-gray-400">Share documents securely with anyone</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold mb-2">Instant Access</h3>
                <p className="text-sm text-gray-400">Access your documents from anywhere</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Your Documents</h2>
              <p className="text-gray-400">Manage and verify your digital identity documents</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Document
            </Button>
          </div>

          {/* Documents Grid */}
          <div className="grid gap-4">
            {documents.map((document) => (
              <Card key={document.id} className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-white">{document.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                          <span>{document.type}</span>
                          <span>•</span>
                          <span>Created {new Date(document.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem className="text-white hover:bg-gray-700 cursor-pointer">
                          <QrCode className="w-4 h-4 mr-2" />
                          Generate QR Code
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-gray-700 cursor-pointer">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove Document
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State (if no documents) */}
          {documents.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No documents yet</h3>
              <p className="text-gray-400 mb-6">Start by adding your first document to get started</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Document
              </Button>
            </div>
          )}
        </div>
      </section>

    </div>
  )
}

export default Document