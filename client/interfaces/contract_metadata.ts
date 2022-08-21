/* eslint-disable */
import { Timestamp } from "./google/protobuf/timestamp";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1";

/**
 * Contract-related metadata used in DisclosedContract (that can be included in command submission)
 * or forwarded as part of the CreateEvent in Active Contract Set or Transaction streams.
 */
export interface ContractMetadata {
  /**
   * Ledger effective time of the transaction that created the contract.
   * Required
   */
  createdAt: Date | undefined;
  /**
   * Hash of the contract key if defined.
   * Optional
   */
  contractKeyHash: Uint8Array;
  /**
   * Driver-specific metadata. This is opaque and cannot be decoded.
   * Required
   */
  driverMetadata: Uint8Array;
}

function createBaseContractMetadata(): ContractMetadata {
  return {
    createdAt: undefined,
    contractKeyHash: new Uint8Array(),
    driverMetadata: new Uint8Array(),
  };
}

export const ContractMetadata = {
  encode(
    message: ContractMetadata,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.createdAt !== undefined) {
      Timestamp.encode(
        toTimestamp(message.createdAt),
        writer.uint32(10).fork()
      ).ldelim();
    }
    if (message.contractKeyHash.length !== 0) {
      writer.uint32(18).bytes(message.contractKeyHash);
    }
    if (message.driverMetadata.length !== 0) {
      writer.uint32(26).bytes(message.driverMetadata);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ContractMetadata {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseContractMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.createdAt = fromTimestamp(
            Timestamp.decode(reader, reader.uint32())
          );
          break;
        case 2:
          message.contractKeyHash = reader.bytes();
          break;
        case 3:
          message.driverMetadata = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ContractMetadata {
    return {
      createdAt: isSet(object.createdAt)
        ? fromJsonTimestamp(object.createdAt)
        : undefined,
      contractKeyHash: isSet(object.contractKeyHash)
        ? bytesFromBase64(object.contractKeyHash)
        : new Uint8Array(),
      driverMetadata: isSet(object.driverMetadata)
        ? bytesFromBase64(object.driverMetadata)
        : new Uint8Array(),
    };
  },

  toJSON(message: ContractMetadata): unknown {
    const obj: any = {};
    message.createdAt !== undefined &&
      (obj.createdAt = message.createdAt.toISOString());
    message.contractKeyHash !== undefined &&
      (obj.contractKeyHash = base64FromBytes(
        message.contractKeyHash !== undefined
          ? message.contractKeyHash
          : new Uint8Array()
      ));
    message.driverMetadata !== undefined &&
      (obj.driverMetadata = base64FromBytes(
        message.driverMetadata !== undefined
          ? message.driverMetadata
          : new Uint8Array()
      ));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ContractMetadata>, I>>(
    object: I
  ): ContractMetadata {
    const message = createBaseContractMetadata();
    message.createdAt = object.createdAt ?? undefined;
    message.contractKeyHash = object.contractKeyHash ?? new Uint8Array();
    message.driverMetadata = object.driverMetadata ?? new Uint8Array();
    return message;
  },
};

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

function bytesFromBase64(b64: string): Uint8Array {
  if (globalThis.Buffer) {
    return Uint8Array.from(globalThis.Buffer.from(b64, "base64"));
  } else {
    const bin = globalThis.atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; ++i) {
      arr[i] = bin.charCodeAt(i);
    }
    return arr;
  }
}

function base64FromBytes(arr: Uint8Array): string {
  if (globalThis.Buffer) {
    return globalThis.Buffer.from(arr).toString("base64");
  } else {
    const bin: string[] = [];
    arr.forEach((byte) => {
      bin.push(String.fromCharCode(byte));
    });
    return globalThis.btoa(bin.join(""));
  }
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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
