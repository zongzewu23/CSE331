import * as assert from 'assert';
import { a, b, c, d, e, f, g, h, i } from './funcs';
import { cons, nil } from './list';

// TODO (Task 7):
// - Write tests according to our class requirements for each funcs.ts function
// - Include comments describing which requirements each test fulfills
// - See this week's section slides for an explanation on how to organize files
//   and write assert() statements

describe('funcs', function() {

  it('a', function() {
    // Statement coverage: tests both if-branches (true and false)
    // Branch coverage: tests both boolean conditions
    assert.deepStrictEqual(a(1n, true), cons(1n, cons(-1n, nil)));
    assert.deepStrictEqual(a(1n,false), cons(-1n, cons(1n, nil)));
  });

  // TODO: create more it() test instances as needed
  it('b', function() {
    // Statement coverage: tests both code paths in the function
    // Branch coverage: tests both branches of the if-statement
    assert.deepStrictEqual(b([1n, 1n], true), [2n, 1n]);
    assert.deepStrictEqual(b([1n, 1n], false), [0n, 1n]);
  }); 

  it('c', function(){
    // Statement coverage: tests all three code paths
    // Branch coverage: tests all branches (t=0, t=1, t>1)

    // no recusion
    assert.deepStrictEqual(c({s: [1n, 1n], t: 0n}), 1n);
    // no recusion
    assert.deepStrictEqual(c({s: [1n, 1n], t: 1n}), 2n);
    // 1 recusion
    assert.deepStrictEqual(c({s: [5n, 3n], t: 2n}), 13n);
    // many
    assert.deepStrictEqual(c({s: [1n, 1n], t: 3n}), 4n);
  });

  it('d', function(){
    // Statement coverage: tests all three cases in switch statement
    // Branch coverage: tests all color options

    // purple
    assert.deepStrictEqual(d("purple", 3n), 3n);
    // pink
    assert.deepStrictEqual(d("pink", 3n), -3n);
    // green
    assert.deepStrictEqual(d("green", 3n), 9n);
  });

  it('e', function(){
    // Exhaustive testing: function has 9 possible inputs (3 colors × 3 colors)
    // which is fewer than 10, so we test all combinations
    
    // purple as first color
    assert.deepStrictEqual(e("purple", "purple"), 3n);  // 3 -> 3
    assert.deepStrictEqual(e("purple", "pink"), -3n);   // 3 -> -3
    assert.deepStrictEqual(e("purple", "green"), 9n);   // 3 -> 9
    
    // pink as first color
    assert.deepStrictEqual(e("pink", "purple"), -3n);   // 3 -> -3 -> -3
    assert.deepStrictEqual(e("pink", "pink"), 3n);      // 3 -> -3 -> 3
    assert.deepStrictEqual(e("pink", "green"), 9n);     // 3 -> -3 -> 9
    
    // green as first color
    assert.deepStrictEqual(e("green", "purple"), 9n);   // 3 -> 9 -> 9
    assert.deepStrictEqual(e("green", "pink"), -9n);    // 3 -> 9 -> -9
    assert.deepStrictEqual(e("green", "green"), 81n);   // 3 -> 9 -> 81
  });

  it('f', function(){
    // Exhaustive testing: function has 4 possible inputs (3 colors + undefined)
    // which is fewer than 10, so we test all possibilities

    // purple
    assert.deepStrictEqual(f("purple"), 6n);
    // pink
    assert.deepStrictEqual(f("pink"), 4n);
    // green
    assert.deepStrictEqual(f("green"), 5n);
    // default
    assert.deepStrictEqual(f(), 0n);
  });

  it('g', function() {
    // Statement coverage: tests both code paths
    // Branch coverage: tests both branches of the if-statement

    // <=0
    assert.deepStrictEqual(g(0n) ,0n);
    assert.deepStrictEqual(g(-5n) ,0n);
    // 1
    assert.deepStrictEqual(g(2n), 2n);
    // many
    assert.deepStrictEqual(g(7n), 24n);
  });

  it('h', function() {
    // Statement coverage: tests both code paths
    // Branch coverage: tests both branches of the if-statement

    // <=0
    assert.deepStrictEqual(h([]) ,1n);
    // 1
    assert.deepStrictEqual(h([3n]), 3n);
    // many
    assert.deepStrictEqual(h([3n, 4n, 5n]), 60n);
  });

  it('i', function() {
    // Statement coverage: tests all four code paths
    // Branch coverage: tests all branches of the conditional statements

    // num === 0
    assert.deepStrictEqual(i(0n), 0n);
    // n > 0 is a multiple of 3
    assert.deepStrictEqual(i(9n), 6n);
    // n - 1 is a multiple of 3
    assert.deepStrictEqual(i(10n), 6n);
    // n -2 is a multiple of 3
    assert.deepStrictEqual(i(11n), 6n);
    // Recursion Coverage: 
    // 0 recursive calls: with i(0n)
    // Multiple recursive calls: with i(9n), i(10n), and i(11n)
  });

});
