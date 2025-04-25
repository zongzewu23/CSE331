/** Represents a block with a straight path. */
export type STRAIGHT = "STRAIGHT";
/** Constant for easy access */
export const STRAIGHT: "STRAIGHT" = "STRAIGHT";

/** Represents a block with an angled path. */
export type ANGLED = "ANGLED";
/** Constant for easy access */
export const ANGLED: "ANGLED" = "ANGLED";

/** Represents the color of the block */
export type Color = "DIRT" | "WALL";

/** Represents the color dirt. */
export const DIRT: "DIRT" = "DIRT";

/** Represents the color wall. */
export const WALL: "WALL" = "WALL";

/** Represents the corner where the block's path is */
export type Corner = "TR" | "TL" | "BR" | "BL";

/** Represents the line direction of the block */
export type Line = "TB" | "LR";

/** Angled block oriented toward the TR direction. */
export const TR: "TR" = "TR";

/** Angled block oriented toward the TL direction. */
export const TL: "TL" = "TL";

/** Angled block oriented toward the BR direction. */
export const BR: "BR" = "BR";

/** Angled block oriented toward the BL direction. */
export const BL: "BL" = "BL";

/** Straight block oriented top to bottom */
export const TB: "TB" = "TB";

/** Straight block oriented right to left */
export const LR: "LR" = "LR";


export type Block =
  {readonly form: STRAIGHT, readonly color: Color, readonly direction: Line}
  | {readonly form: ANGLED, readonly color: Color, readonly direction: Corner};


export type Row = {readonly kind: "rnil"} | {readonly kind: "rcons", readonly hd: Block, readonly tl: Row};

/** The empty list of blocks. */
export const rnil: {readonly kind: "rnil"} = {kind: "rnil"};

/** Returns a list of blocks with hd in front of tl. */
export const rcons = (hd: Block, tl: Row): Row => {
  return {kind: "rcons", hd: hd, tl: tl};
};


export type Pipe= {readonly kind: "pnil"} | {readonly kind: "pcons", readonly hd: Row, readonly tl: Pipe};

/** The empty list of rows. */
export const pnil: {readonly kind: "pnil"} = {kind: "pnil"};

/** Returns a list of rows with hd in front of tl. */
export const pcons= (hd: Row, tl: Pipe): Pipe => {
  return {kind: "pcons", hd: hd, tl: tl};
};

/** Returns the length of the given row. */
export const rlen = (row: Row): bigint => {
  if (row.kind === "rnil") {
    return 0n;
  } else {
    return 1n + rlen(row.tl);
  }
};

/** Returns the concatenation of two rows. */
export const rconcat = (row1: Row, row2: Row): Row =>{
  if (row1.kind === "rnil") {
    return row2;
  } else {
    return rcons(row1.hd, rconcat(row1.tl, row2));
  }
};

/** Returns the length of the given pipe. */
export const mlen = (pipe: Pipe): bigint => {
  if (pipe.kind === "pnil") {
    return 0n;
  } else {
    return 1n + mlen(pipe.tl);
  }
};

/** Returns the concatenation of two pipes. */
export const pconcat = (pipe1: Pipe, pipe2: Pipe): Pipe => {
  if (pipe1.kind === "pnil") {
    return pipe2;
  } else {
    return pcons(pipe1.hd, pconcat(pipe1.tl, pipe2));
  }
};