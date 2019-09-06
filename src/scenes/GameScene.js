let width
let height
let x
let y
let bat

class GameScene extends Phaser.Scene {
    constructor(test) {
        super({
            key: 'GameScene'
        });
    }

    preload() {

        this.load.image("bg", "src/assets/bg.png");

        this.load.spritesheet("bat", "src/assets/bat.png", {
            frameWidth: 62,
            frameHeight: 30
        });

    }

    create() {

        //set ขนาดให้กับ map ของเกม
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;

        x = width * 0.5;
        y = height * 0.5;

        this.add.image(x, y, 'bg').setScale(0.5);

        bat = this.physics.add.sprite(x, -150, 'bat');

        //ตรงนี้จะใช้ this.body.velocity.y เปลี่ยนจาก this เป็นชื่อ object >>>>> reference from http://www.html5gamedevs.com/topic/32657-velocity-is-undefined/
        bat.body.velocity.y = Phaser.Math.Between(50, 100);
        console.log(bat.y)

        this.anims.create({
            key: "coming",
            frames: this.anims.generateFrameNumbers("bat", { start: 0, end: 2 }),
            frameRate: 20,
            frameQuantity: 32,
            repeat: -1

        });

        this.time.addEvent({
            delay: 100,
            callback: function () {
                for(let i = 0; i < 25; i++){

                }
            },
            callbackScope: this,
            loop: true
        });

        // this.time.addEvent({
        //     delay: 1000, // this can be changed to a higher value like 1000
        //     callback: function () {
        //         var enemy = new GunShip(
        //             this,
        //             Phaser.Math.Between(0, this.game.config.width),
        //             0
        //         );
        //         this.enemies.add(enemy);
        //     },
        //     callbackScope: this,
        //     loop: true
        // });

    }

    releaseBat() {

    }

    update() {

        bat.anims.play('coming', true);

        bat.y += 2;

        if (bat.y > 1050) {
            bat.y = -150;
            bat.x = Phaser.Math.Between(70, 580);
        }

    }

}

export default GameScene;
