const routes = (app, contract, account) => {
  app.get('/transactions', async (request, response) => {
    let cache = [];

    const transactions = await contract.getTransactionsByOwner.call();

    response.json(transactions);
  });
};

module.exports = routes;
