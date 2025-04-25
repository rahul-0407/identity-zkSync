//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "forge-std/Script.sol";
import "../src/IdentityVerification.sol";
import "./HelperConfig.s.sol";

contract DeployIdentity is Script{
    function run() public {
        HelperConfig helper = new HelperConfig();
        HelperConfig.NetworkConfig memory config  = helper.getConfig();

        vm.startBroadcast();
        address owner = msg.sender;
        IdentityVerification identity = new IdentityVerification(block.chainid == 31337? owner : config.contractOwner);
        vm.stopBroadcast();
    }
}