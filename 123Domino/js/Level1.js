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

        var help = [
            'Relaciona los dominos',
            'con el número y su',
            'color',
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
        this.load.image('domino3', 'images/domino_3.png');
    },

    create: function () {

        this.start;

        hoy1 = new Date();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;

        attemptsText = this.add.text(16, 16, 'Intentos: 0', { fontSize: '25px', fill: '#000' });

        var regresarBot = this.add.sprite(screenCenterX * 1.6, screenCenterY * 1.95, 'regresarBot').setInteractive();
        regresarBot.setScale(0.12);
        regresarBot.on('pointerover', function () {
            this.setScale(0.14);
        });
        regresarBot.on('pointerout', function () {
            this.setScale(0.12);
        });

        // DOMINO
        var domino = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'domino3').setInteractive();
        domino.setTint(0x00ff00);

        // Opciones
        var green_three = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.3, '3').setInteractive();
        green_three.setScale(0.18);
        green_three.setTint(0x00ff00);

        var blue_three = this.add.sprite(screenCenterX, screenCenterY * 1.3, '3').setInteractive();
        blue_three.setScale(0.18);
        blue_three.setTint(0x1CB1DF);

        var green_five = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.3, '5').setInteractive();
        green_five.setScale(0.18);
        green_five.setTint(0x00ff00);

        // LOGICA
        green_three.on('pointerdown', function (pointer) {
            this.setTint(0xFFFFFF);

            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 1",
                game_name: "123 DOMINO",
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
        });

        green_three.on('pointerout', function (pointer) {
            this.setTint(0x00ff00);
        });

        green_three.on('pointerup', function (pointer) {
            this.setTint(0x00ff00);
        });

        blue_three.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        blue_three.on('pointerout', function (pointer) {
            this.setTint(0x1CB1DF);
        });

        blue_three.on('pointerup', function (pointer) {
            this.setTint(0x1CB1DF);
        });

        green_five.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        green_five.on('pointerout', function (pointer) {
            this.setTint(0x00ff00);
        });

        green_five.on('pointerup', function (pointer) {
            this.setTint(0x00ff00);
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 1",
                game_name: "123 DOMINO",
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

        //this.cameras.main.setBackgroundColor('#FFFFFF');

        var starts = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'stars').setInteractive();

        var help = [
            'MUY BIEN',
        ];

        var add = this.add;

        WebFont.load({
            google: {
                families: ['Yusei Magic', 'Kaushan Script']
            },

            active: function () {
                add.text(screenCenterX, screenCenterY * 0.7, help, { fontFamily: 'Yusei Magic', fontSize: 30, color: '#42210B', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
                add.text(screenCenterX, screenCenterY * 1.2, 'HAZ CLICK \nPARA CONTINUAR  ', { fontFamily: 'Kaushan Script', fontSize: 30, color: '#F7931E', align: 'center' }).setShadow('#333333', 2, false, true).setOrigin(0.5);
            },
        });

        this.input.once('pointerdown', this.start, this);

    },

    start() {
        this.scene.start('Level2');
    },

});