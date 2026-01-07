import  type { PublicKey } from '@solana/web3.js';
import type {  DlnDstType, DlnSrcType } from "@debridge-test/dln-idl";
import type { BorshCoder, Idl, Event, DecodeType, workspace } from '@coral-xyz/anchor';
import { TypeDef } from '@coral-xyz/anchor/dist/cjs/program/namespace/types.js';

export enum DLN_PROGRAM {
  src = "src",
  dst = "dst",
}

export type DLN_TYPE_MAP = {
  [DLN_PROGRAM.dst]: DlnDstType;
  [DLN_PROGRAM.src]: DlnSrcType;
}

export interface ProgramData<P extends DLN_PROGRAM> {
  programId: string;
  programPubkey: PublicKey;
  idl: Idl;
  coder: BorshCoder;
  insructionsToIndex: DLN_TYPE_MAP[P]["instructions"][number]["name"][]
}

export type ProgramDataDic = {
 [A in DLN_PROGRAM]: ProgramData<A>
}

export type DlnEvent<P extends DLN_PROGRAM> = DLN_TYPE_MAP[P]["events"][number];

// TODO: make this more dynamic
type Offer = TypeDef<FindIdlTypeByName<DlnSrcType["types"], "Offer">,  Record<string, undefined>>;
type Order = TypeDef<FindIdlTypeByName<DlnSrcType["types"], "Order">, { Offer: Offer }>;
export type DlnDefined = {
  Order: Order,
  Offer: Offer,
};

export type LogType<P extends DLN_PROGRAM> = Event<DlnEvent<P>, DlnDefined>

export type TxParsedLogs = Partial<{
  [P in DLN_PROGRAM]: LogType<P>[]
}>;

type IdlTypes = Exclude<Idl["types"], undefined>;
type FindIdlTypeByName<T extends IdlTypes, N extends T[number]["name"]> =  T extends readonly [infer U, ...infer Rest] ? U extends IdlTypes[number] ? U["name"] extends N ? U : Rest extends IdlTypes ? FindIdlTypeByName<Rest, N> : never : never : never
