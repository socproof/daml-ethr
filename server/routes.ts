const _ = require('lodash');

module.exports = (app, contract, account) => {
  app.get('/transactions', async (req, res) => {
    const transactions = await contract.getTransactionsByOwner.call();
    res.json(transactions);
  });

  app.post('/transactions', async ({body}, res) => {
    try {
      if(!_.isEmpty(body)) {
        const transaction = JSON.stringify(body);
        await contract.addTransaction(transaction, {from: account});
        res.status(201);
      } else {
        res.status(204);
      }
    } catch (err) {
      console.log("ERROR! " + err.message);
    }
  })
};
