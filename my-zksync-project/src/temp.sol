// pragma solidity ^0.8.20;

// import "openzeppelin-contracts/contracts/access/Ownable.sol";

// contract IdentityVerification is Ownable{

//     struct Doucment{
//         string docType;
//         bytes32 docHash;
//         uint256 timestamp;
//     }


//     // mapping from user address to their document
//     mapping(address -> Document[]) userDocuments;

//     // global registry for document ownership
//     mapping(bytes32 -> address) documentOwners;

//     // verifier role mapping 
//     mapping(address -> bool) isVerifier;

//     event DocumentUploaded{address indexed user, string docType, bytes32 docHash};
//     event DocumentRemoved{address indexed user, string docType, bytes32 docHash};
//     event VerifierAdded{address indexed verifier};
//     event VerifierRemoved{address indexed verifier};
//     event DoucmentHashRegistered(bytes32 indexed documentHash, address indexed owner);

//     constructor(address initialOwner) Ownable(initialOwner){}

//     // upload and register the document
//     function uploadAndRegisterDocument(string memory _docType, bytes32 docHash) public {

//         require(_docHash != bytes32(0),"Invalid document hash");
//         require(documentOwners[_docHash]==address[0],"Document already registered");

//         // Register Ownership
//         documentOwners[_docHash] = msg.sender;
//         emit DocumentHashRegistered(_docHash, msg.sender);

//         // store Document
//         Document memory newDoc = ({
//             docType:_docType,
//             docHash:_docHash,
//             timestamp:block.timestamp
//         });

//         userDocuments[msg.sender].push(newDoc);
//         emit DocumentUploaded(msg.sender, _ docType, _docHash);

//     }

//     function removeDocument(uint256 _index) public {
//         require(_index < userDocuments[msg.sender].length, "Invalid index");

//         Document memory doc = userDocuments[msg.sender][_index];

//         if(documentOwners[doc.docHash] == msg.sender){
//             delete documentOwners[doc.docHash];
//         }

//         for(uint256 i = _index; i<userDocuments[msg.sender].length -1; i++){
//             userDocuments[msg.sender][i] = userDocuments[msg.sender][i+1];
//         }

//         userDocuments[msg.sender].pop();


//         emit DocumentRemoved(msg.sender, doc.docType, doc.docHash);

//     }



// }