'use strict';

describe('Game of Life', function() {
  var board;

  beforeEach(function() {
    board = new Board();
  });

  it('should create a new board', function() {
    expect(board).toBeDefined();
  });
});
