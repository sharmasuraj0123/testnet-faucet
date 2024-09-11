pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenFaucet is ReentrancyGuard, Ownable {
    IERC20 public token;
    uint256 public amountPerRequest;
    uint256 public lockTime;
    mapping(address => uint256) public lastAccessTime;

    constructor(address initialOwner, IERC20 _token, uint256 _amountPerRequest, uint256 _lockTime) Ownable(initialOwner){
        token = _token;
        amountPerRequest = _amountPerRequest;
        lockTime = _lockTime;
    }

    function requestTokens() public nonReentrant {
        require(block.timestamp > lastAccessTime[msg.sender] + lockTime, "Must wait before requesting again");
        require(token.balanceOf(address(this)) >= amountPerRequest, "Faucet is empty");

        lastAccessTime[msg.sender] = block.timestamp;
        require(token.transfer(msg.sender, amountPerRequest), "Token transfer failed");
    }

    function withdrawTokens(uint256 amount) public onlyOwner {
        require(token.transfer(msg.sender, amount), "Token transfer failed");
    }
}