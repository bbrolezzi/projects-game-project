class Brick {
  constructor(game, color) {
    this.game = game;
    this.grid = this.game.grid;
    this.size = 1;
    this.tileSize = this.grid.tileSize;
    this.appearingBrick = true;
    this.brickTime = 2000;
    this.column = 0;
    this.row = 0;
    this.color = color;
    this.setRandomPosition();
    this.bornDate = new Date();
  }

  setRandomPosition() {
    this.row = Math.floor(Math.random() * 20);
    this.column = Math.floor(Math.random() * 13);
    if (this.checkPosition(this.column, this.row)) {
      this.setRandomPosition();
    } else {
      this.grid.layout[this.column][this.row] = true;
    }
  }

  checkPosition(column, row) {
    for (let i = 0; i < this.size; i++) {
      if (!this.grid.layout[column + i] || this.grid.layout[column + i][row]) {
        return true;
      }
    }
  }

  drawBrick() {
    this.game.context.save();
    this.game.context.fillStyle = this.color;
    for (let i = 0; i < this.size; i++) {
      this.game.context.fillRect(
        (this.row + i) * this.tileSize,
        this.column * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
    this.game.context.restore();
  }
}
