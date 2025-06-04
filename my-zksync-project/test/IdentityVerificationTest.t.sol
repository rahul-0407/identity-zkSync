// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/IdentityVerification.sol";

contract IdentityVerificationTestWithAccessControlZK is Test {
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
    // event VerifierAdded(address indexed verifier);
    // event VerifierRemoved(address indexed verifier);
    event DocumentHashRegistered(
        bytes32 indexed documentHash,
        address indexed owner
    );

    event VerifierAdded(address indexed verifier);
    event VerifierRemoved(address indexed verifier);

    IdentityVerification identity;
    address public USER = makeAddr("user");
    address public OWNER = makeAddr("owner");
    address public VERIFIER = makeAddr("verifier");

    function setUp() public {
        identity = new IdentityVerification(OWNER);
        vm.deal(USER, 1 ether);
        vm.deal(OWNER, 1 ether);
        vm.deal(VERIFIER, 1 ether);

        // Add VERIFIER to the system
        vm.prank(OWNER);
        identity.addVerifier(VERIFIER);
    }

    function testDocumentHashRegistered() public {
        vm.prank(USER);
        vm.expectEmit(true, true, true, true);
        emit DocumentHashRegistered(keccak256("doc1"), USER);

        identity.uploadAndRegisterDocument("passport", keccak256("doc1"));

        assertEq(identity.getHashOwner(keccak256("doc1")), USER);
    }

    function testDocumentUploaded() public {
        vm.prank(USER);
        vm.expectEmit(true, true, true, true);
        emit DocumentUploaded(USER, "passport", keccak256("doc1"));

        identity.uploadAndRegisterDocument("passport", keccak256("doc1"));

        vm.prank(USER);
        IdentityVerification.Document[] memory docs = identity.getDocuments();

        assertEq(docs.length, 1);
        assertEq(docs[0].docType, "passport");
        assertEq(docs[0].docHash, keccak256("doc1"));
    }

    function testInvalidDocumentHashReverts() public {
    vm.prank(USER);
    vm.expectRevert("Invalid document hash");

    identity.uploadAndRegisterDocument("passport", bytes32(0));
    }

    function testDuplicateDocumentHashReverts() public {
    vm.prank(USER);
    identity.uploadAndRegisterDocument("passport", keccak256("doc1"));

    vm.prank(USER);
    vm.expectRevert("Document already registered");
    identity.uploadAndRegisterDocument("passport", keccak256("doc1"));  
    }

    function testRemoveDocumentInvalidIndexReverts() public {
    vm.prank(USER);
    vm.expectRevert("Invalid index");
    identity.removeDocument(0);
    }

    function testRemoveDocumentSuccess() public {
    vm.prank(USER);
    identity.uploadAndRegisterDocument("passport", keccak256("doc1"));

    vm.prank(USER);
    vm.expectEmit(true, true, true, true);
    emit DocumentRemoved(USER, "passport", keccak256("doc1"));

    vm.prank(USER);
    identity.removeDocument(0);

    assertEq(identity.getHashOwner(keccak256("doc1")), address(0));

    vm.prank(USER);
    IdentityVerification.Document[] memory docs = identity.getDocuments();
    assertEq(docs.length, 0);
    }

    function testVerifyDocumentSuccess() public {
    vm.prank(USER);
    identity.uploadAndRegisterDocument("passport", keccak256("doc1"));

    bool result = identity.verifyDocument(USER, keccak256("doc1"));
    assertTrue(result);
    }

    function testVerifyDocumentFailsIfNotFound() public view {
    bool result = identity.verifyDocument(USER, keccak256("unknown"));
    assertFalse(result);
    }

    function testVerifyDocumentFailsIfNotVerifier() public {
    vm.prank(USER);
    vm.expectRevert("Not an authorized verifier");
    identity.verifyDocument(USER, keccak256("doc1"));
    }



    // ------------Add verifier and remove Verifier--------------

    function testAddVerifierSuccess() public {
    address newVerifier = address(0x123);

    vm.prank(OWNER);
    vm.expectEmit(true, false, false, true);
    emit VerifierAdded(newVerifier);

    identity.addVerifier(newVerifier);
    assertTrue(identity.isVerifier(newVerifier));
    }

    function testRemoveVerifierSuccess() public {
    address newVerifier = address(0x123);

    vm.prank(OWNER);
    identity.addVerifier(newVerifier);

    vm.prank(OWNER);
    vm.expectEmit(true, false, false, true);
    emit VerifierRemoved(newVerifier);

    identity.removeVerifier(newVerifier);
    assertFalse(identity.isVerifier(newVerifier));
    }


    function testAddVerifierRevertsIfNotOwner() public {
    vm.prank(USER);
    vm.expectRevert("Ownable: caller is not the owner");
    identity.addVerifier(USER);
    }



    // ------------VerifyHash and getHashOwner-----------------

    function testVerifyHashReturnsTrueForCorrectOwner() public {
    bytes32 docHash = keccak256("doc1");

    vm.prank(USER);
    identity.uploadAndRegisterDocument("passport", docHash);

    bool result = identity.verifyHash(docHash, USER);
    assertTrue(result);
    }

    function testVerifyHashReturnsFalseForIncorrectOwner() public {
    bytes32 docHash = keccak256("doc1");

    vm.prank(USER);
    identity.uploadAndRegisterDocument("passport", docHash);

    bool result = identity.verifyHash(docHash, address(0x123));
    assertFalse(result);
    }

    function testVerifyHashReturnsFalseForUnregisteredHash() public view {
    bool result = identity.verifyHash(keccak256("nonexistent"), USER);
    assertFalse(result);
    }

    function testGetHashOwnerReturnsCorrectOwner() public {
    bytes32 docHash = keccak256("doc1");

    vm.prank(USER);
    identity.uploadAndRegisterDocument("passport", docHash);

    address owner = identity.getHashOwner(docHash);
    assertEq(owner, USER);
    }

    function testGetHashOwnerReturnsZeroForUnregisteredHash() public view {
    address owner = identity.getHashOwner(keccak256("nonexistent"));
    assertEq(owner, address(0));
    }
















    // function testAddDocument() public {
    //     vm.prank(USER);
    //     vm.expectEmit(true, true, true, true);
    //     emit DocumentAdded(USER, "Passport", keccak256("doc1"));
    //     identity.addDocument("Passport", keccak256("doc1"));

    //     vm.prank(USER);
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs.length, 1);
    //     assertEq(docs[0].docType, "Passport");
    //     assertEq(docs[0].docHash, keccak256("doc1"));
    // }

    // function testRemoveDocumentInvalidIndexReverts() public {
    //     vm.prank(USER);
    //     vm.expectRevert("Invalid index");
    //     identity.removeDocument(0);
    // }

    // function testRemoveDocumentWorksCorrectly() public {
    //     vm.startPrank(USER);
    //     identity.addDocument("Aadhar", keccak256("aadhar1"));
    //     identity.addDocument("PAN", keccak256("pan1"));
    //     vm.expectEmit(true, true, true, true);
    //     emit DocumentRemoved(USER, "Aadhar", keccak256("aadhar1"));
    //     identity.removeDocument(0);
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs.length, 1);
    //     assertEq(docs[0].docType, "PAN");
    //     vm.stopPrank();
    // }

    // function testVerifyDocumentTrue() public{
    //     bytes32 hash = keccak256("verified_doc");
    //     vm.prank(USER);
    //     identity.addDocument("License", hash);
    //     vm.prank(VERIFIER);
    //     bool result = identity.verifyDocument(USER, hash);
    //     assertTrue(result);
    // }

    // function testVerifyDocumentFalse() public {
    //     bytes32 hash = keccak256("gjost_doc");
    //     vm.prank(VERIFIER);
    //     bool result = identity.verifyDocument(USER, hash);
    //     assertFalse(result);
    // }

    // Zero-Knowledge Proof Test Example
    // function testZKProof() public {
    //     Example for future ZK integration (this would need external ZK library)
    //     bytes32 docHash = keccak256("zk_document");
    //     vm.prank(USER);
    //     identity.addDocument("ZKDoc", docHash);
    //     Placeholder for ZK proof logic (ZK validation of document without revealing)
    //     bool zkValidation = true; // Replace with actual ZK proof logic
    //     assertTrue(zkValidation, "ZK proof should validate the document without revealing data.");
    // }

    // function testVerifyDocumentFalse() public {
    //     bytes32 hash = keccak256("ghost_doc");
    //     bool result = identity.verifyDocument(USER, hash);
    //     assertFalse(result);
    // }

    // function testAccessControlForVerification() public {
    //     bytes32 hash = keccak256("doc_to_verify");
    //     vm.prank(USER);
    //     identity.addDocument("Passport", hash);
    //     // Only OWNER can verify
    //     vm.prank(OWNER);
    //     bool result = identity.verifyDocument(USER, hash);
    //     assertTrue(result);
    //     vm.prank(USER);
    //     vm.expectRevert("Only owner can verify documents");
    //     identity.verifyDocument(USER, hash);
    // }

    // function testMultipleSameHashAllowed() public {
    //     bytes32 hash = keccak256("duplicate_doc");
    //     vm.startPrank(USER);
    //     identity.addDocument("PAN", hash);
    //     identity.addDocument("Aadhar", hash);
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs.length, 2);
    //     vm.stopPrank();
    // }

    // function testTimestampSetCorrectly() public {
    //     vm.warp(1000);
    //     vm.prank(USER);
    //     identity.addDocument("Passport", keccak256("doc_time"));
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs[0].timestamp, 1000);
    // }

    // function testCannotRemoveFromEmptyArray() public {
    //     vm.prank(USER);
    //     vm.expectRevert("Invalid index");
    //     identity.removeDocument(0);
    // }

    // function testVerifyDocumentByVerifier() public {
    //     bytes32 docHash = keccak256("verified_doc");

    //     // User adds a document
    //     vm.prank(USER);
    //     identity.addDocument("License", docHash);

    //     // Verifier checks the document
    //     vm.prank(VERIFIER);
    //     bool result = identity.verifyDocument(USER, docHash);
    //     assertTrue(result);
    // }

    // function testVerifyDocumentByNonVerifierReverts() public {
    //     bytes32 docHash = keccak256("ghost_doc");

    //     // Verifier (VERIFIER) tries to verify a non-existing document
    //     vm.prank(VERIFIER);
    //     vm.expectRevert("Not an authorized verifier");
    //     identity.verifyDocument(USER, docHash);
    // }

    // function testAddVerifier() public {
    //     vm.prank(OWNER);
    //     identity.addVerifier(VERIFIER);

    //     // Check that VERIFIER is added to the system
    //     assertTrue(identity.isVerifier(VERIFIER));
    // }

    // function testRemoveVerifier() public {
    //     vm.prank(OWNER);
    //     identity.removeVerifier(VERIFIER);

    //     // Check that VERIFIER is removed from the system
    //     assertFalse(identity.isVerifier(VERIFIER));
    // }

    // function testRemoveDocumentInvalidIndexReverts() public {
    //     vm.prank(USER);
    //     vm.expectRevert("Invalid index");
    //     identity.removeDocument(0);
    // }

    // function testRemoveDocumentWorksCorrectly() public {
    //     vm.startPrank(USER);
    //     identity.addDocument("Aadhar", keccak256("aadhar1"));
    //     identity.addDocument("PAN", keccak256("pan1"));
    //     vm.expectEmit(true, true, true, true);
    //     emit DocumentRemoved(USER, "Aadhar", keccak256("aadhar1"));
    //     identity.removeDocument(0);
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs.length, 1);
    //     assertEq(docs[0].docType, "PAN");
    //     vm.stopPrank();
    // }

    // function testMultipleSameHashAllowed() public {
    //     bytes32 hash = keccak256("duplicate_doc");
    //     vm.startPrank(USER);
    //     identity.addDocument("PAN", hash);
    //     identity.addDocument("Aadhar", hash);
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs.length, 2);
    //     vm.stopPrank();
    // }

    // function testTimestampSetCorrectly() public {
    //     vm.warp(1000);
    //     vm.prank(USER);
    //     identity.addDocument("Passport", keccak256("doc_time"));
    //     IdentityVerification.Document[] memory docs = identity.getDocuments();
    //     assertEq(docs[0].timestamp, 1000);
    // }

    // function testCannotRemoveFromEmptyArray() public {
    //     vm.prank(USER);
    //     vm.expectRevert("Invalid index");
    //     identity.removeDocument(0);
    // }

    // // Zero-Knowledge Proof Test Example
    // function testZKProof() public {
    //     // Example for future ZK integration (this would need external ZK library)
    //     bytes32 docHash = keccak256("zk_document");
    //     vm.prank(USER);
    //     identity.addDocument("ZKDoc", docHash);
    //     // Placeholder for ZK proof logic (ZK validation of document without revealing)
    //     bool zkValidation = true; // Replace with actual ZK proof logic
    //     assertTrue(zkValidation, "ZK proof should validate the document without revealing data.");
    // }

    // Commented-out tests
}
