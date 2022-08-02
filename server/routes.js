const routes = (app, contract, account) => {
  app.get('/transactions', async (request, response) => {
    let cache = [];

    const transactions = await contract.transactions.call(account, 0);

    response.json(transactions);
  });
};

module.exports = routes;
