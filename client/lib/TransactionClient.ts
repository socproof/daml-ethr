import DAMLClient from "./DAMLClient";
import {GetTransactionsResponse} from "../interfaces/transaction_service";
import axios from "axios";
import {delay} from 'lodash';

/**
 * @class TransactionClient
 * @extends DAMLClient
 */
export default class TransactionClient extends DAMLClient {
  static readonly pathToProto = '/proto/transaction_service.proto';
  static readonly serviceName = 'TransactionService';
  static readonly sendPath = `http://localhost:${process.env.NODE_SERVER_PORT}/transactions`;
  static delayCalls = 0;

  private readonly requestData = {
    "ledgerId": process.env.LEDGER_ID,
    "begin": {
      "boundary": "LEDGER_BEGIN"
    },
    "filter": {
      "filters_by_party": {}
    }
  };

  /**
   * @param {string} serverPath
   * @param {Object} parties
   */
  constructor({serverPath}, parties) {
    super(TransactionClient.pathToProto, TransactionClient.serviceName, {serverPath});
    this.requestData = {...this.requestData, filter: {filters_by_party: parties}};
  }

  public submitAllTransactions() {
    const requestData = {...this.requestData, end: {boundary: 'LEDGER_END'}};
    const stream = this.client.getTransactions(requestData, {});
    this.handleStream(stream, this.sendTransactions);
  };

  public submitOneTransaction() {
    const stream = this.client.getTransactions(this.requestData, {});
    this.handleStream(stream, this.sendOneTransaction.bind(this));
  }

  public async isServerReachable() {
    try {
      await axios.head(TransactionClient.sendPath);
      return true;
    } catch (error) {
      return false;
    }
  }

  private async sendOneTransaction({transactions}) {
    const isReachable = await this.isServerReachable();
    if (isReachable) {
      try {
        const transaction = transactions.pop();
        await axios.post(TransactionClient.sendPath, transaction);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log('Wait for server to be reachable', ++TransactionClient.delayCalls);
      delay(() => this.sendOneTransaction({transactions}), 1000);
    }
  }

  private async sendTransactions({transactions = []}) {
    await axios.all(transactions.map((transaction) =>
      this.sendOneTransaction(transaction)
    ));
  }

  private handleStream(stream, callbackFn) {
    stream
      .on('data', async (response: GetTransactionsResponse) => {
        console.log('transaction received');
        await callbackFn(response);
      })
      .on('status', (status) => console.log(`stream status`, status))
      .on('error', (error) => console.error(error))
      .on('end', () => console.log('stream has ended'));
  }
}
