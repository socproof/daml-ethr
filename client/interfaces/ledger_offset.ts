/* eslint-disable */
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1";

/**
 * Describes a specific point on the ledger.
 *
 * The Ledger API endpoints that take offsets allow to specify portions
 * of the ledger that are relevant for the client to read.
 *
 * Offsets returned by the Ledger API can be used as-is (e.g.
 * to keep track of processed transactions and provide a restart
 * point to use in case of need).
 *
 * The format of absolute offsets is opaque to the client: no
 * client-side transformation of an offset is guaranteed
 * to return a meaningful offset.
 *
 * The server implementation ensures internally that offsets
 * are lexicographically comparable.
 */
export interface LedgerOffset {
  /** The format of this string is specific to the ledger and opaque to the client. */
  absolute: string | undefined;
  boundary: LedgerOffset_LedgerBoundary | undefined;
}

export enum LedgerOffset_LedgerBoundary {
  /** LEDGER_BEGIN - Refers to the first transaction. */
  LEDGER_BEGIN = 0,
  /** LEDGER_END - Refers to the currently last transaction, which is a moving target. */
  LEDGER_END = 1,
  UNRECOGNIZED = -1,
}

export function ledgerOffset_LedgerBoundaryFromJSON(
  object: any
): LedgerOffset_LedgerBoundary {
  switch (object) {
    case 0:
    case "LEDGER_BEGIN":
      return LedgerOffset_LedgerBoundary.LEDGER_BEGIN;
    case 1:
    case "LEDGER_END":
      return LedgerOffset_LedgerBoundary.LEDGER_END;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LedgerOffset_LedgerBoundary.UNRECOGNIZED;
  }
}

export function ledgerOffset_LedgerBoundaryToJSON(
  object: LedgerOffset_LedgerBoundary
): string {
  switch (object) {
    case LedgerOffset_LedgerBoundary.LEDGER_BEGIN:
      return "LEDGER_BEGIN";
    case LedgerOffset_LedgerBoundary.LEDGER_END:
      return "LEDGER_END";
    case LedgerOffset_LedgerBoundary.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseLedgerOffset(): LedgerOffset {
  return { absolute: undefined, boundary: undefined };
}

export const LedgerOffset = {
  encode(
    message: LedgerOffset,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.absolute !== undefined) {
      writer.uint32(10).string(message.absolute);
    }
    if (message.boundary !== undefined) {
      writer.uint32(16).int32(message.boundary);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LedgerOffset {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLedgerOffset();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.absolute = reader.string();
          break;
        case 2:
          message.boundary = reader.int32() as any;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LedgerOffset {
    return {
      absolute: isSet(object.absolute) ? String(object.absolute) : undefined,
      boundary: isSet(object.boundary)
        ? ledgerOffset_LedgerBoundaryFromJSON(object.boundary)
        : undefined,
    };
  },

  toJSON(message: LedgerOffset): unknown {
    const obj: any = {};
    message.absolute !== undefined && (obj.absolute = message.absolute);
    message.boundary !== undefined &&
      (obj.boundary =
        message.boundary !== undefined
          ? ledgerOffset_LedgerBoundaryToJSON(message.boundary)
          : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LedgerOffset>, I>>(
    object: I
  ): LedgerOffset {
    const message = createBaseLedgerOffset();
    message.absolute = object.absolute ?? undefined;
    message.boundary = object.boundary ?? undefined;
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
