class Brick {
  constructor(game, size) {
    this.game = game;
    this.grid = this.game.grid;
    this.size = size;
    this.tileSize = this.grid.tileSize;
    this.appearingBrick = true; //usar pra fazer o tijolo aprecer de acordo com o tempo
    this.brickTime = 1000; //tempo pro tijolo aparecer
    this.column = 0;
    this.row = 0;
    this.color = '';
    this.setColor();
    this.setRandomPosition();
    this.bornDate = new Date();
  }

  setColor() {
    switch (this.size) {
      case 1:
        this.color = 'red';
        break;
      case 2:
        this.color = 'white';
        break;
      case 3:
        this.color = 'blue';
        break;
    }
  }

  setRandomPosition() {
    this.row = Math.floor(Math.random() * 20);
    this.column = Math.floor(Math.random() * 12);
    if (this.checkPosition(this.column, this.row)) {
      this.setRandomPosition();
      console.log('setRandomPosition working');
    } else {
      this.grid.layout[this.column][this.row] = true;
    }
  }

  checkPosition(column, row) {
    for (let i = 0; i < this.size; i++) {
      if (!this.grid.layout[column + i] || this.grid.layout[column + i][row]) {
        console.log('checkPosition working');
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
