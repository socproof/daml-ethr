import * as async from 'async';
import TransactionClient from "./lib/TransactionClient";

const transactionClient = new TransactionClient({serverPath: 'localhost:6865'});

const data = {
  "ledgerId": "sandbox",
  "begin": {
    "boundary": "LEDGER_BEGIN"
  },
  "end": {
    "boundary": "LEDGER_END"
  },
  "filter": {
    "filters_by_party": {
      "party-ef515730-e4d7-4883-acdc-bdb91e877170::12200abd16b04dfdecea95294046d368fe2df31c19e28935de447a62fe16f59833a0": {}
    }
  }
}

if (require.main === module) {
  async.series([
    () => transactionClient.runGetTransactions(data),
  ]);
}

