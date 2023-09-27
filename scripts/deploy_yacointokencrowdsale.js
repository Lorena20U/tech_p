// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
const { ethers } = require("hardhat");

async function latestTime() {
  const block = await ethers.provider.getBlock("latest");
  return block.timestamp;
}

const duration = {
  seconds(val) {
    return val;
  },
  minutes(val) {
    return val * this.seconds(60);
  },
  hours(val) {
    return val * this.minutes(60);
  },
  days(val) {
    return val * this.hours(24);
  },
  weeks(val) {
    return val * this.days(7);
  },
  years(val) {
    return val * this.days(365);
  },
};

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const YACoinToken = await ethers.getContractFactory("YACoinToken");
  const yaCoinToken = await YACoinToken.deploy();

  await yaCoinToken.deployed();
  console.log("YACoinToken deployed to:", yaCoinToken.address);
  console.log("Name", await yaCoinToken.name());
  console.log("Symbol", await yaCoinToken.symbol());
  console.log("Decimals", await yaCoinToken.decimals());
  const totalSupply = await yaCoinToken.totalSupply();
  console.log("Total Supply", totalSupply);
  const owner = await yaCoinToken.owner();
  console.log("Owner", owner);

  // deploy crowdsale contract
  const YACoinTokenCrowdsale = await ethers.getContractFactory("YACoinTokenCrowdsale");
  const rate = 120; // 120 yancoins per token
  const latestBlockTime = await latestTime();
  const openingTime = latestBlockTime + duration.minutes(1);
  const closeTime = openingTime + duration.weeks(1); // 1 week
  console.log("openingTime", openingTime);
  console.log("closeTime", closeTime);
  const yaCoinTokenCrowdsale = await YACoinTokenCrowdsale.deploy(
    rate,
    owner,
    yaCoinToken.address,
    owner,
    openingTime,
    closeTime
  );

  await yaCoinTokenCrowdsale.deployed();
  console.log("YACoinTokenCrowdsale deployed to:", yaCoinTokenCrowdsale.address);

  // approve crowdsale contract to spend 70% tokens
  await yaCoinToken.approve(
    yaCoinTokenCrowdsale.address,
    totalSupply.mul(ethers.BigNumber.from(70)).div(ethers.BigNumber.from(100))
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
