var hoy1;
var hoy2;
var tiempo = '';

function diff_time(dt2, dt1) {
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    var diff2 = Math.abs(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    if (diff < 1) {
        return diff2 + ' segundos.';
    } else {
        if (Math.abs(Math.round(diff)) < 1.99) {
            return Math.abs(Math.round(diff)) + ' minuto.';
        } else {
            return Math.abs(Math.round(diff)) + ' minutos.';
        }
    }
}

var MainMenu = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MainMenu() {
            Phaser.Scene.call(this, { key: 'MainMenu' });
        },

    preload: function () {

        // Main Menu Components
        this.load.image('background', 'images/background.jpg');
        this.load.image('game_title', 'images/game_title.png');
        this.load.image('play_button', 'images/play_button.png');
        this.load.image('avion', 'images/avion.jpg');
        this.load.image('auto', 'images/auto.jpg');
        this.load.image('caballo', 'images/caballo.jpg');
        this.load.image('helicoptero', 'images/helicoptero.jpg');
        this.load.image('moto', 'images/moto.jpg');
        this.load.image('tren', 'images/tren.jpg');
        this.load.image('barco', 'images/barco.jpg');

        // WebFonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Elementos
        this.load.image('audio_button', 'images/audio_button.png');
        this.load.image('aire', 'images/aire.jpg');
        this.load.image('mar', 'images/agua.jpg');
        this.load.image('tierra', 'images/tierra.jpg');

        this.load.image('regresarBot', 'images/regresar.png');
    },

    create: function () {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //var background = this.add.sprite(0, 0, 'background').setInteractive();
        //background.setOrigin(0);
        //background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var game_tile = this.add.sprite(screenCenterX, screenCenterY * 0.45, 'game_title').setInteractive();

        var play_button = this.add.sprite(screenCenterX, screenCenterY, 'play_button').setInteractive();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            game_tile.setScale(0.4);

            play_button.setPosition(screenCenterX, screenCenterY * 1.2);
            play_button.setScale(0.3);
        } else {
            game_tile.setPosition(screenCenterX, screenCenterY * 0.5);
            game_tile.setScale(0.8);

            play_button.setPosition(screenCenterX, screenCenterY * 1.2);
            play_button.setScale(0.4);
        }

        play_button.once('pointerup', () => {
            this.scene.start('Level1');
        }, this);
    }

});