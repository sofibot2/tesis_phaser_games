var GameMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function GameMenu() {
        Phaser.Scene.call(this, { key: 'GameMenu' });
    },

    preload: function() {

        this.load.image('backgroundm', './images/fondo7.jpg');
        this.load.image('menuLeon', './images/MenuLeon2.png');
        this.load.image('menuOso', './images/MenuOso.png');
        this.load.image('menuRaton', './images/MenuRaton.png');
        this.load.image('menuTortuga', './images/MenuTortuga.png');
        this.load.image('derecha', './images/derecha.png');
        this.load.image('pag1', './images/pag1.png');
        this.load.image('pag2', './images/pag2.png');
    },

    create: function() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        so_audio = this.sound.add('so');

        var background = this.add.sprite(0, 0, 'backgroundm').setInteractive();
        background.setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var game_tile = this.add.sprite(screenCenterX, screenCenterY * 0.25, 'game_title2').setInteractive();
        game_tile.setScale(0.35);

        var instrucciones = this.add.sprite(screenCenterX * 0.4, screenCenterY * 0.5, 'instrucciones').setInteractive();
        instrucciones.setScale(0.15);
        instrucciones.on('pointerover', function() {
            this.setScale(0.19);
        });
        instrucciones.on('pointerout', function() {
            this.setScale(0.15);
        });

        var botonSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.5, 'botonSonido').setInteractive();
        botonSonido.setScale(0.15);
        botonSonido.on('pointerover', function() {
            this.setScale(0.19);
        });
        botonSonido.on('pointerout', function() {
            this.setScale(0.15);
        });

        var botonSinSonido = this.add.sprite(screenCenterX * 1.8, screenCenterY * 0.5, 'botonSinSonido').setInteractive();
        botonSinSonido.setScale(0.15);
        botonSinSonido.on('pointerover', function() {
            this.setScale(0.19);
        });
        botonSinSonido.on('pointerout', function() {
            this.setScale(0.15);
        });

        if (sonido) {
            botonSinSonido.visible = false;
        } else {
            botonSonido.visible = false;
        }

        var leon = this.add.sprite(screenCenterX * 0.51, screenCenterY * 0.8, 'menuLeon').setInteractive();
        leon.setScale(0.28);
        leon.on('pointerover', function() {
            this.setScale(0.30);
        });
        leon.on('pointerout', function() {
            this.setScale(0.28);
        });

        var oso = this.add.sprite(screenCenterX * 1.5, screenCenterY * 0.8, 'menuOso').setInteractive();
        oso.setScale(0.28);
        oso.on('pointerover', function() {
            this.setScale(0.30);
        });
        oso.on('pointerout', function() {
            this.setScale(0.28);
        });

        var raton = this.add.sprite(screenCenterX * 0.51, screenCenterY * 1.3, 'menuRaton').setInteractive();
        raton.setScale(0.28);
        raton.on('pointerover', function() {
            this.setScale(0.30);
        });
        raton.on('pointerout', function() {
            this.setScale(0.28);
        });

        var tortuga = this.add.sprite(screenCenterX * 1.5, screenCenterY * 1.3, 'menuTortuga').setInteractive();
        tortuga.setScale(0.28);
        tortuga.on('pointerover', function() {
            this.setScale(0.30);
        });
        tortuga.on('pointerout', function() {
            this.setScale(0.28);
        });

        var derecha = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.7, 'derecha').setInteractive();
        derecha.setScale(0.2);
        derecha.on('pointerover', function() {
            this.setScale(0.24);
        });
        derecha.on('pointerout', function() {
            this.setScale(0.2);
        });

        var pag1 = this.add.sprite(screenCenterX, screenCenterY * 1.7, 'pag1').setInteractive();
        pag1.setScale(0.2);

        botonSonido.on('pointerdown', function(pointer) {
            botonSonido.visible = false;
            botonSinSonido.visible = true;
            sonido = false;
            bg_audio.stop();
        });
        botonSinSonido.on('pointerdown', function(pointer) {
            botonSinSonido.visible = false;
            botonSonido.visible = true;
            sonido = true;
            bg_audio.play();
        });

        instrucciones.on('pointerup', () => {
            this.scene.start('Instrucciones');
        }, this);

        leon.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Leon');
        }, this);

        oso.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Oso');
        }, this);

        raton.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Raton');
        }, this);

        tortuga.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Tortuga');
        }, this);

        derecha.on('pointerup', () => {
            this.scene.start('GameSecondMenu');
        }, this);
    },
});