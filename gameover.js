export class Gameover extends Phaser.Scene{

    constructor(){
        super({key: 'gameover'});
    }

    preload(){
        this.load.image('gameover','assets/extras/gameover.png');
    }

    create(){
        
        this.add.image(400,300,'gameover').setScale(1.6);
        this.startText=this.add.text(280, 500, 'press to RESTART', { fontFamily: 'Bullpen3D',fontSize: '32px', fill: '#34ff00' });
        this.startText.setInteractive();
        this.startText.on('pointerdown',(pointer)=>{
            this.scene.start('game');
        });
        
    }
}