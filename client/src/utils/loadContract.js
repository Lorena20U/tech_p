import { ethers } from "ethers";
import { lyconICOAddress, lyconICOAbi } from "./constants";
import { toast } from "react-toastify";

async function loadContract(signer, chainId, setContract, address) {
  if (chainId !== 5) {
    toast.error(
      "Please Change your network to Sepolia Network for Buying Tokens"
    );
    return;
  }
  const _lycICOContract = new ethers.Contract(
    lyconICOAddress,
    lyconICOAbi,
    signer
  );

  setContract({
    lycICO: _lycICOContract,
  });

  //Read From Contract

  const tokensAvailable = ethers.utils.formatEther(
    await _lycICOContract.getICOTokenBalance()
  );

  const investorBalance = ethers.utils.formatEther(
    await _lycICOContract.investorBalanceOf(address)
  );

  return {
    tokensAvailable,
    investorBalance,
  };
}

export default loadContract;
