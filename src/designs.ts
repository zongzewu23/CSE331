import { Pipe, pnil, Color, pcons, rcons, ANGLED, BL, BR, rnil, TL, TR, Block, STRAIGHT, TB, LR } from './pipe';

// TODO (Task 6a) implement the following functions as translations of your
// math definitions. The parameters must be ordered as below for testing,
// (it's okay if this deviates slightly from your math definition)

/**
 * Returns a pipe in design "A" as defined in Task 4b
 * @param rows of design to create, must be even number >= 0
 * @param color of design to create
 */
export const PipeA = (rows: bigint, color: Color): Pipe => {
  if (rows < 0) {
    throw new Error("rows is a negative number");
  } else if (rows % 2n !== 0n) {
    throw new Error("rows is not a even number");
  } else if (rows === 0n) {
    return pnil;
  } else {
    return pcons(rcons(bl(color), rcons(tr(color), rnil)),
              pcons(rcons(tl(color), rcons(br(color), rnil)),
                PipeA(rows - 2n, color)
      )
    );
  }
}

/**
 * Returns a pipe in design "B" as defined in Task 4b
 * @param rows of design to create, must be even number >= 0
 * @param color of design to create
 */
export const PipeB = (rows: bigint, color: Color): Pipe => {
  if (rows < 0) {
    throw new Error("rows is a negative number");
  } else if (rows % 2n !== 0n) {
    throw new Error("rows is not a even number");
  } else if (rows === 0n) {
    return pnil;
  } else {
    return pcons(rcons(tr(color), rcons(bl(color), rnil)),
              pcons(rcons(bl(color), rcons(tr(color), rnil)),
                PipeB(rows - 2n, color)
      )
    );
  }
}

/**
 * Returns a pipe in design "C" as defined in Task 4b
 * @param rows of design to create, must be a multiple of 3, >= 0
 * @param color of design to create
 */
export const PipeC = (rows: bigint, color: Color): Pipe => {
  if (rows < 0) {
    throw new Error("rows is a negative number");
  } else if (rows % 3n !== 0n) {
    throw new Error("rows is not multiples of 3");
  } else if (rows === 0n) {
    return pnil;
  } else {
    return pcons(rcons(tl(color), rcons(br(color), rnil)),
              pcons(rcons(tb(color), rcons(tl(color), rnil)),
                  pcons(rcons(tb(color), rcons(tb(color),rnil)),
                      PipeC(rows - 3n, color)
        )
      )
    );
  }
}


// Helper function to make life a lot easier, and tidier
/**
 * return a TL block with specific color
 * @param color 
 * @returns 
 */
export const tl = (color: Color): Block => {
  return { form: ANGLED, color: color, direction: TL };
}
/**
 * return a TR block with specific color
 * @param color 
 * @returns 
 */
export const tr = (color: Color): Block => {
  return { form: ANGLED, color: color, direction: TR };
}
/**
 * return a BL block with specific color
 * @param color 
 * @returns 
 */
export const bl = (color: Color): Block => {
  return { form: ANGLED, color: color, direction: BL };
}
/**
 * return a BR block with specific color
 * @param color 
 * @returns 
 */
export const br = (color: Color): Block => {
  return { form: ANGLED, color: color, direction: BR };
}
/**
 * return a TB block with specific color
 * @param color 
 * @returns 
 */
export const tb = (color: Color): Block => {
  return { form: STRAIGHT, color: color, direction: TB };
};
/**
 * return a LR block with specific color
 * @param color 
 * @returns 
 */
export const lr = (color: Color): Block => {
  return { form: STRAIGHT, color: color, direction: LR };
};
