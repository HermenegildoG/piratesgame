export class Menu extends Phaser.Scene{

    constructor() 
    {
        super({ key: 'menu' });
    }

    preload(){
        this.load.image('Background','assets/Background/Nature_Background.png');
    }
    create(){
        this.add.image(400, 300, 'Background').setScale(1.5,1.7);

        this.startText=this.add.text(300, 300, 'Press START', { fontFamily: 'Bullpen3D',fontSize: '32px', fill: '#082700' });
        this.startText.setInteractive();
        this.startText.on('pointerdown',(pointer)=>{
            this.scene.start('game');
        });
    }

}