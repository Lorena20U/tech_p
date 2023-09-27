const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YACoinToken", () => {
  it("Should return the token name", async () => {
    const YACoinToken = await ethers.getContractFactory("YACoinToken");
    const yaCoinToken = await YACoinToken.deploy();
    await yaCoinToken.deployed();

    expect(await yaCoinToken.name()).to.equal("YACoinToken");
  });

  it("Should return the token symbol", async () => {
    const YACoinToken = await ethers.getContractFactory("YACoinToken");
    const yaCoinToken = await YACoinToken.deploy();
    await yaCoinToken.deployed();

    expect(await yaCoinToken.symbol()).to.equal("YAC");
  });

  it("Should return decimals", async () => {
    const YACoinToken = await ethers.getContractFactory("YACoinToken");
    const yaCoinToken = await YACoinToken.deploy();
    await yaCoinToken.deployed();

    expect(await yaCoinToken.decimals()).to.equal(18);
  });

  it("Should have total supply", async () => {
    const YACoinToken = await ethers.getContractFactory("YACoinToken");
    const yaCoinToken = await YACoinToken.deploy();
    await yaCoinToken.deployed();

    expect(await yaCoinToken.totalSupply()).to.equal(ethers.BigNumber.from("1000000000000000000000000"));
  });
});
