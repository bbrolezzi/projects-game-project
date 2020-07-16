window.addEventListener('load', () => {
  const canvasElement = document.getElementById('game');
  const game = new Game(canvasElement);
  game.drawStartScreen(); // call a paint screen method here!
  game.drawEverything();
  //game.loop();
});
