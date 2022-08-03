const fs = require('fs');

const Helper = class {
  static async getContractAddress(provider, contract) {
    const netId = await provider.eth.net.getId();
    return contract.networks[netId].address;
  }

  static getRandomNumber() {
    return Math.floor(Math.random() * 100).toString();
  }
}

module.exports = Helper;
