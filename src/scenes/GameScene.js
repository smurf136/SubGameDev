let hp;
let hpLog = 5;
let cursors;
let keyboards;
let life = 5;
let player;
let Bullet;
let bullet;
let bullets;
let width
let height
let x
let y
let bat
let group
let enemy
class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {
        this.load.image('bullet', 'src/assets/Bullet.png')
        // this.load.image("bg", "src/assets/bg.png");
        this.load.spritesheet('player', 'src/assets/ship.png', {
            frameWidth: 16,
            frameHeight: 24
        })
        this.load.spritesheet('hp', 'src/assets/HP.png', {
            frameWidth: 2510,
            frameHeight: 1410
        })
        this.load.spritesheet("bat", "src/assets/bat.png", {
            frameWidth: 62,
            frameHeight: 30
        });

    }

    create() {
        // Player
        hp = this.add.sprite(80, 50, 'hp').setScale(0.05)
        player = this.physics.add.sprite(287, 659, 'player')

        this.anims.create({
            key: '5HP',
            frames: [{
                key: 'hp',
                frame: 0
            }],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '4HP',
            frames: [{
                key: 'hp',
                frame: 1
            }],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '3HP',
            frames: [{
                key: 'hp',
                frame: 2
            }],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '2HP',
            frames: [{
                key: 'hp',
                frame: 3
            }],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '1HP',
            frames: [{
                key: 'hp',
                frame: 4
            }],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: '0HP',
            frames: [{
                key: 'hp',
                frame: 5
            }],
            frameRate: 1,
            repeat: -1
        })
        this.anims.create({
            key: 'playerNotMove',
            frames: [{
                key: 'player',
                frame: 2
            }]
        })

        cursors = this.input.keyboard.createCursorKeys()
        keyboards = this.input.keyboard.addKeys('W,A,S,D')

        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,

            initialize:

                function Bullet(scene) {
                    Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');

                    this.speed = Phaser.Math.GetSpeed(700, 1);
                },

            fire: function (x, y) {
                this.setPosition(x, y - 30);

                this.setActive(true);
                this.setVisible(true);
            },

            update: function (time, delta) {
                this.y -= this.speed * delta;

                if (this.y < -50) {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }

        });



        player.anims.play('playerNotMove')

        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 30,
            runChildUpdate: true
        });

        console.log('bullets length: ' + bullets.getLength())
        
        // Enemy
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;
        
        x = width * 0.5;
        y = height * 0.5;
        
        this.anims.create({
            key: "coming",
            frames: this.anims.generateFrameNumbers("bat", { start: 0, end: 2 }),
            frameRate: 20,
            frameQuantity: 32,
            repeat: -1
            
        });
        
        enemy = this.physics.add.group({
            defaultKey: 'bat',
            maxSize: 100,
            createCallback: function (bat) {
                bat.setName('bat' + this.getLength());
                console.log('Created', bat.name);
                console.log(bat)
            },
            removeCallback: function (bat) {
                console.log('Removed', bat.name);
            }
        });
        
        this.time.addEvent({
            delay: 1200,
            callback: addBat,
            loop: true
        });
        
        this.physics.add.collider(bullets, enemy, this.hitEnemy)
        this.physics.add.collider(bullets, enemy, function(){
            console.log('Hit')
        })

    }
    
    update() {

        // Player
        if (cursors.up.isDown) {
            this.lossHealth()
        } else if (cursors.down.isDown) {
            this.healHealth()
        }

        player.setVelocityY(0)
        player.setVelocityX(0)

        if (keyboards.W.isDown) {
            player.setVelocityY(-330)
        } else if (keyboards.S.isDown) {
            player.setVelocityY(330)
        } else if (keyboards.A.isDown) {
            player.setVelocityX(-330)
        } else if (keyboards.D.isDown) {
            player.setVelocityX(330)
        }

        if (hpLog >= 5) {
            hp.anims.play('5HP')
        } else if (hpLog == 4) {
            hp.anims.play('4HP')
        } else if (hpLog == 3) {
            hp.anims.play('3HP')
        } else if (hpLog == 2) {
            hp.anims.play('2HP')
        } else if (hpLog == 1) {
            hp.anims.play('1HP')
        } else {
            hp.anims.play('0HP')
            this.isDie()
        }

        // console.log('player.x: ' + player.x)
        // console.log('player.y: ' + player.y)

        bullet = bullets.get();
        if (bullet != null) {
            if (bullet) {
                bullet.setScale(0.05).setSize(0.05).fire(player.x, player.y);
            }
        }

        bullets.children.each(function (b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));

        // Enemy
        Phaser.Actions.IncY(enemy.getChildren(), 1);

        enemy.children.iterate(function (bat) {
            if (bat.y > 900) {
                enemy.killAndHide(bat);
            }
        });



    }

    lossHealth() {
        hpLog--;
        console.log(hpLog)
    }
    healHealth() {
        hpLog++;
        console.log(hpLog)
    }
    isDie() {
        life--;
        if (life == 0) {
            this.scene.pause()
        } else {
            hpLog = 5;
        }
    }
    hitEnemy(bullet, enemy){
        enemy.disableBody(true, true)
    }


}
function addBat() {
    var bat = enemy.get(Phaser.Math.Between(50, 570), Phaser.Math.Between(-64, 0));
    
    activateBat(bat);
    
    if (!bat) return; // None free

}

function activateBat (bat) {
    bat
    .setActive(true)
    .setVisible(true)
    .play('coming');
}

export default GameScene;
