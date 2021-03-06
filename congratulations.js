export class Congratulations extends Phaser.Scene{
    constructor(){
        super({key: 'congratulations'});
    }

    preload(){
        this.load.image('Congratulations','assets/extras/levelcomplete.png');
    }
    create(){

        //this.add.image(400,300,'congratulations');
        this.startText1=this.add.text(80, 100, 'CONGRATULATIONS ', { fontFamily: 'Bullpen3D',fontSize: '64px', fill: '#ffff00' });
        this.startText=this.add.text(200, 380, 'press to Main Menu', { fontFamily: 'Bullpen3D',fontSize: '32px', fill: '#34ff00' });
        this.startText.setInteractive();
        this.startText.on('pointerdown',(pointer)=>{
            this.scene.start('menu');
            
        });
    }
}