require('dotenv').config({path: `${__dirname}/../.env`});

import TransactionClient from "./lib/TransactionClient";
import PartyManagementClient from "./lib/PartyManagementClient";

const serverPath = {serverPath: `localhost:${process.env.DAML_CANTON_PORT}`};

const partyManagementClient = new PartyManagementClient(serverPath);

(async () => {
  const parties = await partyManagementClient.getListKnownParties();
  const transactionClient = new TransactionClient(serverPath, parties);
  transactionClient.submitOneTransaction();
})();
