class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: "MainMenu" });
    }
    preload() {
        this.load.image('1', '../../src/assets/Birds eye view.png');
        this.load.image('2', '../../src/assets/Sign.png');
        this.load.image('3', '../../src/assets/Sign2.png');
        this.load.image('4', '../../src/assets/Sign3.png');
        this.load.image('5', '../../src/assets/Sign4.png');
        this.load.image('6', '../../src/assets/Grass.png');
        this.load.image('7', '../../src/assets/Ground.png');
        this.load.image('8', '../../src/assets/Mountain.png');
        this.load.image('9', '../../src/assets/Sun and Sky.png');
        
        
    }

    create() {
        this.add.image(0, 0, "9");
        this.Play = this.add.sprite(
            this.game.config.width * 0.5,
            this.game.config.height * 0.5,
            "2"
        );
        
       
        this.Play.setInteractive();

        
            
        this.Play.on("pointerdown", function () {
            this.Play.setTexture("2");
           
            this.scene.start('GameScene');
        }, this);

        
        var text = this.add.text(250, 350, 'Play', { fill: '#00ff00' });
    }
    
    update() {

    }
}
export default MainMenu;
