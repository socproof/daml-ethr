/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1.admin";

export interface GetParticipantIdRequest {}

export interface GetParticipantIdResponse {
  participantId: string;
}

export interface GetPartiesRequest {
  parties: string[];
}

export interface GetPartiesResponse {
  partyDetails: PartyDetails[];
}

export interface ListKnownPartiesRequest {}

export interface ListKnownPartiesResponse {
  partyDetails: PartyDetails[];
}

export interface AllocatePartyRequest {
  partyIdHint: string;
  displayName: string;
}

export interface AllocatePartyResponse {
  partyDetails: PartyDetails | undefined;
}

export interface PartyDetails {
  party: string;
  displayName: string;
  isLocal: boolean;
}

function createBaseGetParticipantIdRequest(): GetParticipantIdRequest {
  return {};
}

export const GetParticipantIdRequest = {
  encode(
    _: GetParticipantIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetParticipantIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetParticipantIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): GetParticipantIdRequest {
    return {};
  },

  toJSON(_: GetParticipantIdRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetParticipantIdRequest>, I>>(
    _: I
  ): GetParticipantIdRequest {
    const message = createBaseGetParticipantIdRequest();
    return message;
  },
};

function createBaseGetParticipantIdResponse(): GetParticipantIdResponse {
  return { participantId: "" };
}

export const GetParticipantIdResponse = {
  encode(
    message: GetParticipantIdResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.participantId !== "") {
      writer.uint32(10).string(message.participantId);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetParticipantIdResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetParticipantIdResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.participantId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetParticipantIdResponse {
    return {
      participantId: isSet(object.participantId)
        ? String(object.participantId)
        : "",
    };
  },

  toJSON(message: GetParticipantIdResponse): unknown {
    const obj: any = {};
    message.participantId !== undefined &&
      (obj.participantId = message.participantId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetParticipantIdResponse>, I>>(
    object: I
  ): GetParticipantIdResponse {
    const message = createBaseGetParticipantIdResponse();
    message.participantId = object.participantId ?? "";
    return message;
  },
};

function createBaseGetPartiesRequest(): GetPartiesRequest {
  return { parties: [] };
}

export const GetPartiesRequest = {
  encode(
    message: GetPartiesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.parties) {
      writer.uint32(10).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPartiesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPartiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.parties.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPartiesRequest {
    return {
      parties: Array.isArray(object?.parties)
        ? object.parties.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetPartiesRequest): unknown {
    const obj: any = {};
    if (message.parties) {
      obj.parties = message.parties.map((e) => e);
    } else {
      obj.parties = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPartiesRequest>, I>>(
    object: I
  ): GetPartiesRequest {
    const message = createBaseGetPartiesRequest();
    message.parties = object.parties?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetPartiesResponse(): GetPartiesResponse {
  return { partyDetails: [] };
}

export const GetPartiesResponse = {
  encode(
    message: GetPartiesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.partyDetails) {
      PartyDetails.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetPartiesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetPartiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.partyDetails.push(
            PartyDetails.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetPartiesResponse {
    return {
      partyDetails: Array.isArray(object?.partyDetails)
        ? object.partyDetails.map((e: any) => PartyDetails.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetPartiesResponse): unknown {
    const obj: any = {};
    if (message.partyDetails) {
      obj.partyDetails = message.partyDetails.map((e) =>
        e ? PartyDetails.toJSON(e) : undefined
      );
    } else {
      obj.partyDetails = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetPartiesResponse>, I>>(
    object: I
  ): GetPartiesResponse {
    const message = createBaseGetPartiesResponse();
    message.partyDetails =
      object.partyDetails?.map((e) => PartyDetails.fromPartial(e)) || [];
    return message;
  },
};

function createBaseListKnownPartiesRequest(): ListKnownPartiesRequest {
  return {};
}

export const ListKnownPartiesRequest = {
  encode(
    _: ListKnownPartiesRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListKnownPartiesRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListKnownPartiesRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): ListKnownPartiesRequest {
    return {};
  },

  toJSON(_: ListKnownPartiesRequest): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListKnownPartiesRequest>, I>>(
    _: I
  ): ListKnownPartiesRequest {
    const message = createBaseListKnownPartiesRequest();
    return message;
  },
};

function createBaseListKnownPartiesResponse(): ListKnownPartiesResponse {
  return { partyDetails: [] };
}

export const ListKnownPartiesResponse = {
  encode(
    message: ListKnownPartiesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.partyDetails) {
      PartyDetails.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): ListKnownPartiesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseListKnownPartiesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.partyDetails.push(
            PartyDetails.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ListKnownPartiesResponse {
    return {
      partyDetails: Array.isArray(object?.partyDetails)
        ? object.partyDetails.map((e: any) => PartyDetails.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ListKnownPartiesResponse): unknown {
    const obj: any = {};
    if (message.partyDetails) {
      obj.partyDetails = message.partyDetails.map((e) =>
        e ? PartyDetails.toJSON(e) : undefined
      );
    } else {
      obj.partyDetails = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ListKnownPartiesResponse>, I>>(
    object: I
  ): ListKnownPartiesResponse {
    const message = createBaseListKnownPartiesResponse();
    message.partyDetails =
      object.partyDetails?.map((e) => PartyDetails.fromPartial(e)) || [];
    return message;
  },
};

function createBaseAllocatePartyRequest(): AllocatePartyRequest {
  return { partyIdHint: "", displayName: "" };
}

export const AllocatePartyRequest = {
  encode(
    message: AllocatePartyRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.partyIdHint !== "") {
      writer.uint32(10).string(message.partyIdHint);
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AllocatePartyRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllocatePartyRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.partyIdHint = reader.string();
          break;
        case 2:
          message.displayName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AllocatePartyRequest {
    return {
      partyIdHint: isSet(object.partyIdHint) ? String(object.partyIdHint) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
    };
  },

  toJSON(message: AllocatePartyRequest): unknown {
    const obj: any = {};
    message.partyIdHint !== undefined &&
      (obj.partyIdHint = message.partyIdHint);
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllocatePartyRequest>, I>>(
    object: I
  ): AllocatePartyRequest {
    const message = createBaseAllocatePartyRequest();
    message.partyIdHint = object.partyIdHint ?? "";
    message.displayName = object.displayName ?? "";
    return message;
  },
};

function createBaseAllocatePartyResponse(): AllocatePartyResponse {
  return { partyDetails: undefined };
}

export const AllocatePartyResponse = {
  encode(
    message: AllocatePartyResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.partyDetails !== undefined) {
      PartyDetails.encode(
        message.partyDetails,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): AllocatePartyResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAllocatePartyResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.partyDetails = PartyDetails.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): AllocatePartyResponse {
    return {
      partyDetails: isSet(object.partyDetails)
        ? PartyDetails.fromJSON(object.partyDetails)
        : undefined,
    };
  },

  toJSON(message: AllocatePartyResponse): unknown {
    const obj: any = {};
    message.partyDetails !== undefined &&
      (obj.partyDetails = message.partyDetails
        ? PartyDetails.toJSON(message.partyDetails)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<AllocatePartyResponse>, I>>(
    object: I
  ): AllocatePartyResponse {
    const message = createBaseAllocatePartyResponse();
    message.partyDetails =
      object.partyDetails !== undefined && object.partyDetails !== null
        ? PartyDetails.fromPartial(object.partyDetails)
        : undefined;
    return message;
  },
};

function createBasePartyDetails(): PartyDetails {
  return { party: "", displayName: "", isLocal: false };
}

export const PartyDetails = {
  encode(
    message: PartyDetails,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.party !== "") {
      writer.uint32(10).string(message.party);
    }
    if (message.displayName !== "") {
      writer.uint32(18).string(message.displayName);
    }
    if (message.isLocal === true) {
      writer.uint32(24).bool(message.isLocal);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): PartyDetails {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePartyDetails();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.party = reader.string();
          break;
        case 2:
          message.displayName = reader.string();
          break;
        case 3:
          message.isLocal = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): PartyDetails {
    return {
      party: isSet(object.party) ? String(object.party) : "",
      displayName: isSet(object.displayName) ? String(object.displayName) : "",
      isLocal: isSet(object.isLocal) ? Boolean(object.isLocal) : false,
    };
  },

  toJSON(message: PartyDetails): unknown {
    const obj: any = {};
    message.party !== undefined && (obj.party = message.party);
    message.displayName !== undefined &&
      (obj.displayName = message.displayName);
    message.isLocal !== undefined && (obj.isLocal = message.isLocal);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<PartyDetails>, I>>(
    object: I
  ): PartyDetails {
    const message = createBasePartyDetails();
    message.party = object.party ?? "";
    message.displayName = object.displayName ?? "";
    message.isLocal = object.isLocal ?? false;
    return message;
  },
};

export interface PartyManagementService {
  GetParticipantId(
    request: GetParticipantIdRequest
  ): Promise<GetParticipantIdResponse>;
  GetParties(request: GetPartiesRequest): Promise<GetPartiesResponse>;
  ListKnownParties(
    request: ListKnownPartiesRequest
  ): Promise<ListKnownPartiesResponse>;
  AllocateParty(request: AllocatePartyRequest): Promise<AllocatePartyResponse>;
}

export class PartyManagementServiceClientImpl
  implements PartyManagementService
{
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetParticipantId = this.GetParticipantId.bind(this);
    this.GetParties = this.GetParties.bind(this);
    this.ListKnownParties = this.ListKnownParties.bind(this);
    this.AllocateParty = this.AllocateParty.bind(this);
  }
  GetParticipantId(
    request: GetParticipantIdRequest
  ): Promise<GetParticipantIdResponse> {
    const data = GetParticipantIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.admin.PartyManagementService",
      "GetParticipantId",
      data
    );
    return promise.then((data) =>
      GetParticipantIdResponse.decode(new _m0.Reader(data))
    );
  }

  GetParties(request: GetPartiesRequest): Promise<GetPartiesResponse> {
    const data = GetPartiesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.admin.PartyManagementService",
      "GetParties",
      data
    );
    return promise.then((data) =>
      GetPartiesResponse.decode(new _m0.Reader(data))
    );
  }

  ListKnownParties(
    request: ListKnownPartiesRequest
  ): Promise<ListKnownPartiesResponse> {
    const data = ListKnownPartiesRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.admin.PartyManagementService",
      "ListKnownParties",
      data
    );
    return promise.then((data) =>
      ListKnownPartiesResponse.decode(new _m0.Reader(data))
    );
  }

  AllocateParty(request: AllocatePartyRequest): Promise<AllocatePartyResponse> {
    const data = AllocatePartyRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.admin.PartyManagementService",
      "AllocateParty",
      data
    );
    return promise.then((data) =>
      AllocatePartyResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | boolean
  | undefined;

export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin
  ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & {
      [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
    };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
