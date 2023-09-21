const { ethers } = require("hardhat");

async function main() {
  //LYC
  console.log("Deploying LYC Contract...");
  const LYCFactory = await ethers.getContractFactory("LYC");
  const lyc = await LYCFactory.deploy();

  console.log("Deployed LYC:", lyc.address);

  //LYCICO
  console.log("Deploying lycICO Contract...");
  const LycICOFactory = await ethers.getContractFactory("LycICO");
  const lycICO = await LycICOFactory.deploy(
    "0x9Ee8465d8a53090be1f92137a45219c8EC4e7489",
    lyc.address
  );

  console.log("Deployed lycICO:", lycICO.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
