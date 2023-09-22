require("@nomicfoundation/hardhat-toolbox");

// const INFURA_API_KEY = "KEY";
// const SEPOLIA_PRIVATE_KEY = "03ba7dcba0fa58c15580fd49a40d82cbf08ba639f010e8f801c5af6944d5d880";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.21",
  networks: {
    sepolia: {
      // url: "http://127.0.0.1:8545/",
      url: "https://ethereum-sepolia.blockpi.network/v1/rpc/public",
      chainId: 11155111,
      accounts: ["03ba7dcba0fa58c15580fd49a40d82cbf08ba639f010e8f801c5af6944d5d880"],
    },
  },
};
