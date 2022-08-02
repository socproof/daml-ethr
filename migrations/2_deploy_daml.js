const Transactions = artifacts.require("./DAMLTransactions.sol");

module.exports = deployer => {
  deployer.deploy(Transactions);
};
