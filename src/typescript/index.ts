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

/**
 * Function analyzeBorders
 * Checks whether some alive cell is in the border of the world. Returns true if the are cells on the border, false if not
 * @param world_matrix boolean nxm matrix representing the world
 */
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

/**
 * Function reduceMatrix
 * Reduces the provided matrix by removing the four borders. Returns the reduced matrix.
 * @param world_matrix boolean nxm matrix representing the world
 */
export const reduceMatrix = (
  world_matrix: boolean[][]
): boolean[][] | undefined => {
  // Check that the length of the rows is the same for all of them:
  for (let i = 1; i < world_matrix.length; i++) {
    if (world_matrix[i].length !== world_matrix[0].length) {
      console.log("The rows don't have the same length. F(reduceMatrix)");
      return undefined;
    }
  }

  // Check world_matrix is of at least 3x3 size:
  if (world_matrix.length < 3) {
    console.log("The provided matrix is too small");
    return undefined;
  } else if (world_matrix[0].length < 3) {
    console.log("The provided matrix is too small");
    return undefined;
  }

  const number_rows: number = world_matrix[0].length;
  const number_columns: number = world_matrix.length;

  let new_world_matrix: boolean[][] = [];

  // Reduce the original matrix
  for (let i = 1; i < number_columns - 1; i++) {
    new_world_matrix.push(world_matrix[i]);
    new_world_matrix[i - 1].splice(0, 1);
    new_world_matrix[i - 1].pop();
  }

  return new_world_matrix;
};

/**
 * Function enlargeMatrix
 * Enlarges the world matrix by adding a new border to each side containing false values
 * @param world_matrix boolean nxm matrix representing the world
 */
export const enlargeMatrix = (
  world_matrix: boolean[][]
): boolean[][] | undefined => {
  // Check that the length of the rows is the same for all of them:
  for (let i = 1; i < world_matrix.length; i++) {
    if (world_matrix[i].length !== world_matrix[0].length) {
      console.log("The rows don't have the same length. F(enlargeMatrix)");
      return undefined;
    }
  }

  // Check world_matrix is of at least 3x3 size:
  if (world_matrix.length < 3) {
    console.log("The provided matrix is too small. F(enlargeMatrix)");
    return undefined;
  } else if (world_matrix[0].length < 3) {
    console.log("The provided matrix is too small. F(enlargeMatrix)");
    return undefined;
  }

  const new_world_matrix: boolean[][] = [];
  let new_row: boolean[] = [];
  for (let _ = 0; _ < world_matrix.length + 2; _++) {
    new_row.push(false);
  }
  new_world_matrix.push(new_row);
  for (let y = 0; y < world_matrix.length; y++) {
    new_world_matrix.push([false]);
    for (let x = 0; x < world_matrix[0].length; x++) {
      new_world_matrix[y + 1].push(world_matrix[y][x]);
    }
    new_world_matrix[y + 1].push(false);
  }
  new_world_matrix.push(new_row);

  return new_world_matrix;
};

export const createNewWorld = (
  world_matrix: boolean[][]
): boolean[][] | undefined => {
  // Check that the length of the rows is the same for all of them:
  for (let i = 1; i < world_matrix.length; i++) {
    if (world_matrix[i].length !== world_matrix[0].length) {
      console.log("The rows don't have the same length. F(createNewWorld)");
      return undefined;
    }
  }

  // Check world_matrix is of at least 3x3 size:
  if (world_matrix.length < 3) {
    console.log("The provided matrix is too small. F(createNewWorld)");
    return undefined;
  } else if (world_matrix[0].length < 3) {
    console.log("The provided matrix is too small. F(createNewWorld)");
    return undefined;
  }

  let edited_world_matrix: boolean[][];
  let new_world_matrix: boolean[][] = [];
  let new_row: boolean[] = [];

  if (analyzeBorders(world_matrix)) {
    edited_world_matrix = enlargeMatrix(enlargeMatrix(world_matrix));
  } else {
    edited_world_matrix = enlargeMatrix(world_matrix);
  }

  for (let _ = 0; _ < edited_world_matrix[0].length; _++) {
    new_row.push(false);
  }

  new_world_matrix.push(new_row);
  for (let x = 1; x < edited_world_matrix.length - 1; x++) {
    // console.log("y", y);
    new_world_matrix.push([false]);
    for (let y = 1; y < edited_world_matrix[0].length - 1; y++) {
      new_world_matrix[x].push(
        willBeAlive(
          edited_world_matrix[x][y],
          numberAliveNeighbours(getMatrix(edited_world_matrix, x, y))
        )
      );
    }
    new_world_matrix[x].push(false);
  }
  new_world_matrix.push(new_row);

  while (!analyzeBorders(new_world_matrix)) {
    new_world_matrix = reduceMatrix(new_world_matrix);
  }
  return new_world_matrix;
};
