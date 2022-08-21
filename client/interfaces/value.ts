/* eslint-disable */
import * as Long from "long";
import * as _m0 from "protobufjs/minimal";

export const protobufPackage = "com.daml.ledger.api.v1";

/**
 * Encodes values that the ledger accepts as command arguments and emits as contract arguments.
 *
 * The values encoding use different classes of non-empty strings as identifiers. Those classes are
 * defined as follows:
 * - NameStrings are strings with length <= 1000 that match the regexp ``[A-Za-z\$_][A-Za-z0-9\$_]*``.
 * - PackageIdStrings are strings with length <= 64 that match the regexp ``[A-Za-z0-9\-_ ]+``.
 * - PartyIdStrings are strings with length <= 256 that match the regexp ``[A-Za-z0-9:\-_ ]+``.
 * - LedgerStrings are strings with length <= 256 that match the regexp ``[A-Za-z0-9#:\-_/ ]+``.
 * - ApplicationIdStrings are strings with length <= 256 that match the regexp ``[A-Za-z0-9#:\-_/ @\|]+``.
 */
export interface Value {
  record: Record | undefined;
  /**
   * Identifier of an on-ledger contract. Commands which reference an unknown or already archived contract ID will fail.
   * Must be a valid LedgerString.
   */
  contractId: string | undefined;
  int64: number | undefined;
  /**
   * A Numeric, that is a decimal value with precision 38 (at most 38 significant digits) and a
   * scale between 0 and 37 (significant digits on the right of the decimal point).
   * The field has to match the regex
   *   [+-]?\d{1,38}(.\d{0,37})?
   * and should be representable by a Numeric without loss of precision.
   */
  numeric: string | undefined;
  /** A string. */
  text: string | undefined;
  /**
   * Microseconds since the UNIX epoch. Can go backwards. Fixed
   * since the vast majority of values will be greater than
   * 2^28, since currently the number of microseconds since the
   * epoch is greater than that. Range: 0001-01-01T00:00:00Z to
   * 9999-12-31T23:59:59.999999Z, so that we can convert to/from
   * https://www.ietf.org/rfc/rfc3339.txt
   */
  timestamp: number | undefined;
  /**
   * An agent operating on the ledger.
   * Must be a valid PartyIdString.
   */
  party: string | undefined;
  /** True or false. */
  bool: boolean | undefined;
  /**
   * Days since the unix epoch. Can go backwards. Limited from
   * 0001-01-01 to 9999-12-31, also to be compatible with
   * https://www.ietf.org/rfc/rfc3339.txt
   */
  date: number | undefined;
}

/** Contains nested values. */
export interface Record {
  /**
   * Omitted from the transaction stream when verbose streaming is not enabled.
   * Optional when submitting commands.
   */
  recordId: Identifier | undefined;
  /**
   * The nested values of the record.
   * Required
   */
  fields: RecordField[];
}

/** A named nested value within a record. */
export interface RecordField {
  /**
   * When reading a transaction stream, it's omitted if verbose streaming is not enabled.
   * When submitting a commmand, it's optional:
   *   - if all keys within a single record are present, the order in which fields appear does not matter. however, each key must appear exactly once.
   *   - if any of the keys within a single record are omitted, the order of fields MUST match the order of declaration in the Daml template.
   * Must be a valid NameString
   */
  label: string;
  /**
   * A nested value of a record.
   * Required
   */
  value: Value | undefined;
}

/** Unique identifier of an entity. */
export interface Identifier {
  /**
   * The identifier of the Daml package that contains the entity.
   * Must be a valid PackageIdString.
   * Required
   */
  packageId: string;
  /**
   * The dot-separated module name of the identifier.
   * Required
   */
  moduleName: string;
  /**
   * The dot-separated name of the entity (e.g. record, template, ...) within the module.
   * Required
   */
  entityName: string;
}

