const Transactions = artifacts.require("./Transactions.sol");

module.exports = async deployer => {
  await deployer.deploy(Transactions);
};
