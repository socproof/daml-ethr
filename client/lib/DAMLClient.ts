import * as path from "path";
import {loadSync} from '@grpc/proto-loader';
import {loadPackageDefinition, credentials, GrpcObject} from "@grpc/grpc-js";
import {get} from 'lodash';

export default class DAMLClient {
  private readonly baseName = path.basename('client');
  private readonly packagePath = 'com.daml.ledger.api.v1';
  public readonly client;

  constructor(pathToProto, serviceName, {serverPath}) {
    const packageDefinition = loadSync(
      this.baseName + pathToProto,{
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });

    const packageLoaded = loadPackageDefinition(packageDefinition);
    const lib = get(packageLoaded, this.packagePath);
    this.client = new lib[serviceName](serverPath, credentials.createInsecure())
  }
}
