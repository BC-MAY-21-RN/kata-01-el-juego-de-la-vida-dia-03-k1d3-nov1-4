import Game from './juego.js';
const TABLERO = document.getElementById('main');
const X = 30;
const Y = 30;
const VIVAS = ['2,3', '2,4', '2,5'];
const GAME = new Game(X, Y, TABLERO, VIVAS);
GAME.crearTablero();
setInterval(() => {
  GAME.buscarCelulas();
}, 100);
