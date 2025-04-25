import { List, cons, nil } from "./list";

// Tests for these functions belong in funcs_test.ts
// These functions have empty comments /** */ to make the linter happy

/** */
export const a = (s: bigint, o: boolean): List => {
  if (o) {
    return cons(s, cons(-s, nil));
  } else {
    return cons(-s, cons(s, nil));
  }
};

/** */
export const b = (t: [bigint, bigint], o: boolean): [bigint, bigint] => {
  const [i, j]: [bigint, bigint] = t;
  if (o) {
    return [i + 1n, j];
  } else {
    return [j - 1n, i];
  }
};

/**
 * s and t allow only non-negative integers
 */
export const c = (r: {s: [bigint, bigint], t: bigint}): bigint => {
  const [i, j]: [bigint, bigint] = r.s;
  if (r.t === 0n) {
    return i;
  } else if (r.t === 1n) {
    return i * 2n;
  } else {
    return j + c({s: r.s, t: r.t - 1n});
  }
};

// Color type defined for the below functions
// WARNING: don't mix this up with the separate Color type defined for Pipes
type Color = "purple" | "pink" | "green";

/** */
export const d = (color: Color, num: bigint): bigint => {
  switch (color) {
    case "purple": return num;
    case "pink": return -num;
    case "green": return num * num;
  }
};

/** */
export const e = (color1: Color, color2: Color): bigint => {
  const x = d(color1, 3n);
  return d(color2, x);
};

/** */
export const f = (color?: Color): bigint => {
  switch (color) {
    case "purple": return 6n;
    case "pink": return 4n;
    case "green": return 5n;
    default: return 0n;
  }
};

/** */
export const g = (num: bigint): bigint => {
  if (num <= 0n) {
    return 0n;
  } else {
    return g(num - 2n) + 2n * num - 2n;
  }
};

/** */
export const h = (arr: bigint[]): bigint => {
  if (arr.length === 0) {
    return 1n;
  } else {
    // Recall that slice() returns a sub-array
    return arr[0] * h(arr.slice(1));
  }
};

/**
 * Num must be non-negative
*/
export const i = (num: bigint): bigint => {
  if (num === 0n) {
    return 0n;
  } else if (num % 3n === 0n) { // n > 0 is a multiple of 3
    return i(num - 3n) + 2n;
  } else if (num % 3n === 1n) { // n - 1 is a multiple of 3
    return i(num - 1n);
  } else { // n - 2 is a multiple of 3
    return i(num - 2n);
  }
}