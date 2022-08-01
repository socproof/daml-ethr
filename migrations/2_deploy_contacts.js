const Contacts = artifacts.require("./Contacts.sol");

module.exports = deployer => {
  deployer.deploy(Contacts);
};
