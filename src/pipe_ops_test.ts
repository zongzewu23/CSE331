import * as assert from 'assert';
import { TR, TL, BR, BL, TB, LR, DIRT, WALL, STRAIGHT, ANGLED, Block,
         rnil, rcons, pnil, pcons } from './pipe';
import { bflip, rflip, pflip } from './pipe_ops';

// NOTE: ordinarily we would include comments describing the coverage on these
// test cases. Since you are writing your own code the descriptions may not
// match, so they have been omitted.

describe('pipe_ops', function() {

  const tr_angled_dirt_sq: Block = {direction: TR, color: DIRT, form: ANGLED};
  const tl_angled_dirt_sq: Block = {direction: TL, color: DIRT, form: ANGLED};
  const bl_angled_dirt_sq: Block = {direction: BL, color: DIRT, form: ANGLED};
  const br_angled_dirt_sq: Block = {direction: BR, color: DIRT, form: ANGLED};

  const tb_straight_wall_sq: Block = {direction: TB, color: WALL, form: STRAIGHT};
  const lr_straight_wall_sq: Block = {direction: LR, color: WALL, form: STRAIGHT};

  const tr_angled_wall_sq: Block = {direction: TR, color: WALL, form: ANGLED};
  const tl_angled_wall_sq: Block = {direction: TL, color: WALL, form: ANGLED};
  const bl_angled_wall_sq: Block = {direction: BL, color: WALL, form: ANGLED};
  const br_angled_wall_sq: Block = {direction: BR, color: WALL, form: ANGLED};

  const tb_straight_dirt_sq: Block = {direction: TB, color: DIRT, form: STRAIGHT};
  const lr_straight_dirt_sq: Block = {direction: LR, color: DIRT, form: STRAIGHT};

  it('bflip', function() {
    assert.deepStrictEqual(bflip(tb_straight_wall_sq), tb_straight_wall_sq);
    assert.deepStrictEqual(bflip(tb_straight_dirt_sq), tb_straight_dirt_sq);
    assert.deepStrictEqual(bflip(lr_straight_wall_sq), lr_straight_wall_sq);
    assert.deepStrictEqual(bflip(lr_straight_dirt_sq), lr_straight_dirt_sq);
    assert.deepStrictEqual(bflip(tr_angled_dirt_sq), br_angled_dirt_sq);
    assert.deepStrictEqual(bflip(tr_angled_wall_sq), br_angled_wall_sq);
    assert.deepStrictEqual(bflip(tl_angled_dirt_sq), bl_angled_dirt_sq);
    assert.deepStrictEqual(bflip(tl_angled_wall_sq), bl_angled_wall_sq);
    assert.deepStrictEqual(bflip(br_angled_dirt_sq), tr_angled_dirt_sq);
    assert.deepStrictEqual(bflip(br_angled_wall_sq), tr_angled_wall_sq);
    assert.deepStrictEqual(bflip(bl_angled_dirt_sq), tl_angled_dirt_sq);
    assert.deepStrictEqual(bflip(bl_angled_wall_sq), tl_angled_wall_sq);
  });

  it('rflip', function() {
    assert.deepStrictEqual(rflip(rnil), rnil);
    assert.deepStrictEqual(rflip(rcons(bl_angled_dirt_sq, rnil)), rcons(tl_angled_dirt_sq, rnil));
    assert.deepStrictEqual(rflip(rcons(tr_angled_dirt_sq, rcons(tl_angled_dirt_sq, rnil))),
        rcons(br_angled_dirt_sq, rcons(bl_angled_dirt_sq, rnil)));
  });

  it('pflip', function() {
    assert.deepStrictEqual(pflip(pnil), pnil);
    assert.deepStrictEqual(pflip(pcons(rcons(bl_angled_dirt_sq, rnil), pnil)),
        pcons(rcons(tl_angled_dirt_sq, rnil), pnil));
    assert.deepStrictEqual(
        pflip(pcons(rcons(tr_angled_dirt_sq, rnil), pcons(rcons(tl_angled_dirt_sq, rnil), pnil))),
        pcons(rcons(bl_angled_dirt_sq, rnil), pcons(rcons(br_angled_dirt_sq, rnil), pnil)));
  });
});
