const fs = require('fs');

const Helper = class {
  static getContractABI(name) {
    const contract = JSON.parse(fs.readFileSync(`./build/contracts/${name}.json`, 'utf8'));
    return contract.abi;
  }
}

module.exports = Helper;
