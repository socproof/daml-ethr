/* eslint-disable */
import { LedgerOffset } from "./ledger_offset";
import { TransactionFilter } from "./transaction_filter";
import { Transaction, TransactionTree } from "./transaction";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1";

export interface GetTransactionsRequest {
  /**
   * Must correspond to the ledger ID reported by the Ledger Identification Service.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  ledgerId: string;
  /**
   * Beginning of the requested ledger section.
   * This offset is exclusive: the response will only contain transactions whose offset is strictly greater than this.
   * Required
   */
  begin: LedgerOffset | undefined;
  /**
   * End of the requested ledger section.
   * This offset is inclusive: the response will only contain transactions whose offset is less than or equal to this.
   * Optional, if not set, the stream will not terminate.
   */
  end: LedgerOffset | undefined;
  /**
   * Requesting parties with template filters.
   * Template filters must be empty for GetTransactionTrees requests.
   * Required
   */
  filter: TransactionFilter | undefined;
  /**
   * If enabled, values served over the API will contain more information than strictly necessary to interpret the data.
   * In particular, setting the verbose flag to true triggers the ledger to include labels for record fields.
   * Optional
   */
  verbose: boolean;
}

export interface GetTransactionsResponse {
  /** The list of transactions that matches the filter in GetTransactionsRequest for the GetTransactions method. */
  transactions: Transaction[];
}

export interface GetTransactionTreesResponse {
  /** The list of transaction trees that matches the filter in ``GetTransactionsRequest`` for the ``GetTransactionTrees`` method. */
  transactions: TransactionTree[];
}

export interface GetTransactionByEventIdRequest {
  /**
   * Must correspond to the ledger ID reported by the Ledger Identification Service.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  ledgerId: string;
  /**
   * The ID of a particular event.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  eventId: string;
  /**
   * The parties whose events the client expects to see.
   * Events that are not visible for the parties in this collection will not be present in the response.
   * Each element must be a valid PartyIdString (as described in ``value.proto``).
   * Required
   */
  requestingParties: string[];
}

export interface GetTransactionByIdRequest {
  /**
   * Must correspond to the ledger ID reported by the Ledger Identification Service.
   * Must be a valid LedgerString (as describe in ``value.proto``).
   * Optional
   */
  ledgerId: string;
  /**
   * The ID of a particular transaction.
   * Must be a valid LedgerString (as describe in ``value.proto``).
   * Required
   */
  transactionId: string;
  /**
   * The parties whose events the client expects to see.
   * Events that are not visible for the parties in this collection will not be present in the response.
   * Each element be a valid PartyIdString (as describe in ``value.proto``).
   * Required
   */
  requestingParties: string[];
}

export interface GetTransactionResponse {
  transaction: TransactionTree | undefined;
}

export interface GetFlatTransactionResponse {
  transaction: Transaction | undefined;
}

export interface GetLedgerEndRequest {
  /**
   * Must correspond to the ledger ID reported by the Ledger Identification Service.
   * Must be a valid LedgerString (as describe in ``value.proto``).
   * Optional
   */
  ledgerId: string;
}

export interface GetLedgerEndResponse {
  /** The absolute offset of the current ledger end. */
  offset: LedgerOffset | undefined;
}

function createBaseGetTransactionsRequest(): GetTransactionsRequest {
  return {
    ledgerId: "",
    begin: undefined,
    end: undefined,
    filter: undefined,
    verbose: false,
  };
}

