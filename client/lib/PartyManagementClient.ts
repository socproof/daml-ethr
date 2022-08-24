import DAMLClient from "./DAMLClient";

export default class PartyManagementClient extends DAMLClient {
  static readonly pathToProto = '/proto/party_management_service.proto';
  static readonly serviceName = 'PartyManagementService';

  constructor({serverPath}) {
    super(PartyManagementClient.pathToProto, PartyManagementClient.serviceName, {
      serverPath,
      packagePath: 'com.daml.ledger.api.v1.admin'
    });
  }

  public getListKnownParties = async () => {
    return new Promise((resolve, reject) => {
      this.client.listKnownParties({}, (error, response) => {
        if (error) {
          reject(error);
        } else {
          resolve(this.getPartiesIds(response));
        }
      });
    });
  }

  private getPartiesIds = ({party_details: parties}) => {
    return parties.reduce((json, {party}) => ({ ...json, [party]: {}}), {});
  }
}
