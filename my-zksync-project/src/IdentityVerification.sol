// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract IdentityVerification is Ownable {
    // Struct to store document details
    struct Document {
        string docType;
        uint256 timestamp;
        bytes32 docHash;
    }

    // Mapping from user address to their documents
    mapping(address => Document[]) private userDocuments;

    // Global registry of document ownership
    mapping(bytes32 => address) public documentOwners;

    // Verifier role mapping
    mapping(address => bool) public isVerifier;

    address[] public verifierList;

    // Events

    event DocumentUploaded(
        address indexed user,
        string docType,
        bytes32 docHash
    );
    event DocumentRemoved(
        address indexed user,
        string docType,
        bytes32 docHash
    );
    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);
    event DocumentHashRegistered(
        bytes32 indexed documentHash,
        address indexed owner
    );

    // // Constructor
    constructor(address initialOwner) Ownable(initialOwner) {}

    // // Upload & Register Combined
    function uploadAndRegisterDocument(
        string memory _docType,
        bytes32 _docHash
    ) public {
        require(_docHash != bytes32(0), "Invalid document hash");
        require(
            documentOwners[_docHash] == address(0),
            "Document already registered"
        );

        // Register ownership
        documentOwners[_docHash] = msg.sender;
        emit DocumentHashRegistered(_docHash, msg.sender);

        // Store document
        Document memory newDoc = Document({
            docType: _docType,
            timestamp: block.timestamp,
            docHash: _docHash
        });

        userDocuments[msg.sender].push(newDoc);
        emit DocumentUploaded(msg.sender, _docType, _docHash);
    }

    // // Document Removal
    function removeDocument(uint256 _index) public {
        require(_index < userDocuments[msg.sender].length, "Invalid index");

        Document memory doc = userDocuments[msg.sender][_index];

        // Remove ownership record
        if (documentOwners[doc.docHash] == msg.sender) {
            delete documentOwners[doc.docHash];
        }

        // Shift elements to fill the gap
        for (
            uint256 i = _index;
            i < userDocuments[msg.sender].length - 1;
            i++
        ) {
            userDocuments[msg.sender][i] = userDocuments[msg.sender][i + 1];
        }

        // Pop last element
        userDocuments[msg.sender].pop();

        emit DocumentRemoved(msg.sender, doc.docType, doc.docHash);
    }

    // // Get User Documents
    function getDocuments() public view returns (Document[] memory) {
        return userDocuments[msg.sender];
    }

    // // Verifier Role Management
    function addVerifier(address _verifier) external onlyOwner {
        require(!isVerifier[_verifier], "Already a verifier");
        isVerifier[_verifier] = true;
        verifierList.push(_verifier);
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) external onlyOwner {
        require(isVerifier[_verifier], "Not a verifier");
        isVerifier[_verifier] = false;

        // Remove from array
        for (uint i = 0; i < verifierList.length; i++) {
            if (verifierList[i] == _verifier) {
                verifierList[i] = verifierList[verifierList.length - 1];
                verifierList.pop();
                break;
            }
        }

        emit VerifierRemoved(_verifier);
    }

    function getAllVerifiers() public view returns (address[] memory) {
        return verifierList;
    }

    // // Verifier Check of a Document
    function verifyDocument(
        address _user,
        bytes32 _docHash
    ) public view returns (bool) {
        require(isVerifier[msg.sender], "Not an authorized verifier");

        Document[] memory documents = userDocuments[_user];
        for (uint256 i = 0; i < documents.length; i++) {
            if (documents[i].docHash == _docHash) {
                return true;
            }
        }
        return false;
    }

    // // Ownership Check
    function verifyHash(
        bytes32 documentHash,
        address claimedOwner
    ) external view returns (bool) {
        return documentOwners[documentHash] == claimedOwner;
    }

    function getHashOwner(
        bytes32 documentHash
    ) external view returns (address) {
        return documentOwners[documentHash];
    }
}
