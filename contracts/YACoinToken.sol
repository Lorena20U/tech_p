// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YACoinToken is ERC20, Ownable {
	constructor() ERC20("YACoinToken", "YAC") {
		_mint(msg.sender, 12000 * 10**decimals());
	}

	function mint(address to, uint256 amount) public onlyOwner {
		_mint(to, amount);
	}
}
