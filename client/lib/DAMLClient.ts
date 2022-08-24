import * as path from "path";
import {loadSync} from '@grpc/proto-loader';
import {loadPackageDefinition, credentials} from "@grpc/grpc-js";
import {get} from 'lodash';

export default class DAMLClient {
  private readonly baseName = path.basename('client');
  public readonly client;

  constructor(pathToProto, serviceName, {serverPath, packagePath = 'com.daml.ledger.api.v1'}) {
    const packageDefinition = loadSync(
      this.baseName + pathToProto,{
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
      });

    const packageLoaded = loadPackageDefinition(packageDefinition);
    const lib = get(packageLoaded, packagePath);
    this.client = new lib[serviceName](serverPath, credentials.createInsecure());
  }
}
