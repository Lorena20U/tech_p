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
      `https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x521db071163a28a2b235Cb6D9915dA97E7C94AE8&topic0=0x2e206bbdd5787cd6d3e97144dec044f9f15dd77a257afd27fa70cad6f03feae3&apikey=${"594PRQFF18JDNW2YNYMWXYP9REXZ4KWIG2"}`
    );
    setAllTransaction(data);

    if (!account.address) {
      return;
    }

    const yourTx = await userTransactions(
      `https://api-sepolia.etherscan.io/api?module=logs&action=getLogs&fromBlock=0&toBlock=latest&address=0x521db071163a28a2b235Cb6D9915dA97E7C94AE8&topic0=0x2e206bbdd5787cd6d3e97144dec044f9f15dd77a257afd27fa70cad6f03feae3&topic2=0x000000000000000000000000${account.address.substring(
        2,
        42
      )}&apikey=${"594PRQFF18JDNW2YNYMWXYP9REXZ4KWIG2"}`
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
