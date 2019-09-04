let hp;
let hpLog = 5;
let keyboards;
let life = 5;
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.spritesheet('player', 'src/assets/ship.png', { frameWidth: 16, frameHeight: 24 })
        this.load.spritesheet('hp', 'src/assets/HP.png', { frameWidth: 2510, frameHeight: 1410 })
        this.load.image('bullet', 'src/assets/Bullet.png')
        
    }

    create() {
        hp = this.add.sprite(80, 50, 'hp').setScale(0.05) 

        this.player = new Player(
            this,
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            'player'
        );
        
        this.anims.create({
            key: '5HP',
            frames: [ { key: 'hp', frame: 0 } ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '4HP',
            frames: [ { key: 'hp', frame: 1 } ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '3HP',
            frames: [ { key: 'hp', frame: 2 } ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '2HP',
            frames: [ { key: 'hp', frame: 3 } ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '1HP',
            frames: [ { key: 'hp', frame: 4 } ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '0HP',
            frames: [ { key: 'hp', frame: 5 } ],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'playerNotMove',
            frames: [ { key: 'player', frame: 2 } ]
        })

        
        
        this.player.anims.play('playerNotMove')

    }
    
    update() {
        if(keyboards.up.isDown){
            this.lossHealth()
        }else if(keyboards.down.isDown){
            this.healHealth()
        }
        if(hpLog >= 5){
            hp.anims.play('5HP')
        }else if(hpLog == 4){
            hp.anims.play('4HP')
        }else if(hpLog == 3){
            hp.anims.play('3HP')
        }else if(hpLog == 2){
            hp.anims.play('2HP')
        }else if(hpLog == 1){
            hp.anims.play('1HP')
        }else{
            hp.anims.play('0HP')
            this.isDie()
        }

    }

    lossHealth(){
        hpLog--;
        console.log(hpLog)
    }
    healHealth(){
        hpLog++;
        console.log(hpLog)
    }
    isDie(){
        life--;
        if(life == 0){
            this.scene.pause()
        }else{
            hpLog = 5;
        }
    }
}
export default GameScene;
