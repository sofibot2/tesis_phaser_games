var bg_audio;
var aciertos = 0;
var attempts = 0;
var intentos = 0;
var attemptsText;
var animal = '';
sonido = true;
var hoy1;
var hoy2;
var tiempo='';

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var person_id = urlParams.get('person_id');

var url = "https://sofibot.ups.edu.ec/game/create";

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

    preload: function() {

        // Audio
        //this.load.audio("bg_sound_2", ['./sounds/happy.mp3', './sounds/happy.ogg']);
        this.load.audio("bg_sound_2", ['../Animales/sounds/sound_2.mp3', '../Animales/sounds/sound_2.ogg']);
        this.load.audio('so', './sounds/so2.mp3');
        this.load.audio('toc', './sounds/toc.mp3');
        this.load.audio('error', './sounds/error.mp3');
        this.load.audio('win', './sounds/win.mp3');
        // Main Menu Components
        this.load.image('background', './images/fondo41.png');
        this.load.image('game_title2', './images/logo.png');
        this.load.image('play_button', './images/play2.png');
        this.load.image('frame', './images/frame.png');
        this.load.image('cerebro1', './images/cerebro1.png');
        this.load.image('cerebro2', './images/cerebro2.png');
        this.load.image('cerebro3', './images/cerebro3.png');
        this.load.image('cerebro4', './images/cerebro4.png');
        this.load.image('cerebro5', './images/cerebro5.png');
        //Buttons Game
        this.load.image('botonSonido', './images/botonSonido.png');
        this.load.image('botonSinSonido', './images/botonSinSonido1.png');
        this.load.image('instrucciones', './images/instruccionesl.png');
        this.load.image('puntuacion', './images/puntuacion.png');
        this.load.image('house', './images/house.png');

        //WebFonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

    },

    create: function() {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        bg_audio = this.sound.add('bg_sound_2', {
            loop: true,
            volume: 0.5,
            mute: false,
            rate: 1,
            detune: 0,
            seek: 0,
            delay: 0
        });

        var background = this.add.sprite(0, 0, 'background').setInteractive();
        background.setOrigin(0);
        background.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

        var game_tile = this.add.sprite(screenCenterX, screenCenterY * 0.6, 'game_title2').setInteractive();
        game_tile.setScale(0.55);

        var play_button = this.add.sprite(screenCenterX, screenCenterY * 1.3, 'play_button').setInteractive();
        play_button.setScale(0.2);
        play_button.on('pointerover', function() {
            this.setScale(0.22);
        });
        play_button.on('pointerout', function() {
            this.setScale(0.2);
        });

        var cerebro3 = this.add.sprite(screenCenterX * 0.2, screenCenterY * 1.4, 'cerebro3').setInteractive();
        var cerebro1 = this.add.sprite(screenCenterX * 0.6, screenCenterY * 1.6, 'cerebro1').setInteractive();
        var cerebro2 = this.add.sprite(screenCenterX * 1.4, screenCenterY * 1.6, 'cerebro2').setInteractive();
        var cerebro4 = this.add.sprite(screenCenterX * 1.8, screenCenterY * 1.4, 'cerebro4').setInteractive();
        var cerebro5 = this.add.sprite(screenCenterX, screenCenterY * 1.7, 'cerebro5').setInteractive();

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // true for mobile device
            game_tile.setScale(0.55);
            cerebro1.setScale(0.58);
            cerebro2.setScale(0.58);
            cerebro3.setScale(0.58);
            cerebro4.setScale(0.58);
            cerebro5.setScale(0.7);
            cerebro3.x = screenCenterX * 0.35;
            cerebro3.y = screenCenterY * 1.8;
            cerebro1.x = screenCenterX * 0.3;
            cerebro1.y = screenCenterY * 1.5;
            cerebro2.x = screenCenterX * 1.7;
            cerebro2.y = screenCenterY * 1.8;
            cerebro4.x = screenCenterX * 1.7;
            cerebro4.y = screenCenterY * 1.5;
        } else {
            game_tile.setScale(0.7);
        }

        play_button.once('pointerup', () => {
            this.scene.start('GameMenu');
            bg_audio.play();
        }, this);
    }

});