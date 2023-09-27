const { expect } = require("chai");
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

describe("YACoinTokenCrowdsale", () => {
  it("Should have 70% of YACoinToken tokens", async () => {
    const YACoinToken = await ethers.getContractFactory("YACoinToken");
    const yaCoinToken = await YACoinToken.deploy();
    await yaCoinToken.deployed();

    expect(await yaCoinToken.name()).to.equal("YACoinToken");
    expect(await yaCoinToken.symbol()).to.equal("YAC");
    expect(await yaCoinToken.decimals()).to.equal(18);
    const totalSupply = await yaCoinToken.totalSupply();
    expect(totalSupply).to.equal(ethers.BigNumber.from("1000000000000000000000000"));
    const owner = await yaCoinToken.owner();

    const latestBlockTime = await latestTime();
    const openingTime = latestBlockTime + duration.minutes(1);
    const closeTime = openingTime + duration.weeks(1); // 1 week

    const YACoinTokenCrowdsale = await ethers.getContractFactory("YACoinTokenCrowdsale");
    const rate = 120; // 500 yacoin per token
    const yaCoinTokenCrowdsale = await YACoinTokenCrowdsale.deploy(
      rate,
      owner,
      yaCoinToken.address,
      owner,
      openingTime,
      closeTime
    );

    await yaCoinTokenCrowdsale.deployed();

    await yaCoinToken.approve(
      yaCoinTokenCrowdsale.address,
      totalSupply.mul(ethers.BigNumber.from(70)).div(ethers.BigNumber.from(100))
    );

    expect(await yaCoinTokenCrowdsale.rate()).to.equal(rate);
    expect(await yaCoinTokenCrowdsale.remainingTokens()).to.equal(ethers.BigNumber.from("700000000000000000000000"));
  });
  // TODO: add unit test for time validation
  // TODO: add unit test for token allocation
});
