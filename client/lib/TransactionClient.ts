import DAMLClient from "./DAMLClient";
import {GetTransactionsResponse} from "../interfaces/transaction_service";

export default class TransactionClient extends DAMLClient {
  static readonly pathToProto = '/proto/transaction_service.proto';
  static readonly serviceName = 'TransactionService';

  constructor({serverPath}) {
    super(TransactionClient.pathToProto, TransactionClient.serviceName, {serverPath});
  }

  public runGetTransactions = (data, cb = () => {}) => {
    const stream = this.client.getTransactions(data, {});
    stream.on('data', (response) => {
      console.log(this.getEventsFromResponse(response));
    });
    stream.on('end', () => {
      cb();
    });
  };

  private getEventsFromResponse = (response: GetTransactionsResponse) => {
    return response.transactions.map(({events}) => events);
  }
}
