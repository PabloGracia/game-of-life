import { type } from "os";

/*export const sum = (a: number, b: number): number => {
  return a + b;
};*/

/**
 * Funcion willBeAlive
 * returns a boolean stating whether the cell will be alive in the next iteration or not
 * @param is_cell_alive boolean stating wether the cell is alive in the current iteration
 * @param alive_neighbours number with the number of alive neighbours sorrounding it
 */
export const willBeAlive = (
  is_cell_alive: boolean,
  alive_neighbours: number
): boolean => {
  if (is_cell_alive) {
    return alive_neighbours === 3;
  } else {
    return alive_neighbours === 2 || alive_neighbours == 3;
  }
};

/**
 * Function numberAliveNeighbours
 * returns the number of alive neighbours sorrounding the target cell
 * @param target_and_neighbours 3x3 matrix filled with booleans where the position [1,1] (in JavaScript arrays) is the target cell
 */
export const numberAliveNeighbours = (
  target_and_neighbours: boolean[][]
): number | undefined => {
  let counter: number = 0;
  if (
    target_and_neighbours.length !== 3 ||
    target_and_neighbours[0].length !== 3 ||
    target_and_neighbours[1].length !== 3 ||
    target_and_neighbours[2].length !== 3
  ) {
    return undefined;
  }
  if (typeof target_and_neighbours[1][1] !== "boolean") {
    return undefined;
  }
  const is_target_alive: boolean = target_and_neighbours[1][1];
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (typeof target_and_neighbours[x][y] !== "boolean") {
        return undefined;
      }
      if (target_and_neighbours[x][y]) {
        counter += 1;
      }
    }
  }
  counter = is_target_alive ? counter - 1 : counter;
  return counter;
};

/**
 * Function getMatrix
 * returns the 3x3 boolean matrix sorrounding the target cell
 * @param world_matrix nxm boolean matrix of the world
 * @param x_pos x position of the target cell
 * @param y_pos y position of the target cell
 */
export const getMatrix = (
  world_matrix: boolean[][],
  x_pos: number,
  y_pos: number
): boolean[][] | undefined => {
  let objective_matrix: boolean[][] = [];
  let index: number = 0;
  for (let x = -1; x < 2; x++) {
    objective_matrix.push([]);
    for (let y = -1; y < 2; y++) {
      if (typeof world_matrix[x_pos + x][y_pos + y] !== "boolean") {
        return undefined;
      }
      objective_matrix[index].push(world_matrix[x_pos + x][y_pos + y]);
    }
    index++;
  }

  return objective_matrix;
};

export const analyzeBorders = (
  world_matrix: boolean[][]
): boolean | undefined => {
  // Check that the length of the rows is not zero
  if (world_matrix[0].length === 0) {
    return undefined;
  }
  //Check that the length of the columns is not zero
  if (world_matrix.length === 0) {
    return undefined;
  }
  // Check that all the arrays in the matrix have the same length
  for (let i = 1; i < world_matrix.length; i++) {
    if (world_matrix[i].length !== world_matrix[0].length) {
      return undefined;
    }
  }

  // Check first and last rows
  for (let i = 0; i < world_matrix[0].length; i++) {
    if (world_matrix[0][i] || world_matrix[world_matrix.length - 1][i]) {
      return true;
    }
  }

  // Check first and last columns
  for (let i = 0; i < world_matrix.length; i++) {
    if (world_matrix[i][0] || world_matrix[i][world_matrix[0].length - 1]) {
      return true;
    }
  }

  return false;
};
