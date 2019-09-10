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
        hp = this.add.sprite(80, 50, 'hp').setScale(0.05) 
        player = this.physics.add.sprite(287, 659, 'player')


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

        cursors = this.input.keyboard.createCursorKeys()        
        keyboards = this.input.keyboard.addKeys('W,A,S,D')

        var Bullet = new Phaser.Class({

            Extends: Phaser.GameObjects.Image,
    
            initialize:
    
            function Bullet (scene)
            {
                Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
    
                this.speed = Phaser.Math.GetSpeed(700, 1);
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

        
        
        player.anims.play('playerNotMove')
        
        bullets = this.physics.add.group({
            classType: Bullet,
            maxSize: 30,
            runChildUpdate: true
        });
        });

        console.log('bullets length: ' + bullets.getLength())
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

        this.time.addEvent({
            delay: 1200,
            callback: addBat,
            loop: true
        });

    }


    update() {
        if(cursors.up.isDown){
            this.lossHealth()
        }else if(cursors.down.isDown){
            this.healHealth()
        }

        player.setVelocityY(0)
        player.setVelocityX(0)

        if(keyboards.W.isDown){
            player.setVelocityY(-330)
        }else if(keyboards.S.isDown){
            player.setVelocityY(330)
        }else if(keyboards.A.isDown){
            player.setVelocityX(-330)
        }else if(keyboards.D.isDown){
            player.setVelocityX(330)
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

        console.log('player.x: ' + player.x)
        console.log('player.y: ' + player.y)
        
        bullet = bullets.get();
        if(bullet != null){
            if (bullet){
                bullet.setScale(0.05).setSize(0.05).fire(player.x, player.y);
            }
        }

        bullets.children.each(function(b) {
            if (b.active) {
                if (b.y < 0) {
                    b.setActive(false);
                }
            }
        }.bind(this));

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