/** A value with alternative representations. */
export interface Variant {
  /**
   * Omitted from the transaction stream when verbose streaming is not enabled.
   * Optional when submitting commands.
   */
  variantId: Identifier | undefined;
  /**
   * Determines which of the Variant's alternatives is encoded in this message.
   * Must be a valid NameString.
   * Required
   */
  constructor: string;
  /**
   * The value encoded within the Variant.
   * Required
   */
  value: Value | undefined;
}

/** A value with finite set of alternative representations. */
export interface Enum {
  /**
   * Omitted from the transaction stream when verbose streaming is not enabled.
   * Optional when submitting commands.
   */
  enumId: Identifier | undefined;
  /**
   * Determines which of the Variant's alternatives is encoded in this message.
   * Must be a valid NameString.
   * Required
   */
  constructor: string;
}

/** A homogenous collection of values. */
export interface List {
  /**
   * The elements must all be of the same concrete value type.
   * Optional
   */
  elements: Value[];
}

/**
 * Corresponds to Java's Optional type, Scala's Option, and Haskell's Maybe.
 * The reason why we need to wrap this in an additional ``message`` is that we
 * need to be able to encode the ``None`` case in the ``Value`` oneof.
 */
export interface Optional {
  /** optional */
  value: Value | undefined;
}

export interface Map {
  entries: Map_Entry[];
}

export interface Map_Entry {
  key: string;
  value: Value | undefined;
}

export interface GenMap {
  entries: GenMap_Entry[];
}

export interface GenMap_Entry {
  key: Value | undefined;
  value: Value | undefined;
}

function createBaseValue(): Value {
  return {
    record: undefined,
    contractId: undefined,
    int64: undefined,
    numeric: undefined,
    text: undefined,
    timestamp: undefined,
    party: undefined,
    bool: undefined,
    date: undefined,
  };
}

