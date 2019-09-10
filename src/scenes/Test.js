let player;
let player2;
let bullets;
let bullet;
let pBullet;
class Test extends Phaser.Scene {
    constructor() {
        super('Test');
    }
    preload() {
        this.load.image("bullet", "src/assets/Bullet.png");
        this.load.spritesheet('player', 'src/assets/ship.png', { frameWidth: 16, frameHeight: 24 })
    }
    create() {
        player = this.physics.add.sprite(180, 500, 'player')
        // pBullet = this.add.image(100,300, 'bullet').setSize(0.001)
        player2 = this.physics.add.sprite(180, 300, 'player')
        player2.setVisible(false)
        this.physics.add.collider(player, player2, this.checked)
        // Phaser.Actions.SetAlpha(pBullet, 0, 1 / 50);
        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.speed = Phaser.Math.GetSpeed(500, 1);
            },
    
            fire: function (x, y)
            {
                this.setPosition(x, y - 30);
    
                this.setActive(true);
                this.setVisible(true);
            },
    
            update: function (time, delta)
            {
                this.y -= this.speed * delta;
    
                if (this.y < -50)
                {
                    this.setActive(false);
                    this.setVisible(false);
                }
            }
    
        });
        
        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 20,
            runChildUpdate: true
        });
        this.keyboards = this.input.keyboard.addKeys('W,A,S,D')

    }
    shoot(x, y) {
         bullet = this.bullets.get();
        if (bullet) {
            bullet.setPosition(x, y)
            bullet.setActive(true);
            bullet.setVisible(true);
            bullet.body.velocity.y = -200;
        }
    }
    checked(player, player2){
        console.log('collision')
    }
    update(time, delta) {

        // console.log('bullet' + bullet)

        // bullet = bullets.get();
        // if(bullet != null){
        //     if (bullet){
        //         bullet.setScale(0.05).setSize(0.05).fire(player.x, player.y);
        //     }
        // }

        player.setVelocityY(0)
        player.setVelocityX(0)

        if(this.keyboards.W.isDown){
            player.setVelocityY(-330)
            console.log('move')
        }else if(this.keyboards.S.isDown){
            player.setVelocityY(330)
        }else if(this.keyboards.A.isDown){
            player.setVelocityX(-330)
        }else if(this.keyboards.D.isDown){
            player.setVelocityX(330)
        }

        player2.setVelocityY(330)
        // if(true){
        //     this.shoot(player.x, player.y -30)
        // }
        bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));
    }
}
export default Test