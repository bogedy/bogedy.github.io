/* tslint:disable */
/* eslint-disable */
/**
* @param {any} js_obj
*/
export function print_obj(js_obj: any): void;
/**
* @param {string} s
*/
export function log(s: string): void;
/**
* @param {CanvasRenderingContext2D} ctx
*/
export function test_draw(ctx: CanvasRenderingContext2D): void;
/**
*/
export class Board {
  free(): void;
}
/**
*/
export class Game {
  free(): void;
/**
* @param {CanvasRenderingContext2D} ctx
* @param {number} block_pixel_size
* @param {number} block_width
* @param {number} block_height
* @returns {Game}
*/
  static new(ctx: CanvasRenderingContext2D, block_pixel_size: number, block_width: number, block_height: number): Game;
/**
* @param {CanvasRenderingContext2D} ctx
* @param {string} key
*/
  step(ctx: CanvasRenderingContext2D, key: string): void;
/**
* @returns {boolean}
*/
  get_gameover(): boolean;
/**
*/
  board: Board;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly print_obj: (a: number) => void;
  readonly log: (a: number, b: number) => void;
  readonly test_draw: (a: number) => void;
  readonly __wbg_board_free: (a: number) => void;
  readonly __wbg_game_free: (a: number) => void;
  readonly __wbg_get_game_board: (a: number) => number;
  readonly __wbg_set_game_board: (a: number, b: number) => void;
  readonly game_new: (a: number, b: number, c: number, d: number) => number;
  readonly game_step: (a: number, b: number, c: number, d: number) => void;
  readonly game_get_gameover: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
