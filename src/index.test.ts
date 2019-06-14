/*import { sum } from "./index";

test("try", () => {
  expect(sum(3, 4)).toBe(7);
});*/

import { willBeAlive } from "./index";
import { numberAliveNeighbours } from "./index";
import { getMatrix } from "./index";
import { analyzeBorders } from "./index";
import { reduceMatrix } from "./index";
import { enlargeMatrix } from "./index";
import { createNewWorld } from "./index";

test("willBeAlive_1", () => {
  expect(willBeAlive(true, 4)).toBe(false);
});

test("willBeAlive_2", () => {
  expect(willBeAlive(true, 8)).toBe(false);
});

test("willBeAlive_3", () => {
  expect(willBeAlive(false, 4)).toBe(false);
});

test("willBeAlive_4", () => {
  expect(willBeAlive(false, 2)).toBe(true);
});

test("willBeAlive_5", () => {
  expect(willBeAlive(true, 3)).toBe(true);
});

test("numberAliveNeighbours_1", () => {
  expect(
    numberAliveNeighbours([
      [true, false, true],
      [false, false, false],
      [true, true, true]
    ])
  ).toBe(5);
});

test("numberAliveNeighbours_2", () => {
  expect(
    numberAliveNeighbours([
      [false, false, false],
      [false, false, false],
      [false, false, false]
    ])
  ).toBe(0);
});

test("numberAliveNeighbours_3", () => {
  expect(
    numberAliveNeighbours([
      [true, true, false],
      [false, true, true],
      [true, true, true]
    ])
  ).toBe(6);
});

test("numberAliveNeighbours_4", () => {
  expect(numberAliveNeighbours([[], [], []])).toBe(undefined);
});

test("numberAliveNeighbours_5", () => {
  expect(
    numberAliveNeighbours([[, true, false], [undefined, null, true], []])
  ).toBe(undefined);
});

test("numberAliveNeighbours_5", () => {
  expect(
    numberAliveNeighbours([
      [false, false, true],
      [false, true, true],
      [false, false, false]
    ])
  ).toBe(2);
});

test("getMatrix_1", () => {
  expect(
    getMatrix(
      [
        [true, false, true, false],
        [false, false, false, true],
        [true, true, true, true],
        [false, true, false, false]
      ],
      1,
      2
    )
  ).toEqual([[false, true, false], [false, false, true], [true, true, true]]);
});

test("getMatrix_2", () => {
  expect(
    getMatrix(
      [
        [true, false, true, false, false],
        [false, false, false, true, true],
        [true, true, true, true, false],
        [false, true, false, false, false],
        [true, true, true, true, true]
      ],
      2,
      2
    )
  ).toEqual([[false, false, true], [true, true, true], [true, false, false]]);
});

test("getMatrix_3", () => {
  expect(
    getMatrix(
      [
        [false, true, false, false, false],
        [false, true, true, false, false],
        [true, true, false, true, false],
        [false, false, false, true, false],
        [false, true, true, true, false]
      ],
      1,
      3
    )
  ).toEqual([
    [false, false, false],
    [true, false, false],
    [false, true, false]
  ]);
});

test("analyzeBorders_1", () => {
  expect(
    analyzeBorders([
      [true, true, false],
      [false, false, false],
      [false, false, false]
    ])
  ).toBe(true);
});

test("analyzeBorders_2", () => {
  expect(
    analyzeBorders([
      [true, true, false, false],
      [true, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ])
  ).toBe(true);
});

test("analyzeBorders_3", () => {
  expect(
    analyzeBorders([
      [false, false, false],
      [true, false, false],
      [false, false, false]
    ])
  ).toBe(true);
});

test("analyze_borders_4", () => {
  expect(
    analyzeBorders([
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, true, true, true, false],
      [false, false, false, false, false]
    ])
  ).toBe(false);
});

test("analyze_borders_5", () => {
  expect(analyzeBorders([[]])).toBe(undefined);
});

test("analyze_borders_6", () => {
  expect(
    analyzeBorders([[true, false, true], [false, false], [true, true, false]])
  ).toBe(undefined);
});

test("reduce_matrix_1", () => {
  expect(
    reduceMatrix([
      [false, false, false, false],
      [],
      [false, false, false, false]
    ])
  ).toBe(undefined);
});

test("reduce_matrix_2", () => {
  expect(
    reduceMatrix([
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false],
      [false, false, false, false]
    ])
  ).toEqual([[false, false], [false, false]]);
});

test("reduce_matrix_3", () => {
  expect(
    reduceMatrix([
      [false, false, true, true, false],
      [true, true, false, true, true],
      [true, true, true, true, true],
      [false, false, true, false, false],
      [true, false, true, true, true]
    ])
  ).toEqual([[true, false, true], [true, true, true], [false, true, false]]);
});

test("reduce_matrix_4", () => {
  expect(reduceMatrix([[true, false], [false, true]])).toBe(undefined);
});

test("enlarge_matrix_1", () => {
  expect(
    enlargeMatrix([
      [true, false, true],
      [false, true, false],
      [false, false, true]
    ])
  ).toEqual([
    [false, false, false, false, false],
    [false, true, false, true, false],
    [false, false, true, false, false],
    [false, false, false, true, false],
    [false, false, false, false, false]
  ]);
});

test("enlarge_matrix_2", () => {
  expect(enlargeMatrix([[true, false, true], []])).toBe(undefined);
});

test("create_new_world_1", () => {
  expect(createNewWorld([[]])).toBe(undefined);
});

test("create_new_world_2", () => {
  expect(
    createNewWorld([
      [false, true, false, false, false],
      [false, true, true, false, false],
      [true, true, false, true, false],
      [false, false, false, true, false],
      [false, true, true, true, false]
    ])
  ).toEqual([
    [false, false, false, false, false, false, false],
    [false, true, false, true, false, false, false],
    [false, false, false, false, true, false, false],
    [false, false, true, false, false, true, false],
    [false, true, false, false, true, true, false],
    [false, false, false, true, false, true, false],
    [false, false, true, true, true, false, false]
  ]);
});
