'use strict';

describe('Game of Life', function() {
  var board;
  var cell;

  beforeEach(function() {
    board = new Board();
    cell = new Cell(1, 1, true);
    board.addCell(cell);
  });

  it('should create a new board', function() {
    expect(board).toBeDefined();
  });

  it('should add a cell to the board', function() {
    expect(board.cells.x1y1).toEqual(cell);
  });

  it('should get a cell from the board', function() {
    expect(board.getCell(1, 1)).toEqual(cell);
  });

  it('should return true if the cell is alive', function() {
    expect(cell.isAlive()).toEqual(true);
  });

  it('should return false if the cell is dead', function() {
    var deadCell = new Cell(1, 1, false);
    board.addCell(deadCell);

    expect(deadCell.isAlive()).toEqual(false);
  });

  it('should return 0 if there is only 1 cell on the board', function() {
    expect(board.getAliveNeighborCount(cell)).toEqual(0);
  });

  it('should have the correct neighbor count', function() {
    board.addCell(new Cell(0, 0, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(1);
    board.addCell(new Cell(0, 1, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(2);
    board.addCell(new Cell(0, 2, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(3);
    board.addCell(new Cell(1, 0, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(4);
    board.addCell(new Cell(1, 2, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(5);
    board.addCell(new Cell(2, 0, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(6);
    board.addCell(new Cell(2, 1, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(7);
    board.addCell(new Cell(2, 2, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(8);

    board.addCell(new Cell(3, 3, true));
    expect(board.getAliveNeighborCount(cell)).toEqual(8);
  });

  describe('calculateNextState', function() {
    it('dies if there are less than 2 living neighbors', function() {
      board.addCell(new Cell(0, 0, true));

      expect(board.getNextState(cell).isAlive()).toBe(false);
    });
    it('dies if there are more than 3 living neighbors', function() {

      board.addCell(new Cell(0, 0, true));
      board.addCell(new Cell(0, 1, true));
      board.addCell(new Cell(0, 2, true));
      board.addCell(new Cell(1, 0, true));

      expect(board.getNextState(cell).isAlive()).toBe(false);
    });
    it('lives if there are 2 or 3 living neighbors', function() {
      board.addCell(new Cell(0, 0, true));
      board.addCell(new Cell(0, 1, true));

      expect(board.getNextState(cell).isAlive()).toBe(true);
    });
    it('comes back to live if there are 3 living neighbors ', function() {
      board.addCell(new Cell(0, 0, true));
      board.addCell(new Cell(0, 1, true));
      board.addCell(new Cell(0, 2, true));

      cell.alive = false;

      expect(board.getNextState(cell).isAlive()).toBe(true);
    });
    it('does not come back to live if there are 2 living neighbors ', function() {
      board.addCell(new Cell(0, 0, true));
      board.addCell(new Cell(0, 1, true));

      cell.alive = false;

      expect(board.getNextState(cell).isAlive()).toBe(false);
    });
  });

  describe('step', function() {
    it('calculates the new state for all dying cells', function() {
      board.addCell(new Cell(0, 0, true));

      board.step();

      expect(board.getCell(0, 0).isAlive()).toBe(false);
      expect(board.getCell(1, 1).isAlive()).toBe(false);
    });
    it('calculates the new state for all living cells', function() {
      board.addCell(new Cell(0, 0, true));
      board.addCell(new Cell(1, 2, true));

      board.step();

      expect(board.getCell(0, 0).isAlive()).toBe(false);
      expect(board.getCell(1, 1).isAlive()).toBe(true);
    });
    it('calculates the new state correctly for many cells', function() {
      board.addCell(new Cell(0, 1, true));
      board.addCell(new Cell(0, 2, true));
      board.addCell(new Cell(0, 0, false));
      board.addCell(new Cell(2, 1, true));
      board.addCell(new Cell(1, 0, true));
      board.addCell(new Cell(2, 2, true));
      board.addCell(new Cell(1, 2, false));
      board.addCell(new Cell(2, 0, false));

      board.step();

      expect(board.getCell(1, 1).isAlive()).toBe(false);
      expect(board.getCell(0, 1).isAlive()).toBe(true);
      expect(board.getCell(2, 2).isAlive()).toBe(true);
    });
  });
});
