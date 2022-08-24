require('dotenv').config({path: `${__dirname}/../.env`});

import TransactionClient from "./lib/TransactionClient";
import PartyManagementClient from "./lib/PartyManagementClient";

const serverPath = {serverPath: `localhost:${process.env.DAML_CANTON_PORT}`};

const partyManagementClient = new PartyManagementClient(serverPath);
const transactionClient = new TransactionClient(serverPath);

const data = {
  "ledgerId": process.env.LEDGER_ID,
  "begin": {
    "boundary": "LEDGER_BEGIN"
  },
  "end": {
    "boundary": "LEDGER_END"
  },
  "filter": {
    "filters_by_party": {}
  }
};

(async () => {
  const parties = await partyManagementClient.getListKnownParties();
  data.filter.filters_by_party = parties;
  transactionClient.runGetTransactions(data);
})();
