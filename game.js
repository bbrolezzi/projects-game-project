class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.grid = new Grid(this);
    this.bricks = [];
    this.setKeyBindings();
    this.running = true;
  }

  drawEverything() {
    this.grid.drawGrid();
    for (const brick of this.bricks) {
      brick.drawBrick();
    }
  }

  addBrick() {
    //const size = Math.floor(Math.random() * 3) + 1;
    const size = 1;
    this.bricks.push(new Brick(this, size));
    //size = 1,2,3
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      switch (key) {
        case 'ArrowUp':
          event.preventDefault();
          //this.addBrick();
          this.clean();
          this.drawEverything();
          break;
      }
    });
  }

  clean() {
    for (const brick of this.bricks) {
      if (new Date() < new Date(brick.bornDate.getTime() + brick.brickTime)) {
        this.grid.layout[brick.column][brick.row] = false;
        this.bricks.splice(this.bricks.indexOf(brick), 1);
      }
    }
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  lose() {
    this.running = false;
    if (this.loopId) {
      clearTimeout(this.loopId);
    }
  }

  loop() {
    this.addBrick();
    this.drawEverything();
    if (this.running) {
      setTimeout(() => {
        this.loop();
      }, 300);
    }
  }
}