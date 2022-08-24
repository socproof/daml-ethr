require('dotenv').config({path: `${__dirname}/../.env`});

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const Web3 = require('web3');
const contract = require('@truffle/contract');
const artifact = require('../build/contracts/Transactions.json');
const Helper = require('./utils/helper');

app.use(cors());
app.use(express.json());

let provider;
if (typeof provider !== 'undefined') {
  provider = new Web3(provider.currentProvider);
} else {
  provider = new Web3(new Web3.providers.HttpProvider(`http://localhost:${process.env.WEB3_HTTP_PORT}`));
}

const init = async () => {
  const accounts = await provider.eth.getAccounts();
  const TransactionsContract = contract(artifact);
  await TransactionsContract.setProvider(provider.currentProvider);
  const address = await Helper.getContractAddress(provider, TransactionsContract);
  const instance = await TransactionsContract.at(address);

  routes(app, instance, accounts[0]);

  app.listen(process.env.NODE_SERVER_PORT, () => {
    console.log(`listening on port ${process.env.NODE_SERVER_PORT}`);
  });
}
init();
