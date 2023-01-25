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

        // Audio
        this.load.audio('bg_sound', ['sounds/sound_1.mp3', 'sounds/sound_1.ogg']);

        // Main Menu Components
        this.load.image('background', 'images/background.png');
        this.load.image('game_title', 'images/Game_Title.png');
        this.load.image('play_button', 'images/play_button.png');
        this.load.image('stars', 'images/stars.gif');

        // WebFonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        // Dominos
        this.load.image('domino_1', 'images/domino_1.png');
        this.load.image('domino_2', 'images/domino_2.png');
        this.load.image('domino_3', 'images/domino_3.png');
        this.load.image('domino_4', 'images/domino_4.png');
        this.load.image('domino_5', 'images/domino_5.png');
        this.load.image('domino_6', 'images/domino_6.png');

        // Numeros
        this.load.image('1', 'images/1.png');
        this.load.image('2', 'images/2.png');
        this.load.image('3', 'images/3.png');
        this.load.image('4', 'images/4.png');
        this.load.image('5', 'images/5.png');
        this.load.image('6', 'images/6.png');

        this.load.image('regresarBot', 'images/regresar.png');
    },

    create: function () {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        var bg_audio = this.sound.add('bg_sound', {
            loop: true,
            volume: 0.5
        });

        bg_audio.play();

        var background = this.add.sprite(0, 0, 'background').setInteractive();
        background.setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var game_tile = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'game_title').setInteractive();

        var play_button = this.add.sprite(screenCenterX, screenCenterY, 'play_button').setInteractive();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            game_tile.setScale(0.7);

            play_button.setPosition(screenCenterX, screenCenterY * 1.2);
            play_button.setScale(0.3);
        } else {
            game_tile.setPosition(screenCenterX, screenCenterY * 0.5);
            game_tile.setScale(1);

            play_button.setPosition(screenCenterX, screenCenterY * 1.2);
            play_button.setScale(0.4);
        }

        play_button.once('pointerup', () => {
            this.scene.start('Level1');
        }, this);
    }

});