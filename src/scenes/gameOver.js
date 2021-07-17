import 'phaser';
// import config from '../Config/config';
import config from '../config/config';

import Button from '../Objects/Button';
import storage from '../localstorage';
import api from '../api';

export default class GameOver extends Phaser.Scene {
  constructor() {
    super('GameOver');
  }
  preload() {
    this.load.image('btn1', 'assets/button1.png');
    this.load.image('btn2', 'assets/button2.png');
    this.load.audio('gameoverMusic', 'assets/gameover.wav');
  }

  create() {
    this.exitBtn = new Button(this, 400, 400, 'btn1', 'btn2', 'Exit');
    this.bgMusic = this.sound.add('gameoverMusic', {
      volume: 0.5,
      loop: false,
    });
    this.bgMusic.play();
    this.restartBtn = new Button(
      this,
      400,
      400,
      'btn1',
      'btn2',
      'Restart',
      'Game'
    );

    this.madeByText = this.add.text(0, 60, 'Game Over', {
      fontSize: '26px',
      fill: '#B09B1C',
    });

    this.scoreT = this.add.text(0, 0, `Score : ${storage.getCurrentScore()}`, {
      fontSize: '26px',
      fill: '#fff',
    });
    this.highScoreT = this.add.text(
      0,
      0,
      `Highest Score ${storage.getHighestScore()[0]}`,
      { fontSize: '26px', fill: '#fff' }
    );

    this.zone = this.add.zone(
      config.width / 2,
      config.height / 2,
      config.width,
      config.height
    );

    [this.madeByText, this.scoreT, this.highScoreT].forEach((el) => {
      Phaser.Display.Align.In.Center(el, this.zone);
    });

    this.madeByText.setY(5);
    this.scoreT.setY(80);
    this.highScoreT.setY(160);
  }
}