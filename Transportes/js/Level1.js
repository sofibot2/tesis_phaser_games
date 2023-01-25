var attempts = 0;
var attemptsText;

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var person_id = urlParams.get('person_id');

var url = "https://sofibot.ups.edu.ec/game/create";

var Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level1() {
            Phaser.Scene.call(this, { key: 'Level1' });
        },

    preload: function () {

        // AUDIO
        this.load.audio('audio_avion', ['sounds/audio_avion.mp3', 'sounds/audio_avion.ogg']);

        // WebFonts
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    },

    create: function () {
        this.scene.start('Instrucions');
    },

});

var Instrucions = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Instrucions_Level1() {
            Phaser.Scene.call(this, { key: 'Instrucions' });
        },

    create: function () {
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#e6b0aa');

        var help = [
            'Relaciona el',
            'sonido con el',
            'tipo de',
            'transporte'
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function () {
                add.text(screenCenterX, screenCenterY * 0.7, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                add.text(screenCenterX, screenCenterY * 1.2, 'HAZ CLICK \nPARA COMENZAR  ', { fontFamily: 'Kaushan Script', fontSize: 30, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });

        this.input.once('pointerdown', this.start, this);
    },

    start() {
        this.scene.start('Game_Level1');
    }

});

var Game_Level1 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level1() {
            Phaser.Scene.call(this, { key: 'Game_Level1' });
        },

    preload: function () {

    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        //Background
        this.cameras.main.setBackgroundColor('#FFFFFF');

        attemptsText = this.add.text(16, 16, 'Intentos: 0', { fontSize: '25px', fill: '#000' });

        var regresarBot = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.95, 'regresarBot').setInteractive();
        regresarBot.setScale(0.12);
        regresarBot.on('pointerover', function () {
            this.setScale(0.14);
        });
        regresarBot.on('pointerout', function () {
            this.setScale(0.12);
        });

        // AUDIO
        var audio_button = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'audio_button').setInteractive();
        audio_button.setScale(0.3);

        var audio_avion = this.sound.add('audio_avion');
        audio_avion.play();

        // Opciones
        var aire = this.add.sprite(screenCenterX * 0.4, screenCenterY * 1.3, 'aire').setInteractive();
        aire.setScale(0.2);

        var mar = this.add.sprite(screenCenterX, screenCenterY * 1.3, 'mar').setInteractive();
        mar.setScale(0.2);

        var tierra = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.3, 'tierra').setInteractive();
        tierra.setScale(0.2);

        // LOGICA
        audio_button.on('pointerdown', function (pointer) {
            audio_avion.play();
        });

        aire.on('pointerdown', function (pointer) {
            this.setTint(0xFFFFFF);

            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Avión",
                game_name: "TRANSPORTES",
                game_level: 1,
                game_attempts: attempts,
                game_time_spent: tiempo,
                game_finish_level: "True",
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => {
                console.log("Request complete! response:", res);
            });

            attempts = 0;


            this.scene.start('WinScreen');
            audio_avion.destroy();
        });

        aire.on('pointerout', function (pointer) {
            this.clearTint();
        });

        aire.on('pointerup', function (pointer) {
            this.clearTint();
        });

        mar.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        mar.on('pointerout', function (pointer) {
            this.clearTint();
        });

        mar.on('pointerup', function (pointer) {
            this.clearTint();
        });

        tierra.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        tierra.on('pointerout', function (pointer) {
            this.clearTint();
        });

        tierra.on('pointerup', function (pointer) {
            this.clearTint();
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "Avión",
                game_name: "TRANSPORTES",
                game_level: 1,
                game_attempts: attempts,
                game_time_spent: tiempo,
                game_finish_level: "False",
            };

            fetch(url, {
                method: "POST",
                body: JSON.stringify(data)
            }).then(res => {
                console.log("Request complete! response:", res);
            });
            window.location = 'https://t.me/TesisTelegramBot';
        });
    },

    start() {
        this.scene.start('WinScreen');
    },

});

var WinScreen = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WinScreen() {
            Phaser.Scene.call(this, { key: 'WinScreen' });
        },

    create: function () {

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#F5F5F5');

        var avion = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'avion').setInteractive();
        avion.setScale(0.3);

        var help = [
            'MUY BIEN',
            'es un AVIÓN',
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function () {
                add.text(screenCenterX, screenCenterY * 0.8, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                add.text(screenCenterX, screenCenterY * 1.2, 'HAZ CLICK \nPARA CONTINUAR  ', { fontFamily: 'Kaushan Script', fontSize: 30, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });

        this.input.once('pointerdown', this.start, this);

    },

    start() {
        this.scene.start('Level2');
    },

});