/* eslint-disable */
import { Identifier, Value, Record } from "./value";
import { ContractMetadata } from "./contract_metadata";
import * as _m0 from "protobufjs/minimal";
import { StringValue } from "./google/protobuf/wrappers";

export const protobufPackage = "com.daml.ledger.api.v1";

/**
 * An event in the flat transaction stream can either be the creation
 * or the archiving of a contract.
 *
 * In the transaction service the events are restricted to the events
 * visible for the parties specified in the transaction filter. Each
 * event message type below contains a ``witness_parties`` field which
 * indicates the subset of the requested parties that can see the event
 * in question. In the flat transaction stream you'll only receive events
 * that have witnesses.
 */
export interface Event {
  created: CreatedEvent | undefined;
  archived: ArchivedEvent | undefined;
}

/** Records that a contract has been created, and choices may now be exercised on it. */
export interface CreatedEvent {
  /**
   * The ID of this particular event.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  eventId: string;
  /**
   * The ID of the created contract.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  contractId: string;
  /**
   * The template of the created contract.
   * Required
   */
  templateId: Identifier | undefined;
  /**
   * The key of the created contract, if defined.
   * Optional
   */
  contractKey: Value | undefined;
  /**
   * The arguments that have been used to create the contract.
   * Required
   */
  createArguments: Record | undefined;
  /**
   * The parties that are notified of this event. When a ``CreatedEvent``
   * is returned as part of a transaction tree, this will include all
   * the parties specified in the ``TransactionFilter`` that are informees
   * of the event. If served as part of a flat transaction those will
   * be limited to all parties specified in the ``TransactionFilter`` that
   * are stakeholders of the contract (i.e. either signatories or observers).
   * Required
   */
  witnessParties: string[];
  /**
   * The signatories for this contract as specified by the template.
   * Required
   */
  signatories: string[];
  /**
   * The observers for this contract as specified explicitly by the template or implicitly as choice controllers.
   * This field never contains parties that are signatories.
   * Required
   */
  observers: string[];
  /**
   * The agreement text of the contract.
   * We use StringValue to properly reflect optionality on the wire for backwards compatibility.
   * This is necessary since the empty string is an acceptable (and in fact the default) agreement
   * text, but also the default string in protobuf.
   * This means a newer client works with an older sandbox seamlessly.
   * Optional
   */
  agreementText: string | undefined;
  /**
   * Metadata of the contract. Required for contracts created
   * after the introduction of explicit disclosure. If explicit disclosure is disabled,
   * this field will be empty.
   */
  metadata: ContractMetadata | undefined;
}

/** Records that a contract has been archived, and choices may no longer be exercised on it. */
export interface ArchivedEvent {
  /**
   * The ID of this particular event.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  eventId: string;
  /**
   * The ID of the archived contract.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  contractId: string;
  /**
   * The template of the archived contract.
   * Required
   */
  templateId: Identifier | undefined;
  /**
   * The parties that are notified of this event. For ``ArchivedEvent``s,
   * these are the intersection of the stakeholders of the contract in
   * question and the parties specified in the ``TransactionFilter``. The
   * stakeholders are the union of the signatories and the observers of
   * the contract.
   * Each one of its elements must be a valid PartyIdString (as described
   * in ``value.proto``).
   * Required
   */
  witnessParties: string[];
}

