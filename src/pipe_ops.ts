import { Block, Row, Pipe, ANGLED, STRAIGHT, BL, BR, LR, TB, TL, TR, rnil, rcons, pnil, pconcat, pcons } from "./pipe";
import { bl,br,tr,tl } from "./designs";


/** Returns the same block but flipped horizontally. */
export const bflip = (b: Block): Block => {
  // TODO: replace with translation of math
  if(b.form === ANGLED && b.direction === TL) {
    return bl(b.color);
  } else if (b.form === ANGLED && b.direction === TR) {
    return br(b.color);
  } else if (b.form === ANGLED && b.direction === BL) {
    return tl(b.color);
  } else if (b.form === ANGLED && b.direction === BR) {
    return tr(b.color);
  } else if (b.form === STRAIGHT && b.direction === TB) {
    return b;
  } else if (b.form === STRAIGHT && b.direction === LR) {
    return b;
  } else {
    throw new Error("Unkown block passed in bflip");
  }
};

/** Returns the same row but flipped horizontally. */
export const rflip = (r: Row): Row => {
  // TODO: replace with translation of math
  if (r.kind === "rnil") {
    return rnil;
  } else {
    return rcons(bflip(r.hd), rflip(r.tl));
  }
};

/** Returns the same pipe but flipped horizontally. */
export const pflip = (p: Pipe): Pipe => {
  // TODO: replace with translation of math
  if (p.kind === "pnil") {
    return pnil;
  } else {
    return pconcat(pflip(p.tl), pcons(rflip(p.hd), pnil));
  }
};