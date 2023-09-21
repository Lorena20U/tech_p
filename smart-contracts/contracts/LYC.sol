// SPDX-License-Identifier: MIT
pragma solidity 0.8.16;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LYC is ERC20 {
    constructor() ERC20("Lycon Token", "LYC") {
    // constructor() ERC20("Staking Token", "STKN") {
        _mint(msg.sender, 12000 * 1e18);
    }
}
