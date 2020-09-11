import { CInstructionValue } from './types';
export declare const isAInstruction: any;
export declare const isSymbol: boolean;
export declare const convertAInstructionToBinary: (aInstruction: string) => string;
export declare const parseCInstruction: (value: string) => CInstructionValue;
export declare const convertCInstructionToBinary: (value: CInstructionValue) => string;
