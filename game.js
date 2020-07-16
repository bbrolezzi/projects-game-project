class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.grid = new Grid(this);
    this.bricks = [];
    this.setKeyBindings();
    this.running = true;
  }

  drawStartScreen() {
    this.context.fillStyle = 'red';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText('Stop Trump of Building the Wall', 150, 150, 50);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //start screen elements to be drawn
  }

  drawEverything() {
    this.grid.drawGrid();
    for (const brick of this.bricks) {
      brick.drawBrick();
    }
  }

  addBrick() {
    const index = Math.floor(Math.random() * 3);
    const colors = ['red', 'white', 'blue'];
    this.bricks.push(new Brick(this, colors[index]));
    //size = 1,2,3
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      const key = event.key;
      switch (key) {
        case 'ArrowLeft':
          event.preventDefault();
          //this.addBrick();
          //this.removeBrick('red')
          this.remove('red');
          break;
        case 'ArrowDown':
          event.preventDefault();
          //this.addBrick();
          //this.removeBrick('red')
          this.remove('white');
          break;
        case 'ArrowRight':
          event.preventDefault();
          //this.addBrick();
          //this.removeBrick('red')
          this.remove('blue');
          break;
        case 'Enter':
          event.preventDefault();
          this.loop();
      }
    });
  }

  remove(color) {
    for (const brick of this.bricks) {
      if (
        new Date() < new Date(brick.bornDate.getTime() + brick.brickTime) &&
        brick.color === color
      ) {
        this.grid.layout[brick.column][brick.row] = false;
        this.bricks.splice(this.bricks.indexOf(brick), 1);
      }
    }
  }

  clean() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  lose() {
    for (let i = 0; i < this.grid.layout.length; i++) {
      for (let j = 0; j < this.grid.layout[i].length; j++) {
        if (this.grid.layout[i][j] == false) {
          this.running = true;
          return;
        }
      }
    }

    this.running = false;
    if (this.loopId) {
      clearTimeout(this.loopId);
    }
  }

  loop() {
    this.addBrick();
    this.clean();
    this.drawStartScreen();
    this.drawEverything();
    this.lose();
    if (this.running) {
      setTimeout(() => {
        this.loop();
      }, 200);
    }
  }
}
