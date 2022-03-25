let inicializado = false;
export class Game extends Phaser.Scene{

    
    constructor() 
    {
        super({ key: 'game' });
    }

    init() 
    {
        this.score = 0;
    }

    preload()
      {
          this.load.image('star','assets/extras/star.png');
          this.load.image('background0','assets/Background/Nature_Background_Layer_00.png');
          this.load.image('background1','assets/Background/Nature_Background_Layer_01.png');
          this.load.image('background2','assets/Background/Nature_Background_Layer_02.png');
          this.load.image('background3','assets/Background/Nature_Background_Layer_03.png');
          this.load.image('background4','assets/Background/Nature_Background_Layer_04.png');
          this.load.image('background5','assets/Background/Nature_Foreground_Layer_05.png');
          this.load.image('background6','assets/Background/Nature_Foreground_Layer_06.png');
          this.load.spritesheet('pirateGreen','assets/sword_PirateGreen/breathing3.png', { frameWidth: 178, frameHeight: 198 });
          this.load.spritesheet('pirateGreenRunning','assets/sword_PirateGreen//running3.png', { frameWidth: 229, frameHeight: 198 });
          this.load.spritesheet('pirateGreenJumping','assets/sword_PirateGreen/jumpingnew5.png', { frameWidth: 238, frameHeight: 240 });
          this.load.tilemapTiledJSON('mapa1','assets/map/mapa1.json');
          this.load.image('tiles','assets/map/Nature_TileSet.png');
          this.load.image('bomb','assets/extras/bomb.png');
          this.load.audio('theme','assets/sounds/the-sky-9246.mp3');
          this.load.audio('jumpSound','assets/sounds/jumpSound.mp3');
          this.load.audio('runningSound','assets/sounds/runningSoundCut.mp3');
          this.load.audio('punchSound','assets/sounds/punchSound.mp3');
          this.load.audio('grito','assets/sounds/gritonew.mp3');
          this.load.audio('pop','assets/sounds/pop.mp3');
          this.load.audio('win','assets/sounds/victorySound.mp3');
      }
    create()
    {
          this.theme=this.sound.add('theme');
          this.configTheme={
            mute: false,
            volume: 0.2,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
          this.theme.play(this.configTheme);  
        
          this.physics.world.setBoundsCollision(true,false,true,false);
          this.add.image(400,300,'background0').setScale(2).setScrollFactor(0);
          this.bg_1=this.add.tileSprite(400,300,800,600,'background1');
          this.bg_1.setOrigin(0,0);
          this.bg_1.setScrollFactor(0);
          this.bg_2=this.add.tileSprite(400,380,800,600,'background2');
          this.bg_2.setScrollFactor(0);
          this.bg_3=this.add.tileSprite(400,450,800,600,'background3');
          this.bg_3.setScrollFactor(0);
          this.bg_4=this.add.tileSprite(400,550,800,600,'background4');
          this.bg_4.setScrollFactor(0);
  
          this.mapa=this.make.tilemap({key:'mapa1'});
          var tilesets=this.mapa.addTilesetImage('Nature_TileSet','tiles');
          this.basedos=this.mapa.createDynamicLayer('basedos',tilesets);  
          this.base= this.mapa.createDynamicLayer('base',tilesets);
          this.solidos=this.mapa.createDynamicLayer('solidos',tilesets);
          this.solidos.setCollisionByProperty({solido:true});
          this.solidos.setCollisionByExclusion(-1, true);
  
          
          this.pirateGreen = this.physics.add.sprite(100,200,'pirateGreen').setScale(.32);
          this.pirateGreen.setCollideWorldBounds(true);
          this.pirateGreen.body.setVelocityX(0);
          this.pirateGreen.body.updateFromGameObject;
          this.cursors= this.input.keyboard.createCursorKeys();
            if(inicializado){
                this.anims.remove('breathing');
                this.anims.remove('jumping');
                this.anims.remove('running');
                this.pirateGreen.body.setVelocityX(0);
              
            }
            this.anims.create({
                key:'breathing',
                frames:this.anims.generateFrameNumbers('pirateGreen',{start:0 , end:19}),
                frameRate: 10,
                yoyo:true,
                repeat:-1
            });
            this.anims.create({
                key:'jumping',
                frames:this.anims.generateFrameNumbers('pirateGreenJumping',{start:0 , end:9}),
                frameRate: 5,
                repeat:1
            });
            this.anims.create({
                key:'running',
                frames:this.anims.generateFrameNumbers('pirateGreenRunning',{start:0 , end:15}),
                frameRate: 13,
                yoyo:true,
                repeat:-1
            });
            inicializado=true;
            console.log(this)
          this.cameras.main.setBounds(0,0,this.mapa.widthInPixels,600);
          this.cameras.main.startFollow(this.pirateGreen);
          
          this.d=this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
          this.stars = this.physics.add.group({
              key: 'star',
              repeat: 11,
              setXY: { x: 12, y: 0, stepX: 70 }
          });
          this.stars.children.iterate(function (child) {
              child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
          });
          this.bomb=this.physics.add.image(500,300,'bomb');
          this.bomb2=this.physics.add.image(2005,150,'bomb');
          this.bomb3=this.physics.add.image(2230,150,'bomb');
          this.bomb4=this.physics.add.image(2410,150,'bomb');
          this.starSpecial=this.physics.add.image(2750,200,'star').setScale(2);
          this.bomb.setBounce(1);
          this.bomb2.setBounce(1);
          this.bomb3.setBounce(1);
          this.bomb4.setBounce(1);
          this.starSpecial.setCollideWorldBounds(true);
          this.bomb.setCollideWorldBounds(true);
          this.bomb2.setCollideWorldBounds(true);
          this.bomb3.setCollideWorldBounds(true);
          this.bomb4.setCollideWorldBounds(true);
          var timedEvent = this.time.addEvent({ delay: 10000, callback: this.onEvent, callbackScope: this, repeat: 1 });
          this.scoreText = this.add.text(16, 16, 'SCORE: 0 ', { fontFamily: 'Bullpen3D',fontSize: '32px', fill: '#35FF00' }).setScrollFactor(0);
          this.physics.add.collider(this.pirateGreen,this.solidos);
          this.physics.add.collider(this.starSpecial,this.solidos);
          this.physics.add.collider(this.stars,this.solidos);
          this.physics.add.collider(this.bomb,this.solidos);
          this.physics.add.collider(this.bomb2,this.solidos);
          this.physics.add.collider(this.bomb3,this.solidos);
          this.physics.add.collider(this.bomb4,this.solidos);
          this.physics.add.overlap(this.pirateGreen, this.stars, this.collectStar, null, this);
          this.physics.add.collider(this.pirateGreen,this.bomb,this.dead, null, this);
          this.physics.add.collider(this.pirateGreen,this.bomb2,this.dead, null, this);
          this.physics.add.collider(this.pirateGreen,this.bomb3,this.dead, null, this);
          this.physics.add.collider(this.pirateGreen,this.bomb4,this.dead, null, this);
          this.physics.add.collider(this.pirateGreen,this.starSpecial,this.collectStarSpecial, null, this);
          this.jumpSound=this.sound.add('jumpSound');
          this.runningSound=this.sound.add('runningSound');
          this.punchSound=this.sound.add('punchSound');
          this.grito=this.sound.add('grito');
          this.pop=this.sound.add('pop');
          this.win=this.sound.add('win');

          this.config={
            mute: false,
            volume: 0.5,
            rate: .8,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
    }
  
    update()
    {
        //Velocidad asignada a cada background
          this.bg_1.tilePositionX=this.cameras.main.scrollX * .3;
          this.bg_2.tilePositionX=this.cameras.main.scrollX * .5;
          this.bg_3.tilePositionX=this.cameras.main.scrollX * .8;
          this.bg_4.tilePositionX=this.cameras.main.scrollX * 1.4;
          this.collectStar;
          //asignacion de movimiento y animacion a cada tecla
          if(this.cursors.left.isDown){
              this.pirateGreen.flipX=false;
              this.pirateGreen.setVelocityX(-150);
              this.pirateGreen.anims.play('running',true);
              console.log('izquierda');
          }
          else if(this.cursors.right.isDown)
          {
              this.pirateGreen.flipX=true;
              this.pirateGreen.setVelocityX(150);
              this.pirateGreen.anims.play('running',true);
              console.log('derecha');
          }else if(this.cursors.up.isDown && this.pirateGreen.body.onFloor())
          {
              this.pirateGreen.anims.play('jumping',true);
              this.jumpSound.play();
              this.pirateGreen.body.setVelocityY(-300);
              this.runningSound.stop();
          }else if(Phaser.Input.Keyboard.JustDown(this.d)){
              this.pirateGreen.setVelocityY(350);
              this.runningSound.play(this.config);
          }
          else if(this.pirateGreen.body.onFloor()){
              this.pirateGreen.body.setVelocityX(0);
              this.pirateGreen.anims.play('breathing',true);
              this.runningSound.play(this.config);
          }
          //que hacer cuando el jugador caiga fuera del mapa
          if(this.pirateGreen.body.position.y>600){
            this.cursors.down.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;
            this.endGame();
            this.cursors.down.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;
            this.cursors.pressEvent=null;
          }
          if(this.score==130){
              this.winGame();
          }
    }
    collectStar(pirateGreen,star)
    {
        this.pop.play();
        star.disableBody(true, true);
        this.score = this.score + 10;
        this.scoreText.setText('SCORE: ' + this.score);
    }
    collectStarSpecial(pirateGreen,starSpecial){
        starSpecial.disableBody(true, true);
        this.score = this.score + 10;
        this.scoreText.setText('SCORE: ' + this.score);
    }
    dead(pirateGreen,bomb,bomb2,bomb3,bomb4){
        this.runningSound.stop();
        this.theme.stop();
        this.punchSound.play();
        this.pirateGreen.setTint(0xff0000);
        this.pirateGreen.anims.play('breathing',true);
        this.anims.pauseAll();
        this.cursors.left.isDown=false;
        this.cursors.right.isDown=false;
        this.cursors.down.isDown=false;
        this.physics.pause();
        this.anims.pauseAll();
        // this.scene.pause();
        setTimeout(()=>{
            this.scene.stop();
            this.theme.stop();
            this.scene.start('gameover');
        },2000);
    }

    winGame(){
        this.win.play();
        this.theme.stop();
        this.runningSound.stop();
        this.physics.pause();
        this.scene.pause();
        setTimeout(()=>{
            this.scene.stop();
            this.cursors.down.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;
            this.scene.start('congratulations');
        },2000);
    }
    endGame() {
        this.runningSound.stop();
        this.grito.play();
        this.pirateGreen.setTint(0xff0000);
        this.pirateGreen.anims.play('breathing',true);
        this.physics.pause();
        this.scene.pause();
        if(this.cursors.left.isDown || this.cursors.right.isDown){
            this.cursors.left.isDown=false;
            this.cursors.right.isDown=false;
          }
        setTimeout(()=>{
            // this.scene.restart();
            this.theme.stop();
            this.scene.stop();
            this.cursors.down.isDown=false;
            this.cursors.right.isDown=false;
            this.cursors.left.isDown=false;
            this.scene.start('gameover');
        },2000);
        
      }
}