const hitingNoise = new Audio('./sound/droppingWall.wav');
const gamePlay = new Audio('./sound/chronoCross.mp3');
const gameLost = new Audio('./sound/sadTune.mp3');

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.grid = new Grid(this);
    this.bricks = [];
    this.image = new Image();
    this.setKeyBindings();
    this.running = true;
  }

  drawStartScreen() {
    const startImage = new Image();
    startImage.src = './images/startImage.png';
    startImage.addEventListener('load', () => {
      this.context.drawImage(
        startImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    });
    this.context.drawImage(
      startImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  drawEndScreen() {
    const endImage = new Image();
    endImage.src = './images/endImage.png';
    endImage.addEventListener('load', () => {
      this.context.drawImage(
        endImage,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    });
    this.context.drawImage(
      endImage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
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
          this.remove('red');
          hitingNoise.play();
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.remove('white');
          hitingNoise.play();
          break;
        case 'ArrowRight':
          event.preventDefault();
          this.remove('blue');
          hitingNoise.play();
          break;
        case 'Enter':
          event.preventDefault();
          this.loop();
          gamePlay.play();
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
    if (this.lose) {
      clearTimeout(this.lose);
      this.drawEndScreen();
      gamePlay.pause();
      gameLost.play();
    }
  }

  loop() {
    this.addBrick();
    this.clean();
    this.drawEverything();
    this.lose();
    if (this.running) {
      setTimeout(() => {
        this.loop();
      }, 500);
    }
  }
}