/** Records that a choice has been exercised on a target contract. */
export interface ExercisedEvent {
  /**
   * The ID of this particular event.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  eventId: string;
  /**
   * The ID of the target contract.
   * Must be a valid LedgerString (as described in ``value.proto``).
   * Required
   */
  contractId: string;
  /**
   * The template of the target contract.
   * Required
   */
  templateId: Identifier | undefined;
  /**
   * The interface where the choice is defined if inherited
   * Optional
   */
  interfaceId: Identifier | undefined;
  /**
   * The choice that's been exercised on the target contract.
   * Must be a valid NameString (as described in ``value.proto``).
   * Required
   */
  choice: string;
  /**
   * The argument the choice was made with.
   * Required
   */
  choiceArgument: Value | undefined;
  /**
   * The parties that made the choice.
   * Each element must be a valid PartyIdString (as described in ``value.proto``).
   * Required
   */
  actingParties: string[];
  /**
   * If true, the target contract may no longer be exercised.
   * Required
   */
  consuming: boolean;
  /**
   * The parties that are notified of this event. The witnesses of an exercise
   * node will depend on whether the exercise was consuming or not.
   * If consuming, the witnesses are the union of the stakeholders and
   * the actors.
   * If not consuming, the witnesses are the union of the signatories and
   * the actors. Note that the actors might not necessarily be observers
   * and thus signatories. This is the case when the controllers of a
   * choice are specified using "flexible controllers", using the
   * ``choice ... controller`` syntax, and said controllers are not
   * explicitly marked as observers.
   * Each element must be a valid PartyIdString (as described in ``value.proto``).
   * Required
   */
  witnessParties: string[];
  /**
   * References to further events in the same transaction that appeared as a result of this ``ExercisedEvent``.
   * It contains only the immediate children of this event, not all members of the subtree rooted at this node.
   * The order of the children is the same as the event order in the transaction.
   * Each element must be a valid LedgerString (as described in ``value.proto``).
   * Optional
   */
  childEventIds: string[];
  /**
   * The result of exercising the choice
   * Required
   */
  exerciseResult: Value | undefined;
}

function createBaseEvent(): Event {
  return { created: undefined, archived: undefined };
}

