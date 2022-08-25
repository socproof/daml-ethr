module.exports = class {
  static async getContractAddress(provider, contract) {
    const netId = await provider.eth.net.getId();
    return contract.networks[netId].address;
  }
}
