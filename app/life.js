'use strict';

var Board = function() {
  this.cells = {};
};

var Cell = function(x, y, alive) {
  this.x = x;
  this.y = y;
  this.alive = alive;
};

function getCellName(x, y) {
  return 'x' + x + 'y' + y;
}

Board.prototype = {
  addCell: function(cell) {
    this.cells[getCellName(cell.x, cell.y)] = cell;
  },
  getCell: function(x, y) {
    return this.cells[getCellName(x, y)];
  },
  getAliveNeighborCount: function(cell) {
    var x = cell.x;
    var y = cell.y;
    var aliveCells = 0;

    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        if (i === 0 && i === j) {
          continue;
        }
        var currentCell = this.getCell(x + i, y + j);

        if (currentCell && currentCell.isAlive()) {
          aliveCells++;
        }
      }
    }

    return aliveCells;
  },
  getNextState: function(cell) {
    var tempCell = new Cell(cell.x, cell.y, cell.alive);
    var livingNeighbors = this.getAliveNeighborCount(cell);
    if (cell.alive) {
      if (livingNeighbors === 2 || livingNeighbors === 3) {
        tempCell.alive = true;
      } else {
        tempCell.alive = false;
      }
    } else {
      if (livingNeighbors === 3) {
        tempCell.alive = true;
      }
    }
    return tempCell;
  },
  step: function() {
    var cells = this.cells;
    var tempBoard = {};

    for (var c in this.cells) {
      if (this.cells.hasOwnProperty(c)) {
        var cell = this.cells[c];
        var newCell = this.getNextState(cell);
        tempBoard[c] = newCell;
      }
    }

    this.cells = tempBoard;
  }
};

Cell.prototype = {
  isAlive: function() {
    return this.alive;
  }
};
