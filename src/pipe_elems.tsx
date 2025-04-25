import React from 'react';
import StraightDirt from './img/dirt_straight.png';
import StraightWall from './img/wall_straight.png';
import AngledDirt from './img/dirt_angle.png';
import AngledWall from './img/wall_angle.png';
import './app.css';
import { Block, Row, Pipe, DIRT, STRAIGHT, rlen, WALL, pnil, rconcat, pcons} from './pipe';
import { PipeA, PipeB, PipeC } from './designs';

/**
 * Creates pipe as specified by params
 * @param design of new pipe: A, B, or C
 * @param color of new pipe: WALL or DIRT
 * @param rows number of rows of new pipe, must be multiple of 2 for A, B
 *             and multiple of 3 for pipe C
 * @returns new A/B/C Pipe with specified color and number of rows
 */
export const generatePipe = (design: string, color: string, rows: bigint): Pipe => {
  if (color !== WALL && color !== DIRT) {
    return pnil;
  }

  switch(design) {
    case "A": return PipeA(rows, color);
    case "B": return PipeB(rows, color);
    case "C": return PipeC(rows, color);
    default: return pnil;
  }
}

/**
 * Sews pipe1 and pipe2 together by appending each row of pipe2
 * to the corresponding row of pipe1
 *
 * @param pipe1 left half of new pipe
 * @param pipe2 right half of new pipe
 * @returns new pipe consisting of pipe1 and pipe2
 */
export const sew = (pipe1: Pipe, pipe2: Pipe): Pipe => {
  if (pipe1.kind === "pnil") {
    if (pipe2.kind === "pnil") {
      return pnil;
    } else {
      throw new Error("bad pipe2 argument: pipe2 has none rows but pipe2 has some");
    }
  } else {
    if (pipe2.kind === "pnil") {
      throw new Error("bad pipe1 argument: pipe2 has none rows but pipe1 has some");
    } else {
      return pcons(rconcat(pipe1.hd, pipe2.hd), sew(pipe1.tl, pipe2.tl));
    }
  }
}

// Returns an element that draws the given square.
const BlockElem = (props: {block: Block}): JSX.Element => {
  if (props.block.form === STRAIGHT) {
    const cls = `block orient-line-${props.block.direction}`.toLowerCase();
    if (props.block.color === DIRT) {
      return <img alt={"green straight line in brown square with direction " +
        props.block.direction} src={StraightDirt} className={cls}/>;
    } else { // WALL
      return <img alt={"green straight line in grey square with direction " +
        props.block.direction} src={StraightWall} className={cls}/>;
    }
  } else { // ANGLED
    const cls = `block rotate-angle-${props.block.direction}`.toLowerCase();
    if (props.block.color === DIRT) {
      return <img alt={"green angled line in brown square with direction " +
        props.block.direction} src={AngledDirt} className={cls}/>;
    } else { // WALL
      return <img alt={"green angled line in grey square with direction " +
        props.block.direction} src={AngledWall} className={cls}/>;
    }
  }
};

// Returns a list of block elements for each square in the given row.
const getBlocks = (row: Row, key: number): JSX.Element[] => {
  if (row.kind === "rnil") {
    return [];
  } else {
    return [<BlockElem key={key} block={row.hd}/>]
      .concat(getBlocks(row.tl, key + 1));
  }
};

// Returns a list of DIV elements, one for each row in the given pipe.
// Throws an exception if any row has a different length than expected.
const getRows = (pipe: Pipe, expLen: bigint, key: number): JSX.Element[] => {
  if (pipe.kind === "pnil") {
    return [];
  } else {
    const rowLen = rlen(pipe.hd);
    if (rowLen !== expLen) {
      throw new Error(
        `bad pipe argument: rows have different lengths: ${rowLen} vs ${expLen}`);
    } else {
      const row = getBlocks(pipe.hd, 0);
      return [<ol key={key} className="row">{row}</ol>].concat(
        getRows(pipe.tl, expLen, key + 1));
    }
  }
};

/** Returns an element that draws the given pipe. */
export const PipeElem = (props: {pipe: Pipe}): JSX.Element => {
  if (props.pipe.kind === "pnil") {
    throw new Error("bad Pipe argument: cannot have 0 rows");
  } else {
    const exp_len = rlen(props.pipe.hd);
    const rows = getRows(props.pipe, exp_len, 0);
    return <ol>{rows}</ol>;
  }
};
