var GameSecondMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function GameSecondMenu() {
        Phaser.Scene.call(this, { key: 'GameSecondMenu' });
    },

    preload: function() {

        this.load.image('menuConejo', './images/MenuConejo.png');
        this.load.image('menuPerro', './images/MenuPerro.png');
        this.load.image('menuBuho', './images/MenuBuho.png');
        this.load.image('menuTucan', './images/MenuTucan.png');
        this.load.image('izquierda', './images/izquierda.png');
    },

    create: function() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

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

        var conejo = this.add.sprite(screenCenterX * 0.51, screenCenterY * 0.8, 'menuConejo').setInteractive();
        conejo.setScale(0.28);
        conejo.on('pointerover', function() {
            this.setScale(0.30);
        });
        conejo.on('pointerout', function() {
            this.setScale(0.28);
        });

        var perro = this.add.sprite(screenCenterX * 1.5, screenCenterY * 0.8, 'menuPerro').setInteractive();
        perro.setScale(0.28);
        perro.on('pointerover', function() {
            this.setScale(0.30);
        });
        perro.on('pointerout', function() {
            this.setScale(0.28);
        });

        var buho = this.add.sprite(screenCenterX * 0.51, screenCenterY * 1.3, 'menuBuho').setInteractive();
        buho.setScale(0.28);
        buho.on('pointerover', function() {
            this.setScale(0.30);
        });
        buho.on('pointerout', function() {
            this.setScale(0.28);
        });

        var tucan = this.add.sprite(screenCenterX * 1.5, screenCenterY * 1.3, 'menuTucan').setInteractive();
        tucan.setScale(0.28);
        tucan.on('pointerover', function() {
            this.setScale(0.30);
        });
        tucan.on('pointerout', function() {
            this.setScale(0.28);
        });

        var izquierda = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.7, 'izquierda').setInteractive();
        izquierda.setScale(0.2);
        izquierda.on('pointerover', function() {
            this.setScale(0.24);
        });
        izquierda.on('pointerout', function() {
            this.setScale(0.2);
        });

        var pag2 = this.add.sprite(screenCenterX, screenCenterY * 1.7, 'pag2').setInteractive();
        pag2.setScale(0.2);

        botonSonido.on('pointerdown', function(pointer) {
            botonSonido.visible = false;
            botonSinSonido.visible = true;
            bg_audio.stop();
            sonido = false;
        });
        botonSinSonido.on('pointerdown', function(pointer) {
            botonSinSonido.visible = false;
            botonSonido.visible = true;
            bg_audio.play();
            sonido = true;
        });

        instrucciones.on('pointerup', () => {
            this.scene.start('Instrucciones');
        }, this);

        conejo.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Conejo');
        }, this);

        perro.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Perro');
        }, this);

        buho.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Buho');
        }, this);

        tucan.on('pointerup', () => {
            so_audio.play();
            this.scene.start('Tucan');
        }, this);

        izquierda.on('pointerup', () => {
            this.scene.start('GameMenu');
        }, this);
    },
});