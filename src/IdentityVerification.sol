// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/access/Ownable.sol";


contract IdentityVerification is Ownable {
    struct Document{
        string docType;
        uint256 timestamp;
        bytes32 docHash;
    }

    mapping(address => Document[]) private userDocuments;

    event DocumentAdded(
        address indexed user,
        string docType,
        bytes32 docHash
    );

    event DocumentRemoved(
        address indexed user,
        string docType,
        bytes32 docHash
    );

    constructor(address initialOwner) Ownable(initialOwner) {}

    function addDocument(string memory _docType, bytes32 _docHash) public {
        Document memory newDoc = Document({
            docType: _docType,
            timestamp: block.timestamp,
            docHash: _docHash
        });

        userDocuments[msg.sender].push(newDoc);
        emit DocumentAdded(msg.sender, _docType, _docHash);
    }


    function removeDocument(uint256 _index) public {
        require(_index < userDocuments[msg.sender].length, "Invalid index");

        bytes32 docHash = userDocuments[msg.sender][_index].docHash;
        string memory docType = userDocuments[msg.sender][_index].docType;

        // Remove the document by shifting elements to fill the gap
        for (uint256 i = _index; i < userDocuments[msg.sender].length - 1; i++) {
            userDocuments[msg.sender][i] = userDocuments[msg.sender][i + 1];
        }

        userDocuments[msg.sender].pop(); // Remove last element

        emit DocumentRemoved(msg.sender, docType, docHash);
    }

    function getDocuments() public view returns(Document[] memory){
        return userDocuments[msg.sender];
    }




    mapping(address => bool) public isVerifier;

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    function addVerifier(address _verifier) external onlyOwner {
        isVerifier[_verifier] = true;
        emit VerifierAdded(_verifier);
    }

    function removeVerifier(address _verifier) external onlyOwner {
        isVerifier[_verifier] = false;
        emit VerifierRemoved(_verifier);
    }


    function verifyDocument(address _user, bytes32 _docHash) public view returns (bool) {
       require(isVerifier[msg.sender], "Not an authorized verifier");
       Document[] memory documents = userDocuments[_user];
       for (uint256 i = 0; i < documents.length; i++) {
          if (documents[i].docHash == _docHash) {
            return true;
          }
       }
       return false;
    }




}