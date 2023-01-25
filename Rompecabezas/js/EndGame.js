var EndGame = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function EndGame() {
        Phaser.Scene.call(this, { key: 'EndGame' });
    },

    preload: function() {

        this.load.image('bg', './images/fondo41.png');
        this.load.image('estrella', './images/estrella1.png');
        this.load.image('ganaste', './images/ganar.png');
        this.load.image('house', './images/house.png');
    },

    create: function() {
        this.start;
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        win = this.sound.add('win');
        win.play();

        //Background
        var background = this.add.sprite(0, 0, 'bg').setInteractive();
        background.setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var ganaste = this.add.image(screenCenterX, screenCenterY * 0.3, 'ganaste').setInteractive();
        ganaste.setScale(0.36);

        var animalEND = this.add.image(screenCenterX, screenCenterY * 0.8, animal).setInteractive();
        animalEND.setScale(0.23);

        console.log(animal);

        var estrella1 = this.add.image(screenCenterX, screenCenterY * 1.30, 'estrella').setInteractive();
        estrella1.setScale(0.15);
        estrella1.visible = false;

        var estrella2 = this.add.image(screenCenterX * 0.5, screenCenterY * 1.22, 'estrella').setInteractive();
        estrella2.setScale(0.15);
        estrella2.visible = false;

        var estrella3 = this.add.image(screenCenterX * 1.5, screenCenterY * 1.22, 'estrella').setInteractive();
        estrella3.setScale(0.15);
        estrella3.visible = false;

        if (attempts == intentos) {
            estrella1.visible = true;
            estrella2.visible = true;
            estrella3.visible = true;
        } else if (attempts > intentos && attempts < 11) {
            estrella2.visible = true;
            estrella3.visible = true;
        } else {
            estrella1.visible = true;
        }

        var house = this.add.image(screenCenterX, screenCenterY * 1.65, 'house').setInteractive();
        house.setScale(0.3);
        house.on('pointerover', function() {
            this.setScale(0.32);
        });
        house.on('pointerout', function() {
            this.setScale(0.3);
        });
        house.once('pointerup', () => {
            this.scene.start('GameMenu');
        }, this);
    },
});