export const Event = {
  encode(message: Event, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.created !== undefined) {
      CreatedEvent.encode(message.created, writer.uint32(10).fork()).ldelim();
    }
    if (message.archived !== undefined) {
      ArchivedEvent.encode(message.archived, writer.uint32(26).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Event {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.created = CreatedEvent.decode(reader, reader.uint32());
          break;
        case 3:
          message.archived = ArchivedEvent.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): Event {
    return {
      created: isSet(object.created)
        ? CreatedEvent.fromJSON(object.created)
        : undefined,
      archived: isSet(object.archived)
        ? ArchivedEvent.fromJSON(object.archived)
        : undefined,
    };
  },

  toJSON(message: Event): unknown {
    const obj: any = {};
    message.created !== undefined &&
      (obj.created = message.created
        ? CreatedEvent.toJSON(message.created)
        : undefined);
    message.archived !== undefined &&
      (obj.archived = message.archived
        ? ArchivedEvent.toJSON(message.archived)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<Event>, I>>(object: I): Event {
    const message = createBaseEvent();
    message.created =
      object.created !== undefined && object.created !== null
        ? CreatedEvent.fromPartial(object.created)
        : undefined;
    message.archived =
      object.archived !== undefined && object.archived !== null
        ? ArchivedEvent.fromPartial(object.archived)
        : undefined;
    return message;
  },
};

function createBaseCreatedEvent(): CreatedEvent {
  return {
    eventId: "",
    contractId: "",
    templateId: undefined,
    contractKey: undefined,
    createArguments: undefined,
    witnessParties: [],
    signatories: [],
    observers: [],
    agreementText: undefined,
    metadata: undefined,
  };
}

export const CreatedEvent = {
  encode(
    message: CreatedEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.eventId !== "") {
      writer.uint32(10).string(message.eventId);
    }
    if (message.contractId !== "") {
      writer.uint32(18).string(message.contractId);
    }
    if (message.templateId !== undefined) {
      Identifier.encode(message.templateId, writer.uint32(26).fork()).ldelim();
    }
    if (message.contractKey !== undefined) {
      Value.encode(message.contractKey, writer.uint32(58).fork()).ldelim();
    }
    if (message.createArguments !== undefined) {
      Record.encode(message.createArguments, writer.uint32(34).fork()).ldelim();
    }
    for (const v of message.witnessParties) {
      writer.uint32(42).string(v!);
    }
    for (const v of message.signatories) {
      writer.uint32(66).string(v!);
    }
    for (const v of message.observers) {
      writer.uint32(74).string(v!);
    }
    if (message.agreementText !== undefined) {
      StringValue.encode(
        { value: message.agreementText! },
        writer.uint32(50).fork()
      ).ldelim();
    }
    if (message.metadata !== undefined) {
      ContractMetadata.encode(
        message.metadata,
        writer.uint32(82).fork()
      ).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): CreatedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreatedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.string();
          break;
        case 2:
          message.contractId = reader.string();
          break;
        case 3:
          message.templateId = Identifier.decode(reader, reader.uint32());
          break;
        case 7:
          message.contractKey = Value.decode(reader, reader.uint32());
          break;
        case 4:
          message.createArguments = Record.decode(reader, reader.uint32());
          break;
        case 5:
          message.witnessParties.push(reader.string());
          break;
        case 8:
          message.signatories.push(reader.string());
          break;
        case 9:
          message.observers.push(reader.string());
          break;
        case 6:
          message.agreementText = StringValue.decode(
            reader,
            reader.uint32()
          ).value;
          break;
        case 10:
          message.metadata = ContractMetadata.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): CreatedEvent {
    return {
      eventId: isSet(object.eventId) ? String(object.eventId) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      templateId: isSet(object.templateId)
        ? Identifier.fromJSON(object.templateId)
        : undefined,
      contractKey: isSet(object.contractKey)
        ? Value.fromJSON(object.contractKey)
        : undefined,
      createArguments: isSet(object.createArguments)
        ? Record.fromJSON(object.createArguments)
        : undefined,
      witnessParties: Array.isArray(object?.witnessParties)
        ? object.witnessParties.map((e: any) => String(e))
        : [],
      signatories: Array.isArray(object?.signatories)
        ? object.signatories.map((e: any) => String(e))
        : [],
      observers: Array.isArray(object?.observers)
        ? object.observers.map((e: any) => String(e))
        : [],
      agreementText: isSet(object.agreementText)
        ? String(object.agreementText)
        : undefined,
      metadata: isSet(object.metadata)
        ? ContractMetadata.fromJSON(object.metadata)
        : undefined,
    };
  },

  toJSON(message: CreatedEvent): unknown {
    const obj: any = {};
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.templateId !== undefined &&
      (obj.templateId = message.templateId
        ? Identifier.toJSON(message.templateId)
        : undefined);
    message.contractKey !== undefined &&
      (obj.contractKey = message.contractKey
        ? Value.toJSON(message.contractKey)
        : undefined);
    message.createArguments !== undefined &&
      (obj.createArguments = message.createArguments
        ? Record.toJSON(message.createArguments)
        : undefined);
    if (message.witnessParties) {
      obj.witnessParties = message.witnessParties.map((e) => e);
    } else {
      obj.witnessParties = [];
    }
    if (message.signatories) {
      obj.signatories = message.signatories.map((e) => e);
    } else {
      obj.signatories = [];
    }
    if (message.observers) {
      obj.observers = message.observers.map((e) => e);
    } else {
      obj.observers = [];
    }
    message.agreementText !== undefined &&
      (obj.agreementText = message.agreementText);
    message.metadata !== undefined &&
      (obj.metadata = message.metadata
        ? ContractMetadata.toJSON(message.metadata)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<CreatedEvent>, I>>(
    object: I
  ): CreatedEvent {
    const message = createBaseCreatedEvent();
    message.eventId = object.eventId ?? "";
    message.contractId = object.contractId ?? "";
    message.templateId =
      object.templateId !== undefined && object.templateId !== null
        ? Identifier.fromPartial(object.templateId)
        : undefined;
    message.contractKey =
      object.contractKey !== undefined && object.contractKey !== null
        ? Value.fromPartial(object.contractKey)
        : undefined;
    message.createArguments =
      object.createArguments !== undefined && object.createArguments !== null
        ? Record.fromPartial(object.createArguments)
        : undefined;
    message.witnessParties = object.witnessParties?.map((e) => e) || [];
    message.signatories = object.signatories?.map((e) => e) || [];
    message.observers = object.observers?.map((e) => e) || [];
    message.agreementText = object.agreementText ?? undefined;
    message.metadata =
      object.metadata !== undefined && object.metadata !== null
        ? ContractMetadata.fromPartial(object.metadata)
        : undefined;
    return message;
  },
};

function createBaseArchivedEvent(): ArchivedEvent {
  return {
    eventId: "",
    contractId: "",
    templateId: undefined,
    witnessParties: [],
  };
}

export const ArchivedEvent = {
  encode(
    message: ArchivedEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.eventId !== "") {
      writer.uint32(10).string(message.eventId);
    }
    if (message.contractId !== "") {
      writer.uint32(18).string(message.contractId);
    }
    if (message.templateId !== undefined) {
      Identifier.encode(message.templateId, writer.uint32(26).fork()).ldelim();
    }
    for (const v of message.witnessParties) {
      writer.uint32(34).string(v!);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ArchivedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseArchivedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.string();
          break;
        case 2:
          message.contractId = reader.string();
          break;
        case 3:
          message.templateId = Identifier.decode(reader, reader.uint32());
          break;
        case 4:
          message.witnessParties.push(reader.string());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ArchivedEvent {
    return {
      eventId: isSet(object.eventId) ? String(object.eventId) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      templateId: isSet(object.templateId)
        ? Identifier.fromJSON(object.templateId)
        : undefined,
      witnessParties: Array.isArray(object?.witnessParties)
        ? object.witnessParties.map((e: any) => String(e))
        : [],
    };
  },

  toJSON(message: ArchivedEvent): unknown {
    const obj: any = {};
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.templateId !== undefined &&
      (obj.templateId = message.templateId
        ? Identifier.toJSON(message.templateId)
        : undefined);
    if (message.witnessParties) {
      obj.witnessParties = message.witnessParties.map((e) => e);
    } else {
      obj.witnessParties = [];
    }
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ArchivedEvent>, I>>(
    object: I
  ): ArchivedEvent {
    const message = createBaseArchivedEvent();
    message.eventId = object.eventId ?? "";
    message.contractId = object.contractId ?? "";
    message.templateId =
      object.templateId !== undefined && object.templateId !== null
        ? Identifier.fromPartial(object.templateId)
        : undefined;
    message.witnessParties = object.witnessParties?.map((e) => e) || [];
    return message;
  },
};

function createBaseExercisedEvent(): ExercisedEvent {
  return {
    eventId: "",
    contractId: "",
    templateId: undefined,
    interfaceId: undefined,
    choice: "",
    choiceArgument: undefined,
    actingParties: [],
    consuming: false,
    witnessParties: [],
    childEventIds: [],
    exerciseResult: undefined,
  };
}

export const ExercisedEvent = {
  encode(
    message: ExercisedEvent,
    writer: _m0.Writer = _m0.Writer.create()
  ): _m0.Writer {
    if (message.eventId !== "") {
      writer.uint32(10).string(message.eventId);
    }
    if (message.contractId !== "") {
      writer.uint32(18).string(message.contractId);
    }
    if (message.templateId !== undefined) {
      Identifier.encode(message.templateId, writer.uint32(26).fork()).ldelim();
    }
    if (message.interfaceId !== undefined) {
      Identifier.encode(
        message.interfaceId,
        writer.uint32(106).fork()
      ).ldelim();
    }
    if (message.choice !== "") {
      writer.uint32(42).string(message.choice);
    }
    if (message.choiceArgument !== undefined) {
      Value.encode(message.choiceArgument, writer.uint32(50).fork()).ldelim();
    }
    for (const v of message.actingParties) {
      writer.uint32(58).string(v!);
    }
    if (message.consuming === true) {
      writer.uint32(64).bool(message.consuming);
    }
    for (const v of message.witnessParties) {
      writer.uint32(82).string(v!);
    }
    for (const v of message.childEventIds) {
      writer.uint32(90).string(v!);
    }
    if (message.exerciseResult !== undefined) {
      Value.encode(message.exerciseResult, writer.uint32(98).fork()).ldelim();
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): ExercisedEvent {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseExercisedEvent();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.eventId = reader.string();
          break;
        case 2:
          message.contractId = reader.string();
          break;
        case 3:
          message.templateId = Identifier.decode(reader, reader.uint32());
          break;
        case 13:
          message.interfaceId = Identifier.decode(reader, reader.uint32());
          break;
        case 5:
          message.choice = reader.string();
          break;
        case 6:
          message.choiceArgument = Value.decode(reader, reader.uint32());
          break;
        case 7:
          message.actingParties.push(reader.string());
          break;
        case 8:
          message.consuming = reader.bool();
          break;
        case 10:
          message.witnessParties.push(reader.string());
          break;
        case 11:
          message.childEventIds.push(reader.string());
          break;
        case 12:
          message.exerciseResult = Value.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ExercisedEvent {
    return {
      eventId: isSet(object.eventId) ? String(object.eventId) : "",
      contractId: isSet(object.contractId) ? String(object.contractId) : "",
      templateId: isSet(object.templateId)
        ? Identifier.fromJSON(object.templateId)
        : undefined,
      interfaceId: isSet(object.interfaceId)
        ? Identifier.fromJSON(object.interfaceId)
        : undefined,
      choice: isSet(object.choice) ? String(object.choice) : "",
      choiceArgument: isSet(object.choiceArgument)
        ? Value.fromJSON(object.choiceArgument)
        : undefined,
      actingParties: Array.isArray(object?.actingParties)
        ? object.actingParties.map((e: any) => String(e))
        : [],
      consuming: isSet(object.consuming) ? Boolean(object.consuming) : false,
      witnessParties: Array.isArray(object?.witnessParties)
        ? object.witnessParties.map((e: any) => String(e))
        : [],
      childEventIds: Array.isArray(object?.childEventIds)
        ? object.childEventIds.map((e: any) => String(e))
        : [],
      exerciseResult: isSet(object.exerciseResult)
        ? Value.fromJSON(object.exerciseResult)
        : undefined,
    };
  },

  toJSON(message: ExercisedEvent): unknown {
    const obj: any = {};
    message.eventId !== undefined && (obj.eventId = message.eventId);
    message.contractId !== undefined && (obj.contractId = message.contractId);
    message.templateId !== undefined &&
      (obj.templateId = message.templateId
        ? Identifier.toJSON(message.templateId)
        : undefined);
    message.interfaceId !== undefined &&
      (obj.interfaceId = message.interfaceId
        ? Identifier.toJSON(message.interfaceId)
        : undefined);
    message.choice !== undefined && (obj.choice = message.choice);
    message.choiceArgument !== undefined &&
      (obj.choiceArgument = message.choiceArgument
        ? Value.toJSON(message.choiceArgument)
        : undefined);
    if (message.actingParties) {
      obj.actingParties = message.actingParties.map((e) => e);
    } else {
      obj.actingParties = [];
    }
    message.consuming !== undefined && (obj.consuming = message.consuming);
    if (message.witnessParties) {
      obj.witnessParties = message.witnessParties.map((e) => e);
    } else {
      obj.witnessParties = [];
    }
    if (message.childEventIds) {
      obj.childEventIds = message.childEventIds.map((e) => e);
    } else {
      obj.childEventIds = [];
    }
    message.exerciseResult !== undefined &&
      (obj.exerciseResult = message.exerciseResult
        ? Value.toJSON(message.exerciseResult)
        : undefined);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<ExercisedEvent>, I>>(
    object: I
  ): ExercisedEvent {
    const message = createBaseExercisedEvent();
    message.eventId = object.eventId ?? "";
    message.contractId = object.contractId ?? "";
    message.templateId =
      object.templateId !== undefined && object.templateId !== null
        ? Identifier.fromPartial(object.templateId)
        : undefined;
    message.interfaceId =
      object.interfaceId !== undefined && object.interfaceId !== null
        ? Identifier.fromPartial(object.interfaceId)
        : undefined;
    message.choice = object.choice ?? "";
    message.choiceArgument =
      object.choiceArgument !== undefined && object.choiceArgument !== null
        ? Value.fromPartial(object.choiceArgument)
        : undefined;
    message.actingParties = object.actingParties?.map((e) => e) || [];
    message.consuming = object.consuming ?? false;
    message.witnessParties = object.witnessParties?.map((e) => e) || [];
    message.childEventIds = object.childEventIds?.map((e) => e) || [];
    message.exerciseResult =
      object.exerciseResult !== undefined && object.exerciseResult !== null
        ? Value.fromPartial(object.exerciseResult)
        : undefined;
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