export const GetTransactionsRequest = {
  encode(
    message: GetTransactionsRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ledgerId !== "") {
      writer.uint32(10).string(message.ledgerId);
    }
    if (message.begin !== undefined) {
      LedgerOffset.encode(message.begin, writer.uint32(18).fork()).ldelim();
    }
    if (message.end !== undefined) {
      LedgerOffset.encode(message.end, writer.uint32(26).fork()).ldelim();
    }
    if (message.filter !== undefined) {
      TransactionFilter.encode(
        message.filter,
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.verbose === true) {
      writer.uint32(40).bool(message.verbose);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTransactionsRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionsRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ledgerId = reader.string();
          break;
        case 2:
          message.begin = LedgerOffset.decode(reader, reader.uint32());
          break;
        case 3:
          message.end = LedgerOffset.decode(reader, reader.uint32());
          break;
        case 4:
          message.filter = TransactionFilter.decode(reader, reader.uint32());
          break;
        case 5:
          message.verbose = reader.bool();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTransactionsRequest {
    return {
      ledgerId: isSet(object.ledgerId) ? String(object.ledgerId) : "",
      begin: isSet(object.begin)
        ? LedgerOffset.fromJSON(object.begin)
        : undefined,
      end: isSet(object.end) ? LedgerOffset.fromJSON(object.end) : undefined,
      filter: isSet(object.filter)
        ? TransactionFilter.fromJSON(object.filter)
        : undefined,
      verbose: isSet(object.verbose) ? Boolean(object.verbose) : false,
    };
  },

  toJSON(message: GetTransactionsRequest): unknown {
    const obj: any = {};
    message.ledgerId !== undefined && (obj.ledgerId = message.ledgerId);
    message.begin !== undefined &&
      (obj.begin = message.begin
        ? LedgerOffset.toJSON(message.begin)
        : undefined);
    message.end !== undefined &&
      (obj.end = message.end ? LedgerOffset.toJSON(message.end) : undefined);
    message.filter !== undefined &&
      (obj.filter = message.filter
        ? TransactionFilter.toJSON(message.filter)
        : undefined);
    message.verbose !== undefined && (obj.verbose = message.verbose);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionsRequest>, I>>(
    object: I
  ): GetTransactionsRequest {
    const message = createBaseGetTransactionsRequest();
    message.ledgerId = object.ledgerId ?? "";
    message.begin =
      object.begin !== undefined && object.begin !== null
        ? LedgerOffset.fromPartial(object.begin)
        : undefined;
    message.end =
      object.end !== undefined && object.end !== null
        ? LedgerOffset.fromPartial(object.end)
        : undefined;
    message.filter =
      object.filter !== undefined && object.filter !== null
        ? TransactionFilter.fromPartial(object.filter)
        : undefined;
    message.verbose = object.verbose ?? false;
    return message;
  },
};

function createBaseGetTransactionsResponse(): GetTransactionsResponse {
  return { transactions: [] };
}

export const GetTransactionsResponse = {
  encode(
    message: GetTransactionsResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.transactions) {
      Transaction.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTransactionsResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionsResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactions.push(
            Transaction.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTransactionsResponse {
    return {
      transactions: Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => Transaction.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetTransactionsResponse): unknown {
    const obj: any = {};
    if (message.transactions) {
      obj.transactions = message.transactions.map((e) =>
        e ? Transaction.toJSON(e) : undefined
      );
    } else {
      obj.transactions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionsResponse>, I>>(
    object: I
  ): GetTransactionsResponse {
    const message = createBaseGetTransactionsResponse();
    message.transactions =
      object.transactions?.map((e) => Transaction.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetTransactionTreesResponse(): GetTransactionTreesResponse {
  return { transactions: [] };
}

export const GetTransactionTreesResponse = {
  encode(
    message: GetTransactionTreesResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.transactions) {
      TransactionTree.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTransactionTreesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionTreesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactions.push(
            TransactionTree.decode(reader, reader.uint32())
          );
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTransactionTreesResponse {
    return {
      transactions: Array.isArray(object?.transactions)
        ? object.transactions.map((e: any) => TransactionTree.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GetTransactionTreesResponse): unknown {
    const obj: any = {};
    if (message.transactions) {
      obj.transactions = message.transactions.map((e) =>
        e ? TransactionTree.toJSON(e) : undefined
      );
    } else {
      obj.transactions = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionTreesResponse>, I>>(
    object: I
  ): GetTransactionTreesResponse {
    const message = createBaseGetTransactionTreesResponse();
    message.transactions =
      object.transactions?.map((e) => TransactionTree.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGetTransactionByEventIdRequest(): GetTransactionByEventIdRequest {
  return { ledgerId: "", eventId: "", requestingParties: [] };
}

export const GetTransactionByEventIdRequest = {
  encode(
    message: GetTransactionByEventIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ledgerId !== "") {
      writer.uint32(10).string(message.ledgerId);
    }
    if (message.eventId !== "") {
      writer.uint32(18).string(message.eventId);
    }
    for (const v of message.requestingParties) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTransactionByEventIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionByEventIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ledgerId = reader.string();
          break;
        case 2:
          message.eventId = reader.string();
          break;
        case 3:
          message.requestingParties.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTransactionByEventIdRequest {
    return {
      ledgerId: isSet(object.ledgerId) ? String(object.ledgerId) : "",
      eventId: isSet(object.eventId) ? String(object.eventId) : "",
      requestingParties: Array.isArray(object?.requestingParties)
        ? object.requestingParties.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetTransactionByEventIdRequest): unknown {
    const obj: any = {};
    message.ledgerId !== undefined && (obj.ledgerId = message.ledgerId);
    message.eventId !== undefined && (obj.eventId = message.eventId);
    if (message.requestingParties) {
      obj.requestingParties = message.requestingParties.map((e) => e);
    } else {
      obj.requestingParties = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionByEventIdRequest>, I>>(
    object: I
  ): GetTransactionByEventIdRequest {
    const message = createBaseGetTransactionByEventIdRequest();
    message.ledgerId = object.ledgerId ?? "";
    message.eventId = object.eventId ?? "";
    message.requestingParties = object.requestingParties?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetTransactionByIdRequest(): GetTransactionByIdRequest {
  return { ledgerId: "", transactionId: "", requestingParties: [] };
}

export const GetTransactionByIdRequest = {
  encode(
    message: GetTransactionByIdRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ledgerId !== "") {
      writer.uint32(10).string(message.ledgerId);
    }
    if (message.transactionId !== "") {
      writer.uint32(18).string(message.transactionId);
    }
    for (const v of message.requestingParties) {
      writer.uint32(26).string(v!);
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTransactionByIdRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionByIdRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ledgerId = reader.string();
          break;
        case 2:
          message.transactionId = reader.string();
          break;
        case 3:
          message.requestingParties.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTransactionByIdRequest {
    return {
      ledgerId: isSet(object.ledgerId) ? String(object.ledgerId) : "",
      transactionId: isSet(object.transactionId)
        ? String(object.transactionId)
        : "",
      requestingParties: Array.isArray(object?.requestingParties)
        ? object.requestingParties.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: GetTransactionByIdRequest): unknown {
    const obj: any = {};
    message.ledgerId !== undefined && (obj.ledgerId = message.ledgerId);
    message.transactionId !== undefined &&
      (obj.transactionId = message.transactionId);
    if (message.requestingParties) {
      obj.requestingParties = message.requestingParties.map((e) => e);
    } else {
      obj.requestingParties = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionByIdRequest>, I>>(
    object: I
  ): GetTransactionByIdRequest {
    const message = createBaseGetTransactionByIdRequest();
    message.ledgerId = object.ledgerId ?? "";
    message.transactionId = object.transactionId ?? "";
    message.requestingParties = object.requestingParties?.map((e) => e) || [];
    return message;
  },
};

function createBaseGetTransactionResponse(): GetTransactionResponse {
  return { transaction: undefined };
}

export const GetTransactionResponse = {
  encode(
    message: GetTransactionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.transaction !== undefined) {
      TransactionTree.encode(
        message.transaction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetTransactionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transaction = TransactionTree.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetTransactionResponse {
    return {
      transaction: isSet(object.transaction)
        ? TransactionTree.fromJSON(object.transaction)
        : undefined,
    };
  },

  toJSON(message: GetTransactionResponse): unknown {
    const obj: any = {};
    message.transaction !== undefined &&
      (obj.transaction = message.transaction
        ? TransactionTree.toJSON(message.transaction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetTransactionResponse>, I>>(
    object: I
  ): GetTransactionResponse {
    const message = createBaseGetTransactionResponse();
    message.transaction =
      object.transaction !== undefined && object.transaction !== null
        ? TransactionTree.fromPartial(object.transaction)
        : undefined;
    return message;
  },
};

function createBaseGetFlatTransactionResponse(): GetFlatTransactionResponse {
  return { transaction: undefined };
}

export const GetFlatTransactionResponse = {
  encode(
    message: GetFlatTransactionResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.transaction !== undefined) {
      Transaction.encode(
        message.transaction,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetFlatTransactionResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetFlatTransactionResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transaction = Transaction.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetFlatTransactionResponse {
    return {
      transaction: isSet(object.transaction)
        ? Transaction.fromJSON(object.transaction)
        : undefined,
    };
  },

  toJSON(message: GetFlatTransactionResponse): unknown {
    const obj: any = {};
    message.transaction !== undefined &&
      (obj.transaction = message.transaction
        ? Transaction.toJSON(message.transaction)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetFlatTransactionResponse>, I>>(
    object: I
  ): GetFlatTransactionResponse {
    const message = createBaseGetFlatTransactionResponse();
    message.transaction =
      object.transaction !== undefined && object.transaction !== null
        ? Transaction.fromPartial(object.transaction)
        : undefined;
    return message;
  },
};

function createBaseGetLedgerEndRequest(): GetLedgerEndRequest {
  return { ledgerId: "" };
}

export const GetLedgerEndRequest = {
  encode(
    message: GetLedgerEndRequest,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.ledgerId !== "") {
      writer.uint32(10).string(message.ledgerId);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GetLedgerEndRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLedgerEndRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ledgerId = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLedgerEndRequest {
    return {
      ledgerId: isSet(object.ledgerId) ? String(object.ledgerId) : "",
    };
  },

  toJSON(message: GetLedgerEndRequest): unknown {
    const obj: any = {};
    message.ledgerId !== undefined && (obj.ledgerId = message.ledgerId);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLedgerEndRequest>, I>>(
    object: I
  ): GetLedgerEndRequest {
    const message = createBaseGetLedgerEndRequest();
    message.ledgerId = object.ledgerId ?? "";
    return message;
  },
};

function createBaseGetLedgerEndResponse(): GetLedgerEndResponse {
  return { offset: undefined };
}

export const GetLedgerEndResponse = {
  encode(
    message: GetLedgerEndResponse,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.offset !== undefined) {
      LedgerOffset.encode(message.offset, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): GetLedgerEndResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetLedgerEndResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.offset = LedgerOffset.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GetLedgerEndResponse {
    return {
      offset: isSet(object.offset)
        ? LedgerOffset.fromJSON(object.offset)
        : undefined,
    };
  },

  toJSON(message: GetLedgerEndResponse): unknown {
    const obj: any = {};
    message.offset !== undefined &&
      (obj.offset = message.offset
        ? LedgerOffset.toJSON(message.offset)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GetLedgerEndResponse>, I>>(
    object: I
  ): GetLedgerEndResponse {
    const message = createBaseGetLedgerEndResponse();
    message.offset =
      object.offset !== undefined && object.offset !== null
        ? LedgerOffset.fromPartial(object.offset)
        : undefined;
    return message;
  },
};

/** Allows clients to read transactions from the ledger. */
export interface TransactionService {
  /**
   * Read the ledger's filtered transaction stream for a set of parties.
   * Lists only creates and archives, but not other events.
   * Omits all events on transient contracts, i.e., contracts that were both created and archived in the same transaction.
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id
   * - ``INVALID_ARGUMENT``: if the payload is malformed or is missing required fields (e.g. if ``before`` is not before ``end``)
   * - ``FAILED_PRECONDITION``: if the ledger has been pruned after the subscription start offset
   * - ``OUT_OF_RANGE``: if the ``begin`` parameter value is not before the end of the ledger
   */
  GetTransactions(
    request: GetTransactionsRequest
  ): Observable<GetTransactionsResponse>;
  /**
   * Read the ledger's complete transaction tree stream for a set of parties.
   * The stream can be filtered only by parties, but not templates (template filter must be empty).
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id
   * - ``INVALID_ARGUMENT``: if the payload is malformed or is missing required fields (e.g. if ``before`` is not before ``end``)
   * - ``FAILED_PRECONDITION``: if the ledger has been pruned after the subscription start offset
   * - ``OUT_OF_RANGE``: if the ``begin`` parameter value is not before the end of the ledger
   */
  GetTransactionTrees(
    request: GetTransactionsRequest
  ): Observable<GetTransactionTreesResponse>;
  /**
   * Lookup a transaction tree by the ID of an event that appears within it.
   * For looking up a transaction instead of a transaction tree, please see GetFlatTransactionByEventId
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id or no such transaction exists
   * - ``INVALID_ARGUMENT``: if the payload is malformed or is missing required fields (e.g. if requesting parties are invalid or empty)
   */
  GetTransactionByEventId(
    request: GetTransactionByEventIdRequest
  ): Promise<GetTransactionResponse>;
  /**
   * Lookup a transaction tree by its ID.
   * For looking up a transaction instead of a transaction tree, please see GetFlatTransactionById
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id or no such transaction exists
   * - ``INVALID_ARGUMENT``: if the payload is malformed or is missing required fields (e.g. if requesting parties are invalid or empty)
   */
  GetTransactionById(
    request: GetTransactionByIdRequest
  ): Promise<GetTransactionResponse>;
  /**
   * Lookup a transaction by the ID of an event that appears within it.
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id or no such transaction exists
   * - ``INVALID_ARGUMENT``: if the payload is malformed or is missing required fields (e.g. if requesting parties are invalid or empty)
   */
  GetFlatTransactionByEventId(
    request: GetTransactionByEventIdRequest
  ): Promise<GetFlatTransactionResponse>;
  /**
   * Lookup a transaction by its ID.
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id or no such transaction exists
   * - ``INVALID_ARGUMENT``: if the payload is malformed or is missing required fields (e.g. if requesting parties are invalid or empty)
   */
  GetFlatTransactionById(
    request: GetTransactionByIdRequest
  ): Promise<GetFlatTransactionResponse>;
  /**
   * Get the current ledger end.
   * Subscriptions started with the returned offset will serve transactions created after this RPC was called.
   * Errors:
   * - ``UNAUTHENTICATED``: if the request does not include a valid access token
   * - ``PERMISSION_DENIED``: if the claims in the token are insufficient to perform a given operation
   * - ``NOT_FOUND``: if the request does not include a valid ledger id
   */
  GetLedgerEnd(request: GetLedgerEndRequest): Promise<GetLedgerEndResponse>;
}

export class TransactionServiceClientImpl implements TransactionService {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetTransactions = this.GetTransactions.bind(this);
    this.GetTransactionTrees = this.GetTransactionTrees.bind(this);
    this.GetTransactionByEventId = this.GetTransactionByEventId.bind(this);
    this.GetTransactionById = this.GetTransactionById.bind(this);
    this.GetFlatTransactionByEventId =
      this.GetFlatTransactionByEventId.bind(this);
    this.GetFlatTransactionById = this.GetFlatTransactionById.bind(this);
    this.GetLedgerEnd = this.GetLedgerEnd.bind(this);
  }
  GetTransactions(
    request: GetTransactionsRequest
  ): Observable<GetTransactionsResponse> {
    const data = GetTransactionsRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "com.daml.ledger.api.v1.TransactionService",
      "GetTransactions",
      data
    );
    return result.pipe(
      map((data) => GetTransactionsResponse.decode(new _m0.Reader(data)))
    );
  }

  GetTransactionTrees(
    request: GetTransactionsRequest
  ): Observable<GetTransactionTreesResponse> {
    const data = GetTransactionsRequest.encode(request).finish();
    const result = this.rpc.serverStreamingRequest(
      "com.daml.ledger.api.v1.TransactionService",
      "GetTransactionTrees",
      data
    );
    return result.pipe(
      map((data) => GetTransactionTreesResponse.decode(new _m0.Reader(data)))
    );
  }

  GetTransactionByEventId(
    request: GetTransactionByEventIdRequest
  ): Promise<GetTransactionResponse> {
    const data = GetTransactionByEventIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.TransactionService",
      "GetTransactionByEventId",
      data
    );
    return promise.then((data) =>
      GetTransactionResponse.decode(new _m0.Reader(data))
    );
  }

  GetTransactionById(
    request: GetTransactionByIdRequest
  ): Promise<GetTransactionResponse> {
    const data = GetTransactionByIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.TransactionService",
      "GetTransactionById",
      data
    );
    return promise.then((data) =>
      GetTransactionResponse.decode(new _m0.Reader(data))
    );
  }

  GetFlatTransactionByEventId(
    request: GetTransactionByEventIdRequest
  ): Promise<GetFlatTransactionResponse> {
    const data = GetTransactionByEventIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.TransactionService",
      "GetFlatTransactionByEventId",
      data
    );
    return promise.then((data) =>
      GetFlatTransactionResponse.decode(new _m0.Reader(data))
    );
  }

  GetFlatTransactionById(
    request: GetTransactionByIdRequest
  ): Promise<GetFlatTransactionResponse> {
    const data = GetTransactionByIdRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.TransactionService",
      "GetFlatTransactionById",
      data
    );
    return promise.then((data) =>
      GetFlatTransactionResponse.decode(new _m0.Reader(data))
    );
  }

  GetLedgerEnd(request: GetLedgerEndRequest): Promise<GetLedgerEndResponse> {
    const data = GetLedgerEndRequest.encode(request).finish();
    const promise = this.rpc.request(
      "com.daml.ledger.api.v1.TransactionService",
      "GetLedgerEnd",
      data
    );
    return promise.then((data) =>
      GetLedgerEndResponse.decode(new _m0.Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
  clientStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Promise<Uint8Array>;
  serverStreamingRequest(
    service: string,
    method: string,
    data: Uint8Array
  ): Observable<Uint8Array>;
  bidirectionalStreamingRequest(
    service: string,
    method: string,
    data: Observable<Uint8Array>
  ): Observable<Uint8Array>;
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
