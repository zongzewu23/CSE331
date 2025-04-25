import * as assert from 'assert';
import { TR, TL, BR, BL, TB, DIRT, WALL, ANGLED, STRAIGHT, Block, Row, rnil, rcons,
    pnil, pcons } from './pipe';
import { PipeA, PipeB, PipeC } from './designs';

// NOTE: ordinarily we would include comments describing the coverage on these
// test cases. Since you are writing your own code the descriptions may not
// match, so they have been omitted.

describe('designs', function() {
  const tb_straight_dirt: Block = {form: STRAIGHT, color: DIRT, direction: TB};
  const tb_straight_wall: Block = {form: STRAIGHT, color: WALL, direction: TB};

  const tr_angled_dirt: Block = {form: ANGLED, color: DIRT, direction: TR};
  const tr_angled_wall: Block = {form: ANGLED, color: WALL, direction: TR};

  const tl_angled_dirt: Block = {form: ANGLED, color: DIRT, direction: TL};
  const tl_angled_wall: Block = {form: ANGLED, color: WALL, direction: TL};

  const br_angled_dirt: Block = {form: ANGLED, color: DIRT, direction: BR};
  const br_angled_wall: Block = {form: ANGLED, color: WALL, direction: BR};

  const bl_angled_dirt: Block = {form: ANGLED, color: DIRT, direction: BL};
  const bl_angled_wall: Block = {form: ANGLED, color: WALL, direction: BL};

  // tests for pipe design A
  it('PipeA', function() {
    const row1_dirt: Row = rcons(bl_angled_dirt, rcons(tr_angled_dirt, rnil));
    const row2_dirt: Row = rcons(tl_angled_dirt, rcons(br_angled_dirt, rnil));
    const row1_wall: Row = rcons(bl_angled_wall, rcons(tr_angled_wall, rnil));
    const row2_wall: Row = rcons(tl_angled_wall, rcons(br_angled_wall, rnil));

    assert.deepStrictEqual(PipeA(0n, DIRT), pnil);
    assert.deepStrictEqual(PipeA(2n, WALL), pcons(row1_wall, pcons(row2_wall, pnil)));
    assert.deepStrictEqual(PipeA(4n, DIRT), pcons(row1_dirt, pcons(row2_dirt, pcons(row1_dirt,
        pcons(row2_dirt, pnil)))));
  });

  // tests for pipe design B
  it('PipeB', function() {
    const row1_dirt: Row = rcons(tr_angled_dirt, rcons(bl_angled_dirt, rnil));
    const row2_dirt: Row = rcons(bl_angled_dirt, rcons(tr_angled_dirt, rnil));
    const row1_wall: Row = rcons(tr_angled_wall, rcons(bl_angled_wall, rnil));
    const row2_wall: Row = rcons(bl_angled_wall, rcons(tr_angled_wall, rnil));

    assert.deepStrictEqual(PipeB(0n, WALL), pnil);
    assert.deepStrictEqual(PipeB(2n, DIRT), pcons(row1_dirt, pcons(row2_dirt, pnil)));
    assert.deepStrictEqual(PipeB(4n, WALL), pcons(row1_wall, pcons(row2_wall, pcons(row1_wall,
        pcons(row2_wall, pnil)))));
  });

  // tests for pipe design C
  it('PipeC', function() {
    const row1_dirt: Row = rcons(tl_angled_dirt, rcons(br_angled_dirt, rnil));
    const row2_dirt: Row = rcons(tb_straight_dirt, rcons(tl_angled_dirt, rnil));
    const row3_dirt: Row = rcons(tb_straight_dirt, rcons(tb_straight_dirt, rnil));
    const row1_wall: Row = rcons(tl_angled_wall, rcons(br_angled_wall, rnil));
    const row2_wall: Row = rcons(tb_straight_wall, rcons(tl_angled_wall, rnil));
    const row3_wall: Row = rcons(tb_straight_wall, rcons(tb_straight_wall, rnil));

    assert.deepStrictEqual(PipeC(0n, WALL), pnil);
    assert.deepStrictEqual(PipeC(3n, WALL), pcons(row1_wall, pcons(row2_wall, pcons(row3_wall, pnil))));
    assert.deepStrictEqual(PipeC(9n, DIRT),
        pcons(row1_dirt, pcons(row2_dirt, pcons(row3_dirt,
          pcons(row1_dirt, pcons(row2_dirt, pcons(row3_dirt,
            pcons(row1_dirt, pcons(row2_dirt, pcons(row3_dirt, pnil))))))))));
  });

});