import React, { useContext, useEffect, useState } from "react";

import Transaction from "../components/Transaction";
import GlobalContext from "../context/GlobalContext";
import userTransactions from "../utils/userTransactions";

const TransactionScreen = () => {
  const [allTransaction, setAllTransaction] = useState([]);
  const [yourTransaction, setYourTransaction] = useState([]);

  const { account } = useContext(GlobalContext);

  useEffect(() => {
    handleUserTransaction();
  }, [account.address]);

  const handleUserTransaction = async () => {
    const data = await userTransactions(
      `https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xeec5d1942255d91396d416f881ce8f43f4e4517c&topic0=0x2e206bbdd5787cd6d3e97144dec044f9f15dd77a257afd27fa70cad6f03feae3&apikey=${process.env.REACT_APP_ETHERSCAN_API}`
    );
    setAllTransaction(data);

    if (!account.address) {
      return;
    }

    const yourTx = await userTransactions(
      `https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0xeec5d1942255d91396d416f881ce8f43f4e4517c&topic0=0x2e206bbdd5787cd6d3e97144dec044f9f15dd77a257afd27fa70cad6f03feae3&topic2=0x000000000000000000000000${account.address.substring(
        2,
        42
      )}&apikey=${process.env.REACT_APP_ETHERSCAN_API}`
    );

    setYourTransaction(yourTx);
  };

  return (
    <div className="flex justify-center items-center lg:items-start flex-col lg:flex-row gap-10">
      {/* Your Transaction */}

      <Transaction account={account} transaction={yourTransaction} />

      {/* Recent Transaction */}

      <Transaction
        account={account}
        transaction={allTransaction}
        text="Recent"
      />
    </div>
  );
};

export default TransactionScreen;
