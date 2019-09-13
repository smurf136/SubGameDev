let width
let height
let x
let y
let group

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

        // reference : https://labs.phaser.io/edit.html?src=src\game%20objects\group\sprite%20pool.js
        // reference2 : http://labs.phaser.io/edit.html?src=src%5Canimation%5Con%20start%20callback.js
        // reference3 : https://rexrainbow.github.io/phaser3-rex-notes/docs/site/group/
        // reference4 : https://yorkcs.com/2019/02/08/build-a-space-shooter-with-phaser-3-4/

        //set ขนาดให้กับ map ของเกม
        width = this.scene.scene.physics.world.bounds.width;
        height = this.scene.scene.physics.world.bounds.height;

        x = width * 0.5;
        y = height * 0.5;

        this.add.image(x, y, 'bg').setScale(0.5);

        // bat = this.physics.add.sprite(x, -150, 'bat');
        // group = this.add.group();
        // group.createMultiple({ key: "bat", repeat: 50});
        // group.playAnimation('bat');

        //ตรงนี้จะใช้ this.body.velocity.y เปลี่ยนจาก this เป็นชื่อ object >>>>> reference from http://www.html5gamedevs.com/topic/32657-velocity-is-undefined/
        // bat.body.velocity.y = Phaser.Math.Between(50, 100);
        // console.log(bat.y)

        this.anims.create({
            key: "coming",
            frames: this.anims.generateFrameNumbers("bat", { start: 0, end: 2 }),
            frameRate: 20,
            frameQuantity: 32,
            repeat: -1

        });

        group = this.add.group({
            defaultKey: 'bat',
            maxSize: 100,
            createCallback: function (bat) {
                bat.setName('bat' + this.getLength());
                console.log('Created', bat.name);
            },
            removeCallback: function (bat) {
                console.log('Removed', bat.name);
            }
        });

        group.createMultiple({
            active: false,
            key: group.defaultKey,
            repeat: group.maxSize - 1
        });

        this.time.addEvent({
            delay: 1000,
            loop: true,
            callback: addBat
        });

    }


    update() {

        Phaser.Actions.IncY(group.getChildren(), 1);

        group.children.iterate(function (bat) {
            if (bat.y > 900) {
                group.killAndHide(bat);
            }
        });

        // bat.anims.play('coming', true);

        // bat.y += 2;

        // if (bat.y > 1050) {
        //     bat.y = -150;
        //     bat.x = Phaser.Math.Between(70, 580);
        // }

    }

}

function addBat() {
    var bat = group.get(Phaser.Math.Between(50, 570), Phaser.Math.Between(-64, 0));

    if (!bat) return; // None free

    activateBat(bat);
}

function activateBat (bat) {
    bat
    .setActive(true)
    .setVisible(true)
    .play('coming');
}

export default GameScene;
