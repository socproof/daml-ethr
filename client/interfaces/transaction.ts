/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import { CreatedEvent, ExercisedEvent, Event } from "./event";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1";

/** Complete view of an on-ledger transaction. */
export interface TransactionTree {
  /**
   * Assigned by the server. Useful for correlating logs.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  transactionId: string;
  /**
   * The ID of the command which resulted in this transaction. Missing for everyone except the submitting party.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  commandId: string;
  /**
   * The workflow ID used in command submission. Only set if the ``workflow_id`` for the command was set.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  workflowId: string;
  /**
   * Ledger effective time.
   * Required
   */
  effectiveAt: Date | undefined;
  /**
   * The absolute offset. The format of this field is described in ``ledger_offset.proto``.
   * Required
   */
  offset: string;
  /**
   * Changes to the ledger that were caused by this transaction. Nodes of the transaction tree.
   * Each key be a valid LedgerString (as describe in ``value.proto``).
   * Required
   */
  eventsById: { [key: string]: TreeEvent };
  /**
   * Roots of the transaction tree.
   * Each element must be a valid LedgerString (as describe in ``value.proto``).
   * The elements are in the same order as the commands in the
   * corresponding Commands object that triggered this transaction.
   * Required
   */
  rootEventIds: string[];
}

export interface TransactionTree_EventsByIdEntry {
  key: string;
  value: TreeEvent | undefined;
}

/**
 * Each tree event message type below contains a ``witness_parties`` field which
 * indicates the subset of the requested parties that can see the event
 * in question.
 *
 * Note that transaction trees might contain events with
 * _no_ witness parties, which were included simply because they were
 * children of events which have witnesses.
 */
export interface TreeEvent {
  created: CreatedEvent | undefined;
  exercised: ExercisedEvent | undefined;
}

/** Filtered view of an on-ledger transaction. */
export interface Transaction {
  /**
   * Assigned by the server. Useful for correlating logs.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  transactionId: string;
  /**
   * The ID of the command which resulted in this transaction. Missing for everyone except the submitting party.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  commandId: string;
  /**
   * The workflow ID used in command submission.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  workflowId: string;
  /**
   * Ledger effective time.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  effectiveAt: Date | undefined;
  /**
   * The collection of events.
   * Only contains ``CreatedEvent`` or ``ArchivedEvent``.
   * Required
   */
  events: Event[];
  /**
   * The absolute offset. The format of this field is described in ``ledger_offset.proto``.
   * Required
   */
  offset: string;
}

function createBaseTransactionTree(): TransactionTree {
  return {
    transactionId: "",
    commandId: "",
    workflowId: "",
    effectiveAt: undefined,
    offset: "",
    eventsById: {},
    rootEventIds: [],
  };
}

