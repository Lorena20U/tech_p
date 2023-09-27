// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const YACoinToken = await hre.ethers.getContractFactory("YACoinToken");
  const yaCoinToken = await YACoinToken.deploy();

  await yaCoinToken.deployed();
  console.log("YACoinToken deployed to:", yaCoinToken.address);
  console.log("Name", await yaCoinToken.name());
  console.log("Symbol", await yaCoinToken.symbol());
  console.log("Decimals", await yaCoinToken.decimals());
  console.log("Total Supply", await yaCoinToken.totalSupply());
  console.log("Owner", await yaCoinToken.owner());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
