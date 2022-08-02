const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const artifact = require('../build/contracts/DAMLTransactions.json');
const Helper = require('./utils/helper')

app.use(cors());
app.use(express.json());

let provider;
if (typeof provider !== 'undefined') {
  provider = new Web3(provider.currentProvider);
} else {
  provider = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
}

const init = async () => {
  const accounts = await provider.eth.getAccounts();

  const DAMLTransactionsContract = contract(artifact);
  await DAMLTransactionsContract.setProvider(provider.currentProvider);
  const address = await Helper.getContractAddress(provider, DAMLTransactionsContract);
  const instance = await DAMLTransactionsContract.at(address);

  try {
    await instance.addTransaction('key-string', 'value-string', {from: accounts[0]});
  } catch (err) {
    console.log("ERROR! " + err.message);
  }

  routes(app, instance, accounts[0]);

  app.listen(process.env.PORT || 3001, () => {
    console.log('listening on port ' + (process.env.PORT || 3001));
  });
}
init();