export const TransactionTree = {
  encode(
    message: TransactionTree,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.commandId !== "") {
      writer.uint32(18).string(message.commandId);
    }
    if (message.workflowId !== "") {
      writer.uint32(26).string(message.workflowId);
    }
    if (message.effectiveAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.effectiveAt),
        writer.uint32(34).fork()
      ).ldelim();
    }
    if (message.offset !== "") {
      writer.uint32(50).string(message.offset);
    }
    Object.entries(message.eventsById).forEach(([key, value]) => {
      TransactionTree_EventsByIdEntry.encode(
        { key: key as any, value },
        writer.uint32(58).fork()
      ).ldelim();
    });
    for (const v of message.rootEventIds) {
      writer.uint32(66).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionTree {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionTree();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        case 2:
          message.commandId = reader.string();
          break;
        case 3:
          message.workflowId = reader.string();
          break;
        case 4:
          message.effectiveAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 6:
          message.offset = reader.string();
          break;
        case 7:
          const entry7 = TransactionTree_EventsByIdEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry7.value !== undefined) {
            message.eventsById[entry7.key] = entry7.value;
          }
          break;
        case 8:
          message.rootEventIds.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionTree {
    return {
      transactionId: isSet(object.transactionId)
        ? String(object.transactionId)
        : "",
      commandId: isSet(object.commandId) ? String(object.commandId) : "",
      workflowId: isSet(object.workflowId) ? String(object.workflowId) : "",
      effectiveAt: isSet(object.effectiveAt)
        ? fromJsonTimestamp(object.effectiveAt)
        : undefined,
      offset: isSet(object.offset) ? String(object.offset) : "",
      eventsById: isObject(object.eventsById)
        ? Object.entries(object.eventsById).reduce<{
            [key: string]: TreeEvent;
          }>((acc, [key, value]) => {
            acc[key] = TreeEvent.fromJSON(value);
            return acc;
          }, {})
        : {},
      rootEventIds: Array.isArray(object?.rootEventIds)
        ? object.rootEventIds.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: TransactionTree): unknown {
    const obj: any = {};
    message.transactionId !== undefined &&
      (obj.transactionId = message.transactionId);
    message.commandId !== undefined && (obj.commandId = message.commandId);
    message.workflowId !== undefined && (obj.workflowId = message.workflowId);
    message.effectiveAt !== undefined &&
      (obj.effectiveAt = message.effectiveAt.toISOString());
    message.offset !== undefined && (obj.offset = message.offset);
    obj.eventsById = {};
    if (message.eventsById) {
      Object.entries(message.eventsById).forEach(([k, v]) => {
        obj.eventsById[k] = TreeEvent.toJSON(v);
      });
    }
    if (message.rootEventIds) {
      obj.rootEventIds = message.rootEventIds.map((e) => e);
    } else {
      obj.rootEventIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionTree>, I>>(
    object: I
  ): TransactionTree {
    const message = createBaseTransactionTree();
    message.transactionId = object.transactionId ?? "";
    message.commandId = object.commandId ?? "";
    message.workflowId = object.workflowId ?? "";
    message.effectiveAt = object.effectiveAt ?? undefined;
    message.offset = object.offset ?? "";
    message.eventsById = Object.entries(object.eventsById ?? {}).reduce<{
      [key: string]: TreeEvent;
    }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = TreeEvent.fromPartial(value);
      }
      return acc;
    }, {});
    message.rootEventIds = object.rootEventIds?.map((e) => e) || [];
    return message;
  },
};

function createBaseTransactionTree_EventsByIdEntry(): TransactionTree_EventsByIdEntry {
  return { key: "", value: undefined };
}

