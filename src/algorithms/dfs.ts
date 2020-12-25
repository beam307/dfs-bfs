import { cell, coordinate } from "../App";

export default class Dfs {
  tile: cell[][];
  sx = 0;
  sy = 0;
  dx = 0;
  dy = 0;
  xMax = 0;
  yMax = 0;

  constructor(tile: cell[][], start: coordinate, end: coordinate, row: number, col: number) {
    this.tile = tile;
    this.sx = start.x;
    this.sy = start.y;
    this.dx = end.x;
    this.dy = end.y;
    this.xMax = col;
    this.yMax = row;
  }

  start() {
    this.visit(this.sx, this.sy);
  }

  getTile() {
    return this.tile;
  }

  visit(x: number, y: number): void {
    console.log(x, y);
    this.tile[y][x].visit = true;

    if (this.isValid(x, y - 1)) {
      setTimeout(() => {
        this.visit(x, y - 1);
      }, 50);

    }

    if (this.isValid(x - 1, y)) {
      setTimeout(() => {
        this.visit(x - 1, y);
      }, 50);
    }

    if (this.isValid(x, y + 1)) {
      setTimeout(() => {
        this.visit(x, y + 1);
      }, 50);
    }

    if (this.isValid(x + 1, y)) {
      setTimeout(() => {
        this.visit(x + 1, y);
      }, 50);
    }
  }

  isValid(x: number, y: number): boolean {
    if ((this.sx === x && this.sy === y) || (this.dx === x && this.dy === y)) {
      return false;
    }
    if ((x < 0 || x >= this.xMax) || (y < 0 || y >= this.yMax)) {
      return false;
    }
    if (this.tile[y][x].visit) {
      return false;
    }
    return true;
  }
}
