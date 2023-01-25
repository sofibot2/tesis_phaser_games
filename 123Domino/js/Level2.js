var Level2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Level2() {
            Phaser.Scene.call(this, { key: 'Level2' });
        },

    create: function () {
        this.scene.start('Game_Level2');
    },

});

var Game_Level2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function Game_Level2() {
            Phaser.Scene.call(this, { key: 'Game_Level2' });
        },

    preload: function () {
        this.load.image('domino1', 'images/domino_1.png');
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
        var domino = this.add.sprite(screenCenterX, screenCenterY * 0.5, 'domino1').setInteractive();
        domino.setTint(0xAF7AC5);

        // Opciones
        var green_one = this.add.sprite(screenCenterX * 0.3, screenCenterY * 1.3, '1').setInteractive();
        green_one.setScale(0.18);
        green_one.setTint(0x00ff00);

        var blue_one = this.add.sprite(screenCenterX, screenCenterY * 1.3, '1').setInteractive();
        blue_one.setScale(0.18);
        blue_one.setTint(0x1CB1DF);

        var purple_one = this.add.sprite(screenCenterX * 1.7, screenCenterY * 1.3, '1').setInteractive();
        purple_one.setScale(0.18);
        purple_one.setTint(0xAF7AC5);

        // LOGICA
        green_one.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        green_one.on('pointerout', function (pointer) {
            this.setTint(0x00ff00);
        });

        green_one.on('pointerup', function (pointer) {
            this.setTint(0x00ff00);
        });

        blue_one.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);
            this.setTint(0xff0000);
        });

        blue_one.on('pointerout', function (pointer) {
            this.setTint(0x1CB1DF);
        });

        blue_one.on('pointerup', function (pointer) {
            this.setTint(0x1CB1DF);
        });

        purple_one.on('pointerdown', function (pointer) {
            attempts += 1;
            attemptsText.setText('Intentos: ' + attempts);

            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 2",
                game_name: "123 DOMINO",
                game_level: 2,
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

            this.scene.start('WinScreen2');

            this.setTint(0xAF7AC5);

        });

        purple_one.on('pointerout', function (pointer) {
            this.setTint(0xAF7AC5);
        });

        purple_one.on('pointerup', function (pointer) {
            this.setTint(0xAF7AC5);
        });

        regresarBot.on('pointerup', () => {
            hoy2 = new Date();
            tiempo = (diff_time(hoy2, hoy1));

            let data = {
                game_person: person_id,
                game_level_name: "NIVEL 2",
                game_name: "123 DOMINO",
                game_level: 2,
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
        this.scene.start('WinScreen2');
    },

});

var WinScreen2 = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function WinScreen2() {
            Phaser.Scene.call(this, { key: 'WinScreen2' });
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
        this.scene.start('Level3');
    },

});