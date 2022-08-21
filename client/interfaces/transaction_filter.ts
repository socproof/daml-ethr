/* eslint-disable */
import { Identifier } from "./value";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1";

/**
 * Used for filtering Transaction and Active Contract Set streams.
 * Determines which on-ledger events will be served to the client.
 */
export interface TransactionFilter {
  /**
   * Keys of the map determine which parties' on-ledger transactions are being queried.
   * Values of the map determine which events are disclosed in the stream per party.
   * At the minimum, a party needs to set an empty Filters message to receive any events.
   * Each key must be a valid PartyIdString (as described in ``value.proto``).
   * Required
   */
  filtersByParty: { [key: string]: Filters };
}

export interface TransactionFilter_FiltersByPartyEntry {
  key: string;
  value: Filters | undefined;
}

export interface Filters {
  /**
   * If not set, no filters will be applied.
   * Optional
   */
  inclusive: InclusiveFilters | undefined;
}

/** If no internal fields are set, no filters will be applied. */
export interface InclusiveFilters {
  /**
   * A collection of templates.
   * SHOULD NOT contain duplicates.
   * Required
   */
  templateIds: Identifier[];
}

function createBaseTransactionFilter(): TransactionFilter {
  return { filtersByParty: {} };
}

export const TransactionFilter = {
  encode(
    message: TransactionFilter,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    Object.entries(message.filtersByParty).forEach(([key, value]) => {
      TransactionFilter_FiltersByPartyEntry.encode(
        { key: key as any, value },
        writer.uint32(10).fork()
      ).ldelim();
    });
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): TransactionFilter {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionFilter();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          const entry1 = TransactionFilter_FiltersByPartyEntry.decode(
            reader,
            reader.uint32()
          );
          if (entry1.value !== undefined) {
            message.filtersByParty[entry1.key] = entry1.value;
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionFilter {
    return {
      filtersByParty: isObject(object.filtersByParty)
        ? Object.entries(object.filtersByParty).reduce<{
            [key: string]: Filters;
          }>((acc, [key, value]) => {
            acc[key] = Filters.fromJSON(value);
            return acc;
          }, {})
        : {},
    };
  },

  toJSON(message: TransactionFilter): unknown {
    const obj: any = {};
    obj.filtersByParty = {};
    if (message.filtersByParty) {
      Object.entries(message.filtersByParty).forEach(([k, v]) => {
        obj.filtersByParty[k] = Filters.toJSON(v);
      });
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<TransactionFilter>, I>>(
    object: I
  ): TransactionFilter {
    const message = createBaseTransactionFilter();
    message.filtersByParty = Object.entries(
      object.filtersByParty ?? {}
    ).reduce<{ [key: string]: Filters }>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = Filters.fromPartial(value);
      }
      return acc;
    }, {});
    return message;
  },
};

function createBaseTransactionFilter_FiltersByPartyEntry(): TransactionFilter_FiltersByPartyEntry {
  return { key: "", value: undefined };
}

export const TransactionFilter_FiltersByPartyEntry = {
  encode(
    message: TransactionFilter_FiltersByPartyEntry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Filters.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: _m0.Reader | Uint8Array,
    length?: number
  ): TransactionFilter_FiltersByPartyEntry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseTransactionFilter_FiltersByPartyEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Filters.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): TransactionFilter_FiltersByPartyEntry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Filters.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: TransactionFilter_FiltersByPartyEntry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Filters.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<
    I extends Exact<DeepPartial<TransactionFilter_FiltersByPartyEntry>, I>
  >(object: I): TransactionFilter_FiltersByPartyEntry {
    const message = createBaseTransactionFilter_FiltersByPartyEntry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Filters.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseFilters(): Filters {
  return { inclusive: undefined };
}

export const Filters = {
  encode(
    message: Filters,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.inclusive !== undefined) {
      InclusiveFilters.encode(
        message.inclusive,
        writer.uint32(10).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Filters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFilters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.inclusive = InclusiveFilters.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Filters {
    return {
      inclusive: isSet(object.inclusive)
        ? InclusiveFilters.fromJSON(object.inclusive)
        : undefined,
    };
  },

  toJSON(message: Filters): unknown {
    const obj: any = {};
    message.inclusive !== undefined &&
      (obj.inclusive = message.inclusive
        ? InclusiveFilters.toJSON(message.inclusive)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Filters>, I>>(object: I): Filters {
    const message = createBaseFilters();
    message.inclusive =
      object.inclusive !== undefined && object.inclusive !== null
        ? InclusiveFilters.fromPartial(object.inclusive)
        : undefined;
    return message;
  },
};

function createBaseInclusiveFilters(): InclusiveFilters {
  return { templateIds: [] };
}

export const InclusiveFilters = {
  encode(
    message: InclusiveFilters,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.templateIds) {
      Identifier.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): InclusiveFilters {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInclusiveFilters();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.templateIds.push(Identifier.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): InclusiveFilters {
    return {
      templateIds: Array.isArray(object?.templateIds)
        ? object.templateIds.map((e: any) => Identifier.fromJSON(e))
        : [],
    };
  },

  toJSON(message: InclusiveFilters): unknown {
    const obj: any = {};
    if (message.templateIds) {
      obj.templateIds = message.templateIds.map((e) =>
        e ? Identifier.toJSON(e) : undefined
      );
    } else {
      obj.templateIds = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<InclusiveFilters>, I>>(
    object: I
  ): InclusiveFilters {
    const message = createBaseInclusiveFilters();
    message.templateIds =
      object.templateIds?.map((e) => Identifier.fromPartial(e)) || [];
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

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
