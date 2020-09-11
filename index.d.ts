/// <reference types="node" />
import * as fs from 'fs';
import { Observable } from 'rxjs';
export declare const readFile$: (arg1: string | number | Buffer | import("url").URL) => Observable<Buffer>;
export declare const writeFile$: (arg1: string | number | Buffer | import("url").URL, arg2: string | DataView | Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array) => Observable<void>;
export declare const accessFile$: (arg1: fs.PathLike) => Observable<void>;
