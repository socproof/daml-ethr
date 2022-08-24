const fs = require('fs');

const Helper = class {
  static async getContractAddress(provider, contract) {
    const netId = await provider.eth.net.getId();
    return contract.networks[netId].address;
  }
}

module.exports = Helper;
