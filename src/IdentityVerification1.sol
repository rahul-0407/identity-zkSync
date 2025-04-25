// // SPDX-License-Identifier: MIT

// pragma solidity ^0.8.20;

// error FundMe_notOwner();
// error UserAlreadyExist();
// error UserNotRegistered();

// contract IdentityVerification {
//     address private immutable i_owner;

//     struct User{
//         string name;
//         string nationalIdHash;
//         bool isVerified;
//     }
//     constructor() {
//         i_owner = msg.sender;
//     }

//     mapping(address => User) private users;

//     event UserRegistered(address indexed user, string name);
//     event UserVerified(address indexed user);

//     modifier onlyOwner() {
//         if(msg.sender != i_owner) {revert FundMe_notOwner();}
//         _;
//     }

//     modifier onlyUnregistered(){
//         if(bytes(users[msg.sender].name).length !=0) {revert UserAlreadyExist();}
//         _;
//     }

//     function register(string calldata _name,string calldata _nationalIdHash) external onlyUnregistered{
//         users[msg.sender] = User(_name,_nationalIdHash,false);
//         emit UserRegistered(msg.sender, _name);
//     }

//     function verifyUser(address _user) external onlyOwner{
//         if(bytes(users[_user].name).length == 0) {revert UserNotRegistered();}
//         users[_user].isVerified = true;
//         emit UserVerified(_user);
//     }

//     function isUserVerified(address _user) external view returns(bool){
//         return users[_user].isVerified;
//     }


//     function getUser(address _user) external view returns(string memory, string memory, bool){
//         User memory user = users[_user];
//         return (user.name, user.nationalIdHash, user.isVerified);
//     }

    
// }