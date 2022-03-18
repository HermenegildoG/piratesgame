import {Game} from './game.js';
import {Menu} from './menu.js';
import {Gameover} from './gameover.js';
import {Congratulations} from './Congratulations.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [Menu,Game,Gameover,Congratulations],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    
};

var pirateGreen;
var cursors;
var mapa;
var stars;
var score = 0;
var scoreText;
var gameOver=false;
var game = new Phaser.Game(config);