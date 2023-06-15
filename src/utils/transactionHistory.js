export const saveTransaction = (account, txHash, txData) => {
  const transactionHistory =
    JSON.parse(localStorage.getItem("transactionHistory" + account)) || [];
  transactionHistory.push({ txHash, txData });
  localStorage.setItem(
    "transactionHistory" + account,
    JSON.stringify(transactionHistory)
  );
};

export const getTransactions = (account) => {
  return JSON.parse(localStorage.getItem("transactionHistory" + account)) || [];
};

export const clearTransactions = (account) => {
  localStorage.removeItem("transactionHistory" + account);
};
