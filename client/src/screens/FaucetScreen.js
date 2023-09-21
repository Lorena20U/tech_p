import React from "react";

const FaucetScreen = () => {
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="faucet-card">
        <div className="card-container">
          <div className="mb-2">Faucet</div>
          <li className="faucet-text">
            Testnet Faucet is Used for getting free ether for testing.
          </li>
          <li className="faucet-text">
            This ICO Smart Contract is deployed on Sepolia Test Network since
            Rinkeby, Ropsten and Kovan networks are to be deprecated soon.
          </li>
          <li className="faucet-text">
            Here are the working faucets for getting free Sepolia Ether for
            testing this ICO Website:
          </li>
          <li className="mb-3">
            <a
              href="https://sepolia-faucet.pk910.de/"
              target="_blank"
              rel="noreferrer noopener"
              className="faucet-text text-blue-300 underline hover:text-blue-500"
            >
              Sepoliafaucet from Alchemy
            </a>
          </li>
        </div>
      </div>
      <div className="text-red-500">
        I Will Update the list if i find anyother working sepolia faucet sites.
      </div>
    </div>
  );
};

export default FaucetScreen;
