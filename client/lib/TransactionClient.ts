import DAMLClient from "./DAMLClient";
import {GetTransactionsResponse} from "../interfaces/transaction_service";
import axios from "axios";

export default class TransactionClient extends DAMLClient {
  static readonly pathToProto = '/proto/transaction_service.proto';
  static readonly serviceName = 'TransactionService';

  constructor({serverPath}) {
    super(TransactionClient.pathToProto, TransactionClient.serviceName, {serverPath});
  }

  public runGetTransactions = (data) => {
    const stream = this.client.getTransactions(data, {});
    stream.on('data', async (response: GetTransactionsResponse) => {
      console.log('data has come');
      await this.sendTransactions(response);

    });
    stream.on('end', () => {
      console.log('stream has ended');
    });
  };

  private async sendTransactions({transactions = []}) {
    await axios.all(transactions.map((transaction) =>
      axios.post(`http://localhost:${process.env.NODE_SERVER_PORT}/transactions`, transaction)
    )).then((data) => console.log(data));
  }
}