export const TransactionTree_EventsByIdEntry = {
  encode(
    message: TransactionTree_EventsByIdEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      TreeEvent.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TransactionTree_EventsByIdEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionTree_EventsByIdEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = TreeEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionTree_EventsByIdEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? TreeEvent.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: TransactionTree_EventsByIdEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? TreeEvent.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionTree_EventsByIdEntry>, I>>(
    object: I
  ): TransactionTree_EventsByIdEntry {
    const message = createBaseTransactionTree_EventsByIdEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? TreeEvent.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseTreeEvent(): TreeEvent {
  return { created: undefined, exercised: undefined };
}

export const TreeEvent = {
  encode(
    message: TreeEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.created !== undefined) {
      CreatedEvent.encode(message.created, writer.uint32(10).fork()).ldelim();
    }
    if (message.exercised !== undefined) {
      ExercisedEvent.encode(
        message.exercised,
        writer.uint32(18).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TreeEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTreeEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.created = CreatedEvent.decode(reader, reader.uint32());
          break;
        case 2:
          message.exercised = ExercisedEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TreeEvent {
    return {
      created: isSet(object.created)
        ? CreatedEvent.fromJSON(object.created)
        : undefined,
      exercised: isSet(object.exercised)
        ? ExercisedEvent.fromJSON(object.exercised)
        : undefined,
    };
  },

  toJSON(message: TreeEvent): unknown {
    const obj: any = {};
    message.created !== undefined &&
      (obj.created = message.created
        ? CreatedEvent.toJSON(message.created)
        : undefined);
    message.exercised !== undefined &&
      (obj.exercised = message.exercised
        ? ExercisedEvent.toJSON(message.exercised)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TreeEvent>, I>>(
    object: I
  ): TreeEvent {
    const message = createBaseTreeEvent();
    message.created =
      object.created !== undefined && object.created !== null
        ? CreatedEvent.fromPartial(object.created)
        : undefined;
    message.exercised =
      object.exercised !== undefined && object.exercised !== null
        ? ExercisedEvent.fromPartial(object.exercised)
        : undefined;
    return message;
  },
};

function createBaseTransaction(): Transaction {
  return {
    transactionId: "",
    commandId: "",
    workflowId: "",
    effectiveAt: undefined,
    events: [],
    offset: "",
  };
}

export const Transaction = {
  encode(
    message: Transaction,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.transactionId !== "") {
      writer.uint32(10).string(message.transactionId);
    }
    if (message.commandId !== "") {
      writer.uint32(18).string(message.commandId);
    }
    if (message.workflowId !== "") {
      writer.uint32(26).string(message.workflowId);
    }
    if (message.effectiveAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.effectiveAt),
        writer.uint32(34).fork()
      ).ldelim();
    }
    for (const v of message.events) {
      Event.encode(v!, writer.uint32(42).fork()).ldelim();
    }
    if (message.offset !== "") {
      writer.uint32(50).string(message.offset);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Transaction {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.transactionId = reader.string();
          break;
        case 2:
          message.commandId = reader.string();
          break;
        case 3:
          message.workflowId = reader.string();
          break;
        case 4:
          message.effectiveAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 5:
          message.events.push(Event.decode(reader, reader.uint32()));
          break;
        case 6:
          message.offset = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Transaction {
    return {
      transactionId: isSet(object.transactionId)
        ? String(object.transactionId)
        : "",
      commandId: isSet(object.commandId) ? String(object.commandId) : "",
      workflowId: isSet(object.workflowId) ? String(object.workflowId) : "",
      effectiveAt: isSet(object.effectiveAt)
        ? fromJsonTimestamp(object.effectiveAt)
        : undefined,
      events: Array.isArray(object?.events)
        ? object.events.map((e: any) => Event.fromJSON(e))
        : [],
      offset: isSet(object.offset) ? String(object.offset) : "",
    };
  },

  toJSON(message: Transaction): unknown {
    const obj: any = {};
    message.transactionId !== undefined &&
      (obj.transactionId = message.transactionId);
    message.commandId !== undefined && (obj.commandId = message.commandId);
    message.workflowId !== undefined && (obj.workflowId = message.workflowId);
    message.effectiveAt !== undefined &&
      (obj.effectiveAt = message.effectiveAt.toISOString());
    if (message.events) {
      obj.events = message.events.map((e) => (e ? Event.toJSON(e) : undefined));
    } else {
      obj.events = [];
    }
    message.offset !== undefined && (obj.offset = message.offset);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Transaction>, I>>(
    object: I
  ): Transaction {
    const message = createBaseTransaction();
    message.transactionId = object.transactionId ?? "";
    message.commandId = object.commandId ?? "";
    message.workflowId = object.workflowId ?? "";
    message.effectiveAt = object.effectiveAt ?? undefined;
    message.events = object.events?.map((e) => Event.fromPartial(e)) || [];
    message.offset = object.offset ?? "";
    return message;
  },
};

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

function toTimestamp(date: Date): Timestamp {
  const seconds = date.getTime() / 1_000;
  const nanos = (date.getTime() % 1_000) * 1_000_000;
  return { seconds, nanos };
}

function fromTimestamp(t: Timestamp): Date {
  let millis = t.seconds * 1_000;
  millis += t.nanos / 1_000_000;
  return new Date(millis);
}

function fromJsonTimestamp(o: any): Date {
  if (o instanceof Date) {
    return o;
  } else if (typeof o === "string") {
    return new Date(o);
  } else {
    return fromTimestamp(Timestamp.fromJSON(o));
  }
}

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
