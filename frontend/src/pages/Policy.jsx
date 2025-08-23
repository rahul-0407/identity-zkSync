import React, { useState } from "react";
import { getContract } from "../utils/contract";
import { FileText, RefreshCw, Copy } from "lucide-react";

const Policy = () => {
  const [chainDocuments, setChainDocuments] = useState([]);
  const [loading, setLoading] = useState(false);


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="bg-neutral-950 min-h-screen text-white p-4 pt-16 sm:p-8 sm:pt-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center py-12">
          <div className="inline-block px-4 py-1.5 bg-gray-800 border border-gray-700 rounded-full text-sm text-gray-300 font-medium mb-4">
            Policy Documents
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 mb-4">
            Your Blockchain Documents
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            These documents are fetched directly from the smart contract.
          </p>
        </header>

        {/* Action Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={getDataFromChain}
            // disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
            {loading ? "Fetching..." : "Fetch Documents"}
          </button>
        </div>

        {/* Documents Table */}
        {chainDocuments.length > 0 ? (
          <div className="overflow-x-auto bg-gray-800/50 border border-gray-700 rounded-2xl shadow-lg">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="bg-gray-900 text-gray-400 uppercase text-xs">
                <tr>
                  <th scope="col" className="px-6 py-3">#</th>
                  <th scope="col" className="px-6 py-3">Document Type</th>
                  <th scope="col" className="px-6 py-3">Timestamp</th>
                  <th scope="col" className="px-6 py-3">Hash</th>
                </tr>
              </thead>
              <tbody>
                {chainDocuments.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b border-gray-700 hover:bg-gray-700/30 transition-colors"
                  >
                    <td className="px-6 py-4">{doc.id}</td>
                    <td className="px-6 py-4 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      {doc.docType || "Unknown"}
                    </td>
                    <td className="px-6 py-4">{doc.timestamp}</td>
                    <td className="px-6 py-4 truncate max-w-xs flex items-center gap-2">
                      <span>{doc.docHash}</span>
                      <button
                        onClick={() => copyToClipboard(doc.docHash)}
                        className="text-gray-400 hover:text-white"
                        title="Copy Hash"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500">
              No documents found. Click{" "}
              <span className="font-semibold text-blue-400">Fetch Documents</span>{" "}
              to load from the blockchain.
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default Policy;