export const Value = {
  encode(message: Value, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.record !== undefined) {
      Record.encode(message.record, writer.uint32(10).fork()).ldelim();
    }
    if (message.contractId !== undefined) {
      writer.uint32(26).string(message.contractId);
    }
    if (message.int64 !== undefined) {
      writer.uint32(40).sint64(message.int64);
    }
    if (message.numeric !== undefined) {
      writer.uint32(50).string(message.numeric);
    }
    if (message.text !== undefined) {
      writer.uint32(66).string(message.text);
    }
    if (message.timestamp !== undefined) {
      writer.uint32(73).sfixed64(message.timestamp);
    }
    if (message.party !== undefined) {
      writer.uint32(90).string(message.party);
    }
    if (message.bool !== undefined) {
      writer.uint32(96).bool(message.bool);
    }
    if (message.date !== undefined) {
      writer.uint32(112).int32(message.date);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Value {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseValue();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.record = Record.decode(reader, reader.uint32());
          break;
        case 3:
          message.contractId = reader.string();
          break;
        case 5:
          message.int64 = longToNumber(reader.sint64() as Long);
          break;
        case 6:
          message.numeric = reader.string();
          break;
        case 8:
          message.text = reader.string();
          break;
        case 9:
          message.timestamp = longToNumber(reader.sfixed64() as Long);
          break;
        case 11:
          message.party = reader.string();
          break;
        case 12:
          message.bool = reader.bool();
          break;
        case 14:
          message.date = reader.int32();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Value {
    return {
      record: isSet(object.record) ? Record.fromJSON(object.record) : undefined,
      contractId: isSet(object.contractId)
        ? String(object.contractId)
        : undefined,
      int64: isSet(object.int64) ? Number(object.int64) : undefined,
      numeric: isSet(object.numeric) ? String(object.numeric) : undefined,
      text: isSet(object.text) ? String(object.text) : undefined,
      timestamp: isSet(object.timestamp) ? Number(object.timestamp) : undefined,
      party: isSet(object.party) ? String(object.party) : undefined,
      bool: isSet(object.bool) ? Boolean(object.bool) : undefined,
      date: isSet(object.date) ? Number(object.date) : undefined,
    };
  },

  toJSON(message: Value): unknown {
    const obj: any = {};
    message.record !== undefined &&
      (obj.record = message.record ? Record.toJSON(message.record) : undefined);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.int64 !== undefined && (obj.int64 = Math.round(message.int64));
    message.numeric !== undefined && (obj.numeric = message.numeric);
    message.text !== undefined && (obj.text = message.text);
    message.timestamp !== undefined &&
      (obj.timestamp = Math.round(message.timestamp));
    message.party !== undefined && (obj.party = message.party);
    message.bool !== undefined && (obj.bool = message.bool);
    message.date !== undefined && (obj.date = Math.round(message.date));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Value>, I>>(object: I): Value {
    const message = createBaseValue();
    message.record =
      object.record !== undefined && object.record !== null
        ? Record.fromPartial(object.record)
        : undefined;
    message.contractId = object.contractId ?? undefined;
    message.int64 = object.int64 ?? undefined;
    message.numeric = object.numeric ?? undefined;
    message.text = object.text ?? undefined;
    message.timestamp = object.timestamp ?? undefined;
    message.party = object.party ?? undefined;
    message.bool = object.bool ?? undefined;
    message.date = object.date ?? undefined;
    return message;
  },
};

function createBaseRecord(): Record {
  return { recordId: undefined, fields: [] };
}

export const Record = {
  encode(
    message: Record,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.recordId !== undefined) {
      Identifier.encode(message.recordId, writer.uint32(10).fork()).ldelim();
    }
    for (const v of message.fields) {
      RecordField.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Record {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.recordId = Identifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.fields.push(RecordField.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Record {
    return {
      recordId: isSet(object.recordId)
        ? Identifier.fromJSON(object.recordId)
        : undefined,
      fields: Array.isArray(object?.fields)
        ? object.fields.map((e: any) => RecordField.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Record): unknown {
    const obj: any = {};
    message.recordId !== undefined &&
      (obj.recordId = message.recordId
        ? Identifier.toJSON(message.recordId)
        : undefined);
    if (message.fields) {
      obj.fields = message.fields.map((e) =>
        e ? RecordField.toJSON(e) : undefined
      );
    } else {
      obj.fields = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Record>, I>>(object: I): Record {
    const message = createBaseRecord();
    message.recordId =
      object.recordId !== undefined && object.recordId !== null
        ? Identifier.fromPartial(object.recordId)
        : undefined;
    message.fields =
      object.fields?.map((e) => RecordField.fromPartial(e)) || [];
    return message;
  },
};

function createBaseRecordField(): RecordField {
  return { label: "", value: undefined };
}

export const RecordField = {
  encode(
    message: RecordField,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.label !== "") {
      writer.uint32(10).string(message.label);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): RecordField {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRecordField();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.label = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): RecordField {
    return {
      label: isSet(object.label) ? String(object.label) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: RecordField): unknown {
    const obj: any = {};
    message.label !== undefined && (obj.label = message.label);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<RecordField>, I>>(
    object: I
  ): RecordField {
    const message = createBaseRecordField();
    message.label = object.label ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Value.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseIdentifier(): Identifier {
  return { packageId: "", moduleName: "", entityName: "" };
}

export const Identifier = {
  encode(
    message: Identifier,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.packageId !== "") {
      writer.uint32(10).string(message.packageId);
    }
    if (message.moduleName !== "") {
      writer.uint32(26).string(message.moduleName);
    }
    if (message.entityName !== "") {
      writer.uint32(34).string(message.entityName);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Identifier {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIdentifier();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.packageId = reader.string();
          break;
        case 3:
          message.moduleName = reader.string();
          break;
        case 4:
          message.entityName = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Identifier {
    return {
      packageId: isSet(object.packageId) ? String(object.packageId) : "",
      moduleName: isSet(object.moduleName) ? String(object.moduleName) : "",
      entityName: isSet(object.entityName) ? String(object.entityName) : "",
    };
  },

  toJSON(message: Identifier): unknown {
    const obj: any = {};
    message.packageId !== undefined && (obj.packageId = message.packageId);
    message.moduleName !== undefined && (obj.moduleName = message.moduleName);
    message.entityName !== undefined && (obj.entityName = message.entityName);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Identifier>, I>>(
    object: I
  ): Identifier {
    const message = createBaseIdentifier();
    message.packageId = object.packageId ?? "";
    message.moduleName = object.moduleName ?? "";
    message.entityName = object.entityName ?? "";
    return message;
  },
};

function createBaseVariant(): Variant {
  return { variantId: undefined, constructor: "", value: undefined };
}

export const Variant = {
  encode(
    message: Variant,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.variantId !== undefined) {
      Identifier.encode(message.variantId, writer.uint32(10).fork()).ldelim();
    }
    if (message.constructor !== "") {
      writer.uint32(18).string(message.constructor);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Variant {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVariant();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.variantId = Identifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.constructor = reader.string();
          break;
        case 3:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Variant {
    return {
      variantId: isSet(object.variantId)
        ? Identifier.fromJSON(object.variantId)
        : undefined,
      constructor: isSet(object.constructor) ? String(object.constructor) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Variant): unknown {
    const obj: any = {};
    message.variantId !== undefined &&
      (obj.variantId = message.variantId
        ? Identifier.toJSON(message.variantId)
        : undefined);
    message.constructor !== undefined &&
      (obj.constructor = message.constructor);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Variant>, I>>(object: I): Variant {
    const message = createBaseVariant();
    message.variantId =
      object.variantId !== undefined && object.variantId !== null
        ? Identifier.fromPartial(object.variantId)
        : undefined;
    message.constructor = object.constructor ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Value.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseEnum(): Enum {
  return { enumId: undefined, constructor: "" };
}

export const Enum = {
  encode(message: Enum, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.enumId !== undefined) {
      Identifier.encode(message.enumId, writer.uint32(10).fork()).ldelim();
    }
    if (message.constructor !== "") {
      writer.uint32(18).string(message.constructor);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Enum {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEnum();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.enumId = Identifier.decode(reader, reader.uint32());
          break;
        case 2:
          message.constructor = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Enum {
    return {
      enumId: isSet(object.enumId)
        ? Identifier.fromJSON(object.enumId)
        : undefined,
      constructor: isSet(object.constructor) ? String(object.constructor) : "",
    };
  },

  toJSON(message: Enum): unknown {
    const obj: any = {};
    message.enumId !== undefined &&
      (obj.enumId = message.enumId
        ? Identifier.toJSON(message.enumId)
        : undefined);
    message.constructor !== undefined &&
      (obj.constructor = message.constructor);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Enum>, I>>(object: I): Enum {
    const message = createBaseEnum();
    message.enumId =
      object.enumId !== undefined && object.enumId !== null
        ? Identifier.fromPartial(object.enumId)
        : undefined;
    message.constructor = object.constructor ?? "";
    return message;
  },
};

function createBaseList(): List {
  return { elements: [] };
}

export const List = {
  encode(message: List, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.elements) {
      Value.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): List {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseList();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.elements.push(Value.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): List {
    return {
      elements: Array.isArray(object?.elements)
        ? object.elements.map((e: any) => Value.fromJSON(e))
        : [],
    };
  },

  toJSON(message: List): unknown {
    const obj: any = {};
    if (message.elements) {
      obj.elements = message.elements.map((e) =>
        e ? Value.toJSON(e) : undefined
      );
    } else {
      obj.elements = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<List>, I>>(object: I): List {
    const message = createBaseList();
    message.elements = object.elements?.map((e) => Value.fromPartial(e)) || [];
    return message;
  },
};

function createBaseOptional(): Optional {
  return { value: undefined };
}

export const Optional = {
  encode(
    message: Optional,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Optional {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOptional();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Optional {
    return {
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Optional): unknown {
    const obj: any = {};
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Optional>, I>>(object: I): Optional {
    const message = createBaseOptional();
    message.value =
      object.value !== undefined && object.value !== null
        ? Value.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseMap(): Map {
  return { entries: [] };
}

export const Map = {
  encode(message: Map, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    for (const v of message.entries) {
      Map_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Map {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entries.push(Map_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Map {
    return {
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => Map_Entry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: Map): unknown {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map((e) =>
        e ? Map_Entry.toJSON(e) : undefined
      );
    } else {
      obj.entries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Map>, I>>(object: I): Map {
    const message = createBaseMap();
    message.entries =
      object.entries?.map((e) => Map_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseMap_Entry(): Map_Entry {
  return { key: "", value: undefined };
}

export const Map_Entry = {
  encode(
    message: Map_Entry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Map_Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMap_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = reader.string();
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Map_Entry {
    return {
      key: isSet(object.key) ? String(object.key) : "",
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: Map_Entry): unknown {
    const obj: any = {};
    message.key !== undefined && (obj.key = message.key);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Map_Entry>, I>>(
    object: I
  ): Map_Entry {
    const message = createBaseMap_Entry();
    message.key = object.key ?? "";
    message.value =
      object.value !== undefined && object.value !== null
        ? Value.fromPartial(object.value)
        : undefined;
    return message;
  },
};

function createBaseGenMap(): GenMap {
  return { entries: [] };
}

export const GenMap = {
  encode(
    message: GenMap,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    for (const v of message.entries) {
      GenMap_Entry.encode(v!, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenMap {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenMap();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.entries.push(GenMap_Entry.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenMap {
    return {
      entries: Array.isArray(object?.entries)
        ? object.entries.map((e: any) => GenMap_Entry.fromJSON(e))
        : [],
    };
  },

  toJSON(message: GenMap): unknown {
    const obj: any = {};
    if (message.entries) {
      obj.entries = message.entries.map((e) =>
        e ? GenMap_Entry.toJSON(e) : undefined
      );
    } else {
      obj.entries = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenMap>, I>>(object: I): GenMap {
    const message = createBaseGenMap();
    message.entries =
      object.entries?.map((e) => GenMap_Entry.fromPartial(e)) || [];
    return message;
  },
};

function createBaseGenMap_Entry(): GenMap_Entry {
  return { key: undefined, value: undefined };
}

export const GenMap_Entry = {
  encode(
    message: GenMap_Entry,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.key !== undefined) {
      Value.encode(message.key, writer.uint32(10).fork()).ldelim();
    }
    if (message.value !== undefined) {
      Value.encode(message.value, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): GenMap_Entry {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGenMap_Entry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.key = Value.decode(reader, reader.uint32());
          break;
        case 2:
          message.value = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): GenMap_Entry {
    return {
      key: isSet(object.key) ? Value.fromJSON(object.key) : undefined,
      value: isSet(object.value) ? Value.fromJSON(object.value) : undefined,
    };
  },

  toJSON(message: GenMap_Entry): unknown {
    const obj: any = {};
    message.key !== undefined &&
      (obj.key = message.key ? Value.toJSON(message.key) : undefined);
    message.value !== undefined &&
      (obj.value = message.value ? Value.toJSON(message.value) : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<GenMap_Entry>, I>>(
    object: I
  ): GenMap_Entry {
    const message = createBaseGenMap_Entry();
    message.key =
      object.key !== undefined && object.key !== null
        ? Value.fromPartial(object.key)
        : undefined;
    message.value =
      object.value !== undefined && object.value !== null
        ? Value.fromPartial(object.value)
        : undefined;
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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

// If you get a compile-error about 'Constructor<Long> and ... have no overlap',
// add '--ts_proto_opt=esModuleInterop=true' as a flag when calling 'protoc'.
if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